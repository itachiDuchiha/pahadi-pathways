import { afterEach, describe, expect, it, vi } from "vitest";

const send = vi.fn<(payload: { subject: string; to: string[] }) => Promise<{ error: null }>>(
  async () => ({ error: null })
);

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

const { getMailConfig, sanitizeSubject, sendEnquiryEmail } = await import("./mail");

describe("sanitizeSubject", () => {
  it("strips bidirectional control characters", () => {
    expect(sanitizeSubject("Trip ‮enquiry⁦ from Asha⁩")).toBe(
      "Trip enquiry from Asha"
    );
  });

  it("clamps to 120 code points without splitting a surrogate pair", () => {
    const subject = `${"a".repeat(119)}\u{1F3D4}`;

    expect(Array.from(subject)).toHaveLength(120);
    expect(sanitizeSubject(`${subject}b`)).toBe(subject);
  });
});

describe("sendEnquiryEmail", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    send.mockClear();
  });

  it("sanitises the subject before it reaches the mail provider", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("RESEND_FROM_EMAIL", "from@example.com");

    const result = await sendEnquiryEmail({
      subject: "Contact enquiry from As‮ha\r\nBcc: x@example.com",
      intro: "Intro",
      rows: [["Name", "Asha"]],
      to: ["to@example.com"],
    });

    expect(result).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0].subject).toBe(
      "Contact enquiry from Asha Bcc: x@example.com"
    );
  });

  it("sends to every recipient it is given", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("RESEND_FROM_EMAIL", "from@example.com");

    const result = await sendEnquiryEmail({
      subject: "Trip enquiry",
      intro: "Intro",
      rows: [],
      to: ["owner@example.com", "sales@example.com"],
    });

    expect(result).toEqual({ ok: true });
    expect(send.mock.calls[0][0].to).toEqual(["owner@example.com", "sales@example.com"]);
  });

  it("refuses to send without a recipient", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("RESEND_FROM_EMAIL", "from@example.com");

    const result = await sendEnquiryEmail({ subject: "Trip enquiry", intro: "Intro", rows: [], to: [] });

    expect(result.ok).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });
});

describe("getMailConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("needs only the Resend key and sender; recipients come from the notification settings", () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("RESEND_FROM_EMAIL", "from@example.com");
    vi.stubEnv("TRIP_ENQUIRY_EMAIL", "");

    expect(getMailConfig()).toEqual({ apiKey: "test-key", fromEmail: "from@example.com" });
  });

  it("is null without the Resend key or sender", () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("RESEND_FROM_EMAIL", "from@example.com");
    expect(getMailConfig()).toBeNull();

    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("RESEND_FROM_EMAIL", "");
    expect(getMailConfig()).toBeNull();
  });
});
