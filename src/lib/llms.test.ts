import { describe, expect, it } from "vitest";

import { site } from "@/config/site";
import { allDestinations } from "@/cms/seed/destinations";
import { packages } from "@/cms/seed/packages";

import { buildLlmsFullTxt, buildLlmsTxt } from "./llms";
import { absoluteUrl } from "./seo";

const content = { packages, destinations: allDestinations, site };

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

  it("lists every destination and both policies", () => {
    for (const destination of allDestinations) {
      expect(text).toContain(absoluteUrl(`/destinations/${destination.slug}`));
    }

    expect(text).toContain(absoluteUrl("/privacy"));
    expect(text).toContain(`[Terms and conditions](${absoluteUrl("/terms")})`);
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

describe("contact details", () => {
  it("come from the settings it is given", () => {
    const text = buildLlmsTxt({
      ...content,
      site: {
        ...site,
        phone: { display: "+91 00000 00000", e164: "+910000000000", whatsapp: "910000000000" },
        email: "desk@example.com",
      },
    });

    expect(text).toContain("- Phone: +91 00000 00000");
    expect(text).toContain("- Email: desk@example.com");
    expect(text).toContain("- WhatsApp: https://wa.me/910000000000");
  });
});
