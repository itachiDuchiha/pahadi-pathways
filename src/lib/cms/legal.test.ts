import { describe, expect, it, vi } from "vitest";

import { withTempPayload } from "@/cms/test/withTempPayload";
import { site } from "@/config/site";
import { DEFAULT_EFFECTIVE_DATE, DEFAULT_RETENTION_STATEMENT } from "@/lib/legal-copy";

const temp = withTempPayload();

// The read layer resolves its client lazily, so it can use the temp instance.
vi.mock("./client", () => ({ getPayloadClient: async () => temp.payload }));

const { getLegalSettings } = await import("./legal");

const context = { skipRevalidate: true };

describe("getLegalSettings", () => {
  it("returns the defaults when the global is empty", async () => {
    expect(await getLegalSettings()).toEqual({
      dataContactEmail: site.email,
      // The field's default value, stored as a timestamp.
      effectiveDate: `${DEFAULT_EFFECTIVE_DATE}T00:00:00.000Z`,
      deletionWindowMonths: 6,
      retentionStatement: DEFAULT_RETENTION_STATEMENT,
    });
  });

  it("falls back to the site email from site settings", async () => {
    await temp.payload.updateGlobal({
      slug: "site-settings",
      data: { email: "desk@example.com" },
      overrideAccess: true,
      context,
    });

    expect((await getLegalSettings()).dataContactEmail).toBe("desk@example.com");
  });

  it("lays the edited values over the defaults", async () => {
    await temp.payload.updateGlobal({
      slug: "legal-settings",
      data: {
        dataContactEmail: "privacy@example.com",
        effectiveDate: "2026-11-01T00:00:00.000Z",
        deletionWindowMonths: 3,
        retentionStatement: "We keep records for two years.",
        grievanceOfficer: { name: "A. Officer", email: "grievance@example.com", phone: "+91 90000 00000" },
      },
      overrideAccess: true,
      context,
    });

    expect(await getLegalSettings()).toEqual({
      dataContactEmail: "privacy@example.com",
      effectiveDate: "2026-11-01T00:00:00.000Z",
      deletionWindowMonths: 3,
      retentionStatement: "We keep records for two years.",
      grievanceOfficer: { name: "A. Officer", email: "grievance@example.com", phone: "+91 90000 00000" },
    });
  });

  it("leaves out a grievance officer until name, email and phone are all set", async () => {
    await temp.payload.updateGlobal({
      slug: "legal-settings",
      data: { grievanceOfficer: { name: "A. Officer", email: "", phone: "  " } },
      overrideAccess: true,
      context,
    });

    expect((await getLegalSettings()).grievanceOfficer).toBeUndefined();
  });

  it("rejects a deletion window outside 1 to 12 months", async () => {
    await expect(
      temp.payload.updateGlobal({
        slug: "legal-settings",
        data: { deletionWindowMonths: 13 },
        overrideAccess: true,
        context,
      })
    ).rejects.toThrow();
  });
});
