import { describe, expect, it } from "vitest";

import { site } from "@/config/site";

import { absoluteUrl, pageMetadata, truncate } from "./seo";

describe("absoluteUrl", () => {
  it("joins a path that starts with a slash", () => {
    expect(absoluteUrl("/packages")).toBe(`${site.url}/packages`);
  });

  it("joins a path that does not start with a slash", () => {
    expect(absoluteUrl("packages")).toBe(`${site.url}/packages`);
  });
});

describe("truncate", () => {
  it("returns text unchanged when under the limit", () => {
    expect(truncate("A short sentence.", 155)).toBe("A short sentence.");
  });

  it("cuts long text on a word boundary and appends an ellipsis", () => {
    const text =
      "A spectacular Himalayan road journey covering Shimla, Sangla, Kalpa, Tabo, Kaza, Chandratal and Manali. Explore ancient monasteries, remote Himalayan villages, high mountain passes and breathtaking landscapes across Kinnaur and Spiti Valley.";

    const result = truncate(text, 155);

    expect(result.length).toBeLessThanOrEqual(156);
    expect(result.endsWith("…")).toBe(true);
    expect(result.endsWith(" …")).toBe(false);
    expect(text.startsWith(result.slice(0, -1))).toBe(true);
  });

  it("does not append an ellipsis when the text is exactly at the limit", () => {
    const text = "x".repeat(155);
    expect(truncate(text, 155)).toBe(text);
  });
});

describe("pageMetadata", () => {
  it("sets the canonical alternate to the absolute URL", () => {
    const metadata = pageMetadata({
      title: "Title",
      description: "Description",
      path: "/packages/some-slug",
    });

    expect(metadata.alternates?.canonical).toBe(
      absoluteUrl("/packages/some-slug")
    );
  });

  it("leaves openGraph.images undefined when no image is given", () => {
    const metadata = pageMetadata({
      title: "Title",
      description: "Description",
      path: "/packages/some-slug",
    });

    expect(metadata.openGraph?.images).toBeUndefined();
  });

  it("sets an absolute openGraph image when given", () => {
    const metadata = pageMetadata({
      title: "Title",
      description: "Description",
      path: "/packages/some-slug",
      image: "/images/packages/spiti.jpg",
    });

    expect(metadata.openGraph?.images).toEqual([
      { url: absoluteUrl("/images/packages/spiti.jpg") },
    ]);
  });

  it("includes openGraph and twitter fields", () => {
    const metadata = pageMetadata({
      title: "Title",
      description: "Description",
      path: "/packages/some-slug",
    });

    expect(metadata.title).toBe("Title");
    expect(metadata.description).toBe("Description");
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      siteName: site.name,
      title: "Title",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Title",
    });
  });

  it("omits the page title and uses the site default for social titles when no title is given", () => {
    const metadata = pageMetadata({
      description: "Description",
      path: "/",
    });

    expect(metadata.title).toBeUndefined();
    expect(metadata.openGraph?.title).toBe(`${site.name} | ${site.tagline}`);
    expect(metadata.twitter?.title).toBe(`${site.name} | ${site.tagline}`);
  });
});
