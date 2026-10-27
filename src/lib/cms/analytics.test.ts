import { afterEach, describe, expect, it, vi } from "vitest";

import { withTempPayload } from "@/cms/test/withTempPayload";
import { DEFAULT_CONSENT_BANNER_TEXT } from "@/lib/consent";

const temp = withTempPayload();

// The read layer resolves its client lazily, so it can use the temp instance.
vi.mock("./client", () => ({ getPayloadClient: async () => temp.payload }));

const { getAnalyticsSettings, mergeAnalyticsSettings } = await import("./analytics");

const context = { skipRevalidate: true };

describe("mergeAnalyticsSettings", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("is disabled with no IDs", () => {
    expect(mergeAnalyticsSettings({})).toEqual({
      gaMeasurementId: null,
      clarityProjectId: null,
      consentBannerText: DEFAULT_CONSENT_BANNER_TEXT,
      vendors: [],
      enabled: false,
    });
  });

  it("names each configured vendor", () => {
    expect(mergeAnalyticsSettings({ gaMeasurementId: "G-ABC1234" })).toMatchObject({
      gaMeasurementId: "G-ABC1234",
      vendors: ["Google Analytics"],
      enabled: true,
    });
    expect(mergeAnalyticsSettings({ clarityProjectId: "abcde12" })).toMatchObject({
      clarityProjectId: "abcde12",
      vendors: ["Microsoft Clarity"],
      enabled: true,
    });
    expect(
      mergeAnalyticsSettings({ gaMeasurementId: " G-ABC1234 ", clarityProjectId: "abcde12" }).vendors
    ).toEqual(["Google Analytics", "Microsoft Clarity"]);
  });

  it("drops an invalid stored ID with a warning", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const merged = mergeAnalyticsSettings({
      gaMeasurementId: "G-1');alert(1)//",
      clarityProjectId: "BAD ID",
    });

    expect(merged).toMatchObject({ gaMeasurementId: null, clarityProjectId: null, vendors: [], enabled: false });
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it("uses the default banner text when the stored text is blank", () => {
    expect(mergeAnalyticsSettings({ consentBannerText: "   " }).consentBannerText).toBe(DEFAULT_CONSENT_BANNER_TEXT);
    expect(mergeAnalyticsSettings({ consentBannerText: " Cookies? " }).consentBannerText).toBe("Cookies?");
  });
});

describe("getAnalyticsSettings", () => {
  it("returns the defaults for an empty global", async () => {
    expect(await getAnalyticsSettings()).toEqual({
      gaMeasurementId: null,
      clarityProjectId: null,
      consentBannerText: DEFAULT_CONSENT_BANNER_TEXT,
      vendors: [],
      enabled: false,
    });
  });

  it("reads the saved IDs", async () => {
    await temp.payload.updateGlobal({
      slug: "analytics-settings",
      data: { gaMeasurementId: "G-ABC1234", clarityProjectId: "abcde12" },
      overrideAccess: true,
      context,
    });

    expect(await getAnalyticsSettings()).toMatchObject({
      gaMeasurementId: "G-ABC1234",
      clarityProjectId: "abcde12",
      vendors: ["Google Analytics", "Microsoft Clarity"],
      enabled: true,
    });
  });

  it("trims a pasted ID on save", async () => {
    const saved = await temp.payload.updateGlobal({
      slug: "analytics-settings",
      data: { gaMeasurementId: "  G-ABC1234 " },
      overrideAccess: true,
      context,
    });

    expect(saved.gaMeasurementId).toBe("G-ABC1234");
  });

  it.each([
    { gaMeasurementId: "UA-12345-1" },
    { gaMeasurementId: "G-abc" },
    { clarityProjectId: "ABC" },
    { clarityProjectId: "abcde\";x" },
  ])("rejects %j on save", async (data) => {
    await expect(
      temp.payload.updateGlobal({ slug: "analytics-settings", data, overrideAccess: true, context })
    ).rejects.toThrow();
  });
});
