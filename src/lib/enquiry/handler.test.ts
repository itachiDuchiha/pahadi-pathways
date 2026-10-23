import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./mail", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./mail")>();
  return {
    ...actual,
    getMailConfig: vi.fn(() => ({
      apiKey: "test-key",
      fromEmail: "from@example.com",
      toEmail: "to@example.com",
    })),
    sendEnquiryEmail: vi.fn(async () => ({ ok: true as const })),
  };
});

import { POST as packagePOST } from "@/app/(frontend)/api/package-enquiry/route";
import { POST as tripPOST } from "@/app/(frontend)/api/trip-enquiry/route";

import { MAX_BODY_BYTES } from "./guards";
import { sendEnquiryEmail } from "./mail";

const sendMock = vi.mocked(sendEnquiryEmail);

let ipCounter = 0;
function freshIp(): string {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

function post(
  url: string,
  body: unknown,
  headers: Record<string, string> = {}
): Request {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const TRIP_URL = "http://localhost/api/trip-enquiry";
const PACKAGE_URL = "http://localhost/api/package-enquiry";

const contact = {
  source: "contact",
  name: "Asha",
  phone: "+91 75596 97919",
  message: "Hello",
  website: "",
};

const pkg = {
  source: "package",
  slug: "shimla-manali-getaway",
  name: "Asha",
  phone: "9876543210",
  adults: 2,
  childAges: [3, 7],
  stay: "Premium",
  meals: "Breakfast Only (CP)",
  vehicle: "Ertiga / Rumion or similar",
  website: "",
  estimatedTotal: 1,
};

beforeEach(() => {
  sendMock.mockClear();
});

describe("enquiry handler pipeline", () => {
  it("sends a valid contact enquiry and returns the unified shape", async () => {
    const response = await tripPOST(post(TRIP_URL, contact, { "x-forwarded-for": freshIp() }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      message: "Your message was sent successfully.",
    });
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].subject).toBe(
      "Contact enquiry from Asha (+91 75596 97919)"
    );
  });

  it("rejects a foreign Origin with 403", async () => {
    const response = await tripPOST(
      post(TRIP_URL, contact, {
        origin: "https://evil.example",
        "x-forwarded-for": freshIp(),
      })
    );

    expect(response.status).toBe(403);
    expect((await response.json()).ok).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 429 with Retry-After on the sixth rapid post from one IP", async () => {
    const ip = freshIp();
    const statuses: number[] = [];
    let last: Response | undefined;

    for (let i = 0; i < 6; i += 1) {
      last = await tripPOST(post(TRIP_URL, contact, { "x-forwarded-for": ip }));
      statuses.push(last.status);
    }

    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
    expect(Number(last?.headers.get("retry-after"))).toBeGreaterThan(0);
    expect(sendMock).toHaveBeenCalledTimes(5);
  });

  it("answers a filled honeypot with 200 without sending or consuming the limit", async () => {
    const ip = freshIp();

    for (let i = 0; i < 6; i += 1) {
      const response = await tripPOST(
        post(TRIP_URL, { ...contact, website: "http://spam" }, { "x-forwarded-for": ip })
      );
      expect(response.status).toBe(200);
      expect((await response.json()).ok).toBe(true);
    }

    expect(sendMock).not.toHaveBeenCalled();

    const real = await tripPOST(post(TRIP_URL, contact, { "x-forwarded-for": ip }));
    expect(real.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("rejects a source that does not belong to the route with 400", async () => {
    const response = await tripPOST(post(TRIP_URL, pkg, { "x-forwarded-for": freshIp() }));

    expect(response.status).toBe(400);
    expect((await response.json()).ok).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a declared content-length over the limit with 413", async () => {
    const response = await tripPOST(
      post(TRIP_URL, contact, {
        "content-length": String(MAX_BODY_BYTES + 1),
        "x-forwarded-for": freshIp(),
      })
    );

    expect(response.status).toBe(413);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("prices a package enquiry on the server and ignores client totals", async () => {
    const response = await packagePOST(post(PACKAGE_URL, pkg, { "x-forwarded-for": freshIp() }));

    expect(response.status).toBe(200);
    const rows = Object.fromEntries(sendMock.mock.calls[0][0].rows);
    expect(rows["Package Cost"]).toBe("₹48,654");
    expect(rows["GST (5%)"]).toBe("₹2,433");
    expect(rows["Estimated Total"]).toBe("₹51,087");
  });
});
