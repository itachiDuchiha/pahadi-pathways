import sharp from "sharp";
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";

import { withTempPayload } from "@/cms/test/withTempPayload";
import { packages } from "@/cms/seed/packages";
import { packageVehicleRates, pricingSettings } from "@/cms/seed/pricing";
import type { VehicleKey } from "@/lib/cms/types";
import { parsePackagePrice } from "@/lib/pricing";

const MAIL_CONFIG = {
  apiKey: "test-key",
  fromEmail: "from@example.com",
  toEmail: "to@example.com",
};

vi.mock("./mail", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./mail")>();
  return {
    ...actual,
    getMailConfig: vi.fn(),
    sendEnquiryEmail: vi.fn(async () => ({ ok: true as const })),
  };
});

// The package route reads packages and pricing through the CMS read layer;
// point it at a throwaway Payload instance.
const temp = withTempPayload();
vi.mock("@/lib/cms/client", () => ({ getPayloadClient: async () => temp.payload }));

const { POST: packagePOST } = await import("@/app/(frontend)/api/package-enquiry/route");
const { POST: tripPOST } = await import("@/app/(frontend)/api/trip-enquiry/route");
const { MAX_BODY_BYTES } = await import("./guards");
const { getMailConfig, sendEnquiryEmail } = await import("./mail");

const sendMock = vi.mocked(sendEnquiryEmail);
const mailConfigMock = vi.mocked(getMailConfig);

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

const quiet = { skipRevalidate: true } as const;
const SLUG = "shimla-manali-getaway";

/** Publishes the fixture package with its seeded rates, like `npm run cms:seed`. */
async function seedPackage(slug: string, vehicleRates: Partial<Record<VehicleKey, number>> = packageVehicleRates[slug]) {
  const fixture = packages.find((item) => item.slug === slug);
  if (!fixture) throw new Error(`No package fixture ${slug}`);

  const data = await sharp({ create: { width: 4, height: 4, channels: 3, background: "#336699" } })
    .png()
    .toBuffer();
  const image = await temp.payload.create({
    collection: "media",
    data: { alt: "Test image" },
    file: { data, mimetype: "image/png", name: `${slug}.png`, size: data.length },
    overrideAccess: true,
    context: quiet,
  });

  return temp.payload.create({
    collection: "packages",
    data: {
      slug: fixture.slug,
      title: fixture.title,
      image: image.id,
      duration: fixture.duration,
      rating: fixture.rating,
      pickup: fixture.pickup,
      pricing: { basePricePerAdult: parsePackagePrice(fixture.price), vehicleRates },
      itinerary: fixture.itinerary.map((item) => ({ item })),
      includes: fixture.includes.map((item) => ({ item })),
      _status: "published",
    },
    overrideAccess: true,
    context: quiet,
  });
}

beforeEach(async () => {
  sendMock.mockClear();
  mailConfigMock.mockReturnValue(MAIL_CONFIG);
  await temp.payload.updateGlobal({
    slug: "pricing-settings",
    data: pricingSettings,
    overrideAccess: true,
    context: quiet,
  });
  await seedPackage(SLUG);
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
    expect((await temp.payload.count({ collection: "enquiries" })).totalDocs).toBe(0);

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

  it("rejects a well-formed slug that matches no published package with 400", async () => {
    const response = await packagePOST(
      post(PACKAGE_URL, { ...pkg, slug: "no-such-trip" }, { "x-forwarded-for": freshIp() })
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, message: "Please choose a valid package." });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("answers an unknown slug with 400 even when mail is not configured", async () => {
    mailConfigMock.mockReturnValue(null);

    const response = await packagePOST(
      post(PACKAGE_URL, { ...pkg, slug: "no-such-trip" }, { "x-forwarded-for": freshIp() })
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, message: "Please choose a valid package." });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects an option label that is not in the pricing tables with 400", async () => {
    for (const [field, message] of [
      ["stay", "Please choose a valid stay."],
      ["meals", "Please choose a valid meal plan."],
      ["vehicle", "Please choose a valid vehicle."],
    ] as const) {
      const response = await packagePOST(
        post(PACKAGE_URL, { ...pkg, [field]: "Palace" }, { "x-forwarded-for": freshIp() })
      );

      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ ok: false, message });
    }
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("accepts an option an editor added to the pricing tables without a deploy", async () => {
    await temp.payload.updateGlobal({
      slug: "pricing-settings",
      data: { stayOptions: [...(pricingSettings.stayOptions ?? []), { label: "Boutique", delta: 4000 }] },
      overrideAccess: true,
      context: quiet,
    });

    const response = await packagePOST(
      post(PACKAGE_URL, { ...pkg, stay: "Boutique" }, { "x-forwarded-for": freshIp() })
    );

    expect(response.status).toBe(200);
    // 48654 with Premium (+2500) becomes 50154 with Boutique (+4000).
    expect(Object.fromEntries(sendMock.mock.calls[0][0].rows)["Package Cost"]).toBe("₹50,154");
  });
});

