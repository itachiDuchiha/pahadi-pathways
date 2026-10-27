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
