import { describe, expect, it } from "vitest";

import type { SiteSetting } from "@/cms/payload-types";
import { siteSettings } from "@/cms/seed/site";
import { site } from "@/config/site";

import { mergeSiteSettings } from "./site";

const STAMP = "2026-10-27T00:00:00.000Z";

function doc(fields: Partial<SiteSetting>): SiteSetting {
  return { id: 1, createdAt: STAMP, updatedAt: STAMP, ...fields };
}

describe("mergeSiteSettings", () => {
  it("returns the fallbacks when the global is empty", () => {
    expect(mergeSiteSettings(doc({}))).toEqual(site);
  });

  it("ignores blank and null values", () => {
    expect(mergeSiteSettings(doc({ email: "", phoneDisplay: "   ", tagline: null }))).toEqual(site);
  });

  it("equals the fallbacks when the global holds the seeded values", () => {
    expect(mergeSiteSettings(doc(siteSettings))).toEqual(site);
  });

  it("lays every editable value over the fallback", () => {
    const merged = mergeSiteSettings(
      doc({
        phoneDisplay: "+91 90000 00000",
        phoneE164: "+919000000000",
        whatsapp: "919000000000",
        email: "hello@example.com",
        instagram: "https://instagram.com/example",
        facebook: "https://facebook.com/example",
        tagline: "New tagline",
      })
    );

    expect(merged).toEqual({
      ...site,
      tagline: "New tagline",
      phone: { display: "+91 90000 00000", e164: "+919000000000", whatsapp: "919000000000" },
      email: "hello@example.com",
      social: { instagram: "https://instagram.com/example", facebook: "https://facebook.com/example" },
    });
    expect(merged.name).toBe(site.name);
    expect(merged.url).toBe(site.url);
  });

  it("exposes the media settings and falls back on missing or invalid values", () => {
    expect(mergeSiteSettings(doc({ media: { imageQuality: "sharp", maxImageWidth: 3200 } })).media).toEqual({
      imageQuality: "sharp",
      maxImageWidth: 3200,
    });
    expect(mergeSiteSettings(doc({ media: { imageQuality: null, maxImageWidth: null } })).media).toEqual({
      imageQuality: "balanced",
      maxImageWidth: 2400,
    });
    expect(mergeSiteSettings(doc({ media: { maxImageWidth: 9000 } })).media.maxImageWidth).toBe(4000);
    expect(mergeSiteSettings(doc({ media: { maxImageWidth: 100 } })).media.maxImageWidth).toBe(1200);
  });
});
