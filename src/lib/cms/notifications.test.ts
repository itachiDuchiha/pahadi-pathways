import { afterEach, describe, expect, it, vi } from "vitest";

import type { NotificationSetting } from "@/cms/payload-types";
import { withTempPayload } from "@/cms/test/withTempPayload";

const temp = withTempPayload();

// The read layer resolves its client lazily, so it can use the temp instance.
vi.mock("./client", () => ({ getPayloadClient: async () => temp.payload }));

const { getNotificationPolicy } = await import("./notifications");

const context = { skipRevalidate: true };

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("getNotificationPolicy", () => {
  it("sends to the server address while the global is unpopulated", async () => {
    vi.stubEnv("TRIP_ENQUIRY_EMAIL", "desk@example.com");

    for (const source of ["trip", "contact", "package"] as const) {
      expect(await getNotificationPolicy(source)).toEqual({
        sendEmail: true,
        recipients: ["desk@example.com"],
      });
    }
  });

  it("uses the configured list for that source only", async () => {
    vi.stubEnv("TRIP_ENQUIRY_EMAIL", "desk@example.com");
    await temp.payload.updateGlobal({
      slug: "notification-settings",
      data: {
        contact: {
          sendEmail: true,
          recipients: [{ email: "owner@example.com" }, { email: "sales@example.com" }],
        },
        package: { sendEmail: false, recipients: [] },
      },
      overrideAccess: true,
      context,
    });

    expect(await getNotificationPolicy("contact")).toEqual({
      sendEmail: true,
      recipients: ["owner@example.com", "sales@example.com"],
    });
    expect(await getNotificationPolicy("package")).toEqual({
      sendEmail: false,
      recipients: ["desk@example.com"],
    });
    expect((await getNotificationPolicy("trip")).recipients).toEqual(["desk@example.com"]);
  });

  it("drops a stored address that is not valid, with a warning naming the field", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    // Rows saved before validation existed reach the read layer unchecked.
    const stored: NotificationSetting = {
      id: 1,
      trip: { sendEmail: true, recipients: [{ email: "not-an-address" }, { email: "ok@example.com" }] },
    };
    vi.spyOn(temp.payload, "findGlobal").mockResolvedValueOnce(stored);

    expect(await getNotificationPolicy("trip")).toEqual({
      sendEmail: true,
      recipients: ["ok@example.com"],
    });
    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0][0])).toContain("trip.recipients");
  });

  it("keeps at most the first ten valid unique addresses", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    // Stored rows may exceed the admin cap if saved before it existed.
    const emails = Array.from({ length: 12 }, (_, i) => `r${i}@example.com`);
    const stored: NotificationSetting = {
      id: 1,
      trip: {
        sendEmail: true,
        recipients: [{ email: "bad" }, { email: "R0@example.com" }, ...emails.map((email) => ({ email }))],
      },
    };
    vi.spyOn(temp.payload, "findGlobal").mockResolvedValueOnce(stored);

    expect((await getNotificationPolicy("trip")).recipients).toEqual([
      "R0@example.com",
      ...emails.slice(1, 10),
    ]);
  });

  it("returns no recipients when the list is empty and no server address is set", async () => {
    vi.stubEnv("TRIP_ENQUIRY_EMAIL", "");

    expect(await getNotificationPolicy("trip")).toEqual({ sendEmail: true, recipients: [] });
  });

  it("falls back to sending to the server address when the settings cannot be read", async () => {
    vi.stubEnv("TRIP_ENQUIRY_EMAIL", "desk@example.com");
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(temp.payload, "findGlobal").mockRejectedValueOnce(new Error("database is locked"));

    expect(await getNotificationPolicy("contact")).toEqual({
      sendEmail: true,
      recipients: ["desk@example.com"],
    });
    expect(error).toHaveBeenCalledTimes(1);
  });
});
