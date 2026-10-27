import { describe, expect, it } from "vitest";

import { site } from "@/config/site";
import { allDestinations } from "@/cms/seed/destinations";
import { packages } from "@/cms/seed/packages";

import { buildLlmsFullTxt, buildLlmsTxt } from "./llms";
import { absoluteUrl } from "./seo";

const content = { packages, destinations: allDestinations };

describe("buildLlmsTxt", () => {
  const text = buildLlmsTxt(content);

  it("starts with the site name as the H1", () => {
    expect(text.split("\n")[0]).toBe(`# ${site.name}`);
  });

  it("links every package by title and absolute URL", () => {
    for (const pkg of packages) {
      expect(text).toContain(
        `[${pkg.title}](${absoluteUrl(`/packages/${pkg.slug}`)})`
      );
    }
  });

  it("lists every destination and the privacy policy", () => {
    for (const destination of allDestinations) {
      expect(text).toContain(absoluteUrl(`/destinations/${destination.slug}`));
    }

    expect(text).toContain(absoluteUrl("/privacy"));
  });
});

describe("buildLlmsFullTxt", () => {
  const text = buildLlmsFullTxt(content);

  it("starts with the site name as the H1", () => {
    expect(text.split("\n")[0]).toBe(`# ${site.name}`);
  });

  it("contains every package and every FAQ question", () => {
    for (const pkg of packages) {
      expect(text).toContain(pkg.title);
      expect(text).toContain(absoluteUrl(`/packages/${pkg.slug}`));

      expect(pkg.faqs?.length).toBeGreaterThan(0);

      for (const faq of pkg.faqs ?? []) {
        expect(text).toContain(faq.question);
      }
    }
  });
});
