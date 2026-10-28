import type { SanitizedCollectionConfig } from "payload";
import { describe, expect, it } from "vitest";

import { site } from "@/config/site";

import { livePreview, livePreviewUrl } from "./livePreview";

function collection(slug: string): SanitizedCollectionConfig {
  return { slug } as SanitizedCollectionConfig;
}

describe("live preview", () => {
  it("is enabled for packages and destinations only", () => {
    expect(livePreview.collections).toEqual(["packages", "destinations"]);
  });

  it("offers mobile, tablet and desktop sizes", () => {
    expect(livePreview.breakpoints).toEqual([
      { label: "Mobile", name: "mobile", width: 375, height: 812 },
      { label: "Tablet", name: "tablet", width: 768, height: 1024 },
      { label: "Desktop", name: "desktop", width: 1440, height: 900 },
    ]);
  });

  it("points at the site's preview route for the document's slug", () => {
    expect(livePreviewUrl({ data: { slug: "shimla-trip" }, collectionConfig: collection("packages") })).toBe(
      `${site.url}/preview/packages/shimla-trip`
    );
    expect(livePreviewUrl({ data: { slug: "a b" }, collectionConfig: collection("destinations") })).toBe(
      `${site.url}/preview/destinations/a%20b`
    );
  });

  it("shows no preview until the document has a slug, or for other collections", () => {
    expect(livePreviewUrl({ data: {}, collectionConfig: collection("packages") })).toBeNull();
    expect(livePreviewUrl({ data: { slug: "" }, collectionConfig: collection("packages") })).toBeNull();
    expect(livePreviewUrl({ data: { slug: "x" }, collectionConfig: collection("gallery-items") })).toBeNull();
    expect(livePreviewUrl({ data: { slug: "x" } })).toBeNull();
  });
});