describe("package quotes follow the published CMS price", () => {
  const SPITI = "shimla-kinnaur-spiti-chandratal";
  // Sedan, MAP, Deluxe: base price per adult only, so the base price drives the quote.
  const sedan = {
    ...pkg,
    slug: SPITI,
    adults: 2,
    childAges: [],
    stay: "Deluxe",
    meals: "Breakfast + Dinner (MAP)",
    vehicle: "Sedan",
    estimatedTotal: 1,
    packageCost: 1,
    gst: 1,
  };

  async function quote(body: Record<string, unknown>) {
    sendMock.mockClear();
    const response = await packagePOST(post(PACKAGE_URL, body, { "x-forwarded-for": freshIp() }));
    expect(response.status).toBe(200);
    return Object.fromEntries(sendMock.mock.calls[0][0].rows);
  }

  it("uses an editor's new base price once it is published, ignoring client totals", async () => {
    // A package priced from its base rate alone (no per-vehicle rates).
    const doc = await seedPackage(SPITI, {});

    expect((await quote(sedan))["Estimated Total"]).toBe("₹67,723"); // (32249 * 2) * 1.05

    // A saved draft is not live yet.
    await temp.payload.update({
      collection: "packages",
      id: doc.id,
      data: { pricing: { basePricePerAdult: 40000 } },
      draft: true,
      overrideAccess: true,
      context: quiet,
    });
    expect((await quote(sedan))["Estimated Total"]).toBe("₹67,723");

    // Publishing makes the next quote use it.
    await temp.payload.update({
      collection: "packages",
      id: doc.id,
      data: { pricing: { basePricePerAdult: 40000 }, _status: "published" },
      overrideAccess: true,
      context: quiet,
    });
    const rows = await quote(sedan);
    expect(rows["Package Cost"]).toBe("₹80,000");
    expect(rows["GST (5%)"]).toBe("₹4,000");
    expect(rows["Estimated Total"]).toBe("₹84,000");
  });

  it("uses an editor's new per-vehicle rate once it is published", async () => {
    const doc = await seedPackage(SPITI);

    await temp.payload.update({
      collection: "packages",
      id: doc.id,
      data: { pricing: { basePricePerAdult: 32249, vehicleRates: { sedan: 30000, ertiga: 38749, crysta: 54999 } } },
      overrideAccess: true,
      context: quiet,
    });

    expect((await quote(sedan))["Estimated Total"]).toBe("₹63,000"); // (30000 * 2) * 1.05
  });

  it("uses an editor's new GST rate from the pricing settings", async () => {
    await seedPackage(SPITI, {});
    await temp.payload.updateGlobal({
      slug: "pricing-settings",
      data: { gstPercent: 12 },
      overrideAccess: true,
      context: quiet,
    });

    const rows = await quote(sedan);
    expect(rows["GST (12%)"]).toBe("₹7,740"); // round(64498 * 0.12)
    expect(rows["Estimated Total"]).toBe("₹72,238");
  });
});


