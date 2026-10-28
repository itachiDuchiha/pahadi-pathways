import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match";
import { describe, expect, it } from "vitest";

import { headerRules } from "./headers";

/** Resolves headers for a path the way Next does: every matching rule, later keys win. */
function headersFor(pathname: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const rule of headerRules) {
    if (getPathMatch(rule.source, { removeUnnamedParams: true })(pathname) === false) continue;
    for (const { key, value } of rule.headers) result[key] = value;
  }
  return result;
}

const SITE_CSP_PREFIX = "default-src 'self'; img-src";
const CMS_CSP_PREFIX = "default-src 'self'; script-src";

describe("header rules", () => {
  it.each(["/", "/contact", "/api/media/file/x.webp", "/api/media/file/a/b.webp"])(
    "%s gets only the site headers",
    (pathname) => {
      const headers = headersFor(pathname);
      expect(headers["X-Frame-Options"]).toBe("DENY");
      expect(headers["X-Robots-Tag"]).toBeUndefined();
      expect(headers["Content-Security-Policy-Report-Only"]).toMatch(
        new RegExp(`^${SITE_CSP_PREFIX}`)
      );
    }
  );

  it.each(["/ramram", "/ramram/login", "/api", "/api/packages", "/api/users/login", "/api/media", "/api/media/123"])(
    "%s gets the CMS headers on top of the site set",
    (pathname) => {
      const headers = headersFor(pathname);
      expect(headers["X-Robots-Tag"]).toBe("noindex, nofollow");
      expect(headers["X-Frame-Options"]).toBe("SAMEORIGIN");
      expect(headers["Content-Security-Policy-Report-Only"]).toMatch(
        new RegExp(`^${CMS_CSP_PREFIX}`)
      );
      expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    }
  );
});

describe("preview headers", () => {
  it.each(["/preview/packages/x", "/preview/destinations/y"])(
    "%s is kept out of search and can be framed by the admin only",
    (pathname) => {
      const headers = headersFor(pathname);
      expect(headers["X-Robots-Tag"]).toBe("noindex, nofollow");
      expect(headers["X-Frame-Options"]).toBe("SAMEORIGIN");
      const csp = headers["Content-Security-Policy-Report-Only"] ?? "";
      expect(csp).toMatch(new RegExp(`^${SITE_CSP_PREFIX}`));
      expect(directive(csp, "frame-ancestors")).toEqual(["'self'"]);
      expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    }
  );

  it("leaves the public pages unframeable", () => {
    expect(headersFor("/packages/x")["X-Frame-Options"]).toBe("DENY");
    expect(directive(headersFor("/packages/x")["Content-Security-Policy-Report-Only"] ?? "", "frame-ancestors")).toEqual([
      "'none'",
    ]);
  });
});

/** The value of one directive in a CSP string. */
function directive(csp: string, name: string): string[] {
  const part = csp.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${name} `));
  return part ? part.split(/\s+/).slice(1) : [];
}

describe("site CSP (report-only)", () => {
  const csp = headersFor("/")["Content-Security-Policy-Report-Only"] ?? "";

  it("allows the analytics script hosts", () => {
    expect(directive(csp, "script-src")).toEqual(
      expect.arrayContaining([
        "'self'",
        "https://www.googletagmanager.com",
        "https://www.clarity.ms",
        "https://scripts.clarity.ms",
      ])
    );
  });

  it("allows the analytics beacon hosts", () => {
    expect(directive(csp, "connect-src")).toEqual(
      expect.arrayContaining([
        "'self'",
        "https://*.google-analytics.com",
        "https://*.analytics.google.com",
        "https://*.googletagmanager.com",
        "https://*.clarity.ms",
      ])
    );
    expect(directive(csp, "img-src")).toEqual(
      expect.arrayContaining(["'self'", "https://*.google-analytics.com", "https://*.googletagmanager.com"])
    );
  });

  it("keeps the analytics hosts out of the CMS policy", () => {
    expect(headersFor("/ramram")["Content-Security-Policy-Report-Only"]).not.toMatch(/googletagmanager|clarity/);
  });

  it("allows Cloudflare Turnstile to load, frame its widget and verify", () => {
    for (const name of ["script-src", "frame-src", "connect-src"]) {
      expect(directive(csp, name)).toContain("https://challenges.cloudflare.com");
    }
    expect(directive(csp, "frame-src")).toEqual(["'self'", "https://challenges.cloudflare.com"]);
  });

  it("keeps the Turnstile host out of the CMS policy", () => {
    const cms = headersFor("/ramram")["Content-Security-Policy-Report-Only"] ?? "";
    expect(cms).not.toContain("challenges.cloudflare.com");
    expect(directive(cms, "frame-src")).toEqual([]);
  });
});