describe("enquiry storage alongside email", () => {
  const trip = {
    source: "trip",
    name: "Asha",
    phone: "9876543210",
    adults: 2,
    children: 0,
    budgetPerPerson: 25000,
    website: "",
  };

  let errorSpy: MockInstance<typeof console.error>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  async function enquiries() {
    return (await temp.payload.find({ collection: "enquiries", depth: 0, overrideAccess: true })).docs;
  }

  function failStorage() {
    vi.spyOn(temp.payload, "create").mockRejectedValueOnce(new Error("database is locked"));
  }

  it("stores the lead and answers 200 when the mail sender throws", async () => {
    sendMock.mockRejectedValueOnce(new Error("socket hang up"));

    const response = await tripPOST(post(TRIP_URL, trip, { "x-forwarded-for": freshIp() }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, message: "Your trip enquiry was sent successfully." });
    expect(await enquiries()).toHaveLength(1);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("stores the lead and answers 200 when the mail sender reports a failure", async () => {
    sendMock.mockResolvedValueOnce({ ok: false, error: "rejected" });

    const response = await tripPOST(post(TRIP_URL, contact, { "x-forwarded-for": freshIp() }));

    expect(response.status).toBe(200);
    expect(await enquiries()).toHaveLength(1);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("answers 200 when mail is not configured but the lead was stored", async () => {
    mailConfigMock.mockReturnValue(null);

    const response = await tripPOST(post(TRIP_URL, trip, { "x-forwarded-for": freshIp() }));

    expect(response.status).toBe(200);
    expect((await response.json()).ok).toBe(true);
    expect(sendMock).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledTimes(1);
    const docs = await enquiries();
    expect(docs).toHaveLength(1);
    expect(docs[0]).toMatchObject({ source: "trip", name: "Asha", adults: 2, budgetPerPerson: 25000 });
  });

  it("still sends the email and answers 200 when storage fails", async () => {
    failStorage();

    const response = await tripPOST(post(TRIP_URL, trip, { "x-forwarded-for": freshIp() }));

    expect(response.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(await enquiries()).toHaveLength(0);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("answers 502 when both storage and email fail", async () => {
    failStorage();
    sendMock.mockResolvedValueOnce({ ok: false, error: "rejected" });

    const response = await tripPOST(post(TRIP_URL, trip, { "x-forwarded-for": freshIp() }));

    expect(response.status).toBe(502);
    expect((await response.json()).ok).toBe(false);
    // One line for the storage failure, one for the mail failure.
    expect(errorSpy).toHaveBeenCalledTimes(2);
  });

  it("answers 503 when storage fails and mail is not configured", async () => {
    failStorage();
    mailConfigMock.mockReturnValue(null);

    const response = await tripPOST(post(TRIP_URL, trip, { "x-forwarded-for": freshIp() }));

    expect(response.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledTimes(2);
  });

  it("stores nothing for an unknown package", async () => {
    const response = await packagePOST(
      post(PACKAGE_URL, { ...pkg, slug: "no-such-trip" }, { "x-forwarded-for": freshIp() })
    );

    expect(response.status).toBe(400);
    expect(await enquiries()).toHaveLength(0);
  });

  it("stores nothing for a throttled request", async () => {
    const ip = freshIp();
    const statuses: number[] = [];

    for (let i = 0; i < 6; i += 1) {
      const response = await tripPOST(post(TRIP_URL, trip, { "x-forwarded-for": ip }));
      statuses.push(response.status);
    }

    expect(statuses.at(-1)).toBe(429);
    expect(await enquiries()).toHaveLength(5);
  });

  it("stores a package enquiry with the server-computed price, never the client's", async () => {
    const response = await packagePOST(
      post(PACKAGE_URL, { ...pkg, packageCost: 1, gst: 1 }, { "x-forwarded-for": freshIp() })
    );

    expect(response.status).toBe(200);
    const docs = await enquiries();
    expect(docs).toHaveLength(1);
    const [published] = (
      await temp.payload.find({ collection: "packages", where: { slug: { equals: SLUG } }, depth: 0 })
    ).docs;
    expect(docs[0]).toMatchObject({
      source: "package",
      package: published.id,
      packageSlug: SLUG,
      packageTitle: published.title,
      children: 2,
      selections: {
        stay: "Premium",
        meals: "Breakfast Only (CP)",
        vehicle: "Ertiga / Rumion or similar",
        childAges: [{ age: 3 }, { age: 7 }],
      },
      computedPrice: { packageCost: 48654, gst: 2433, gstPercent: 5, estimatedTotal: 51087 },
    });
  });
});
