import { describe, expect, it } from "vitest";

import {
  CLARITY_PROJECT_ID_PATTERN,
  CONSENT_KEY,
  CONSENT_MAX_AGE,
  GA_MEASUREMENT_ID_PATTERN,
  cookieDomainsFor,
  expireConsentCookie,
  expiredCookieStrings,
  isVendorCookie,
  parseConsent,
  readConsentCookie,
  serializeConsentCookie,
  UNKNOWN_CONSENT,
  shouldLoadAnalytics,
  shouldShowConsentBanner,
} from "./consent";

describe("parseConsent", () => {
  it("accepts the two stored choices", () => {
    expect(parseConsent("accepted")).toBe("accepted");
    expect(parseConsent("declined")).toBe("declined");
  });

  it.each([null, undefined, "", "Accepted", "yes", " accepted", 1, true, {}])(
    "treats %j as no choice",
    (value) => {
      expect(parseConsent(value)).toBeNull();
    }
  );
});

describe("shouldLoadAnalytics", () => {
  const both = { ga: "G-ABC1234", clarity: "abcde12" };
  const none = { ga: null, clarity: null };

  it("loads nothing without a choice", () => {
    expect(shouldLoadAnalytics(null, both)).toEqual({ ga: false, clarity: false });
  });

  it("loads nothing after a decline, even with IDs set", () => {
    expect(shouldLoadAnalytics("declined", both)).toEqual({ ga: false, clarity: false });
  });

  it("loads nothing after an accept when no ID is set", () => {
    expect(shouldLoadAnalytics("accepted", none)).toEqual({ ga: false, clarity: false });
  });

  it("loads each vendor only when accepted and its ID is set", () => {
    expect(shouldLoadAnalytics("accepted", both)).toEqual({ ga: true, clarity: true });
    expect(shouldLoadAnalytics("accepted", { ga: "G-ABC1234", clarity: null })).toEqual({ ga: true, clarity: false });
    expect(shouldLoadAnalytics("accepted", { ga: null, clarity: "abcde12" })).toEqual({ ga: false, clarity: true });
  });

  it("treats an empty ID as unset", () => {
    expect(shouldLoadAnalytics("accepted", { ga: "", clarity: "" })).toEqual({ ga: false, clarity: false });
  });

  it("loads nothing while the stored choice is not yet known (server render, before hydration)", () => {
    expect(shouldLoadAnalytics(UNKNOWN_CONSENT, both)).toEqual({ ga: false, clarity: false });
  });
});

describe("shouldShowConsentBanner", () => {
  it("shows only when analytics is configured and the client found no choice", () => {
    expect(shouldShowConsentBanner(null, true)).toBe(true);
  });

  it("hides while the choice is unknown, so returning visitors never see a flash", () => {
    expect(UNKNOWN_CONSENT).toBe("unknown");
    expect(shouldShowConsentBanner(UNKNOWN_CONSENT, true)).toBe(false);
  });

  it.each(["accepted", "declined"] as const)("hides once the visitor has %s", (consent) => {
    expect(shouldShowConsentBanner(consent, true)).toBe(false);
  });

  it("hides when analytics is not configured", () => {
    expect(shouldShowConsentBanner(null, false)).toBe(false);
  });
});

describe("consent cookie", () => {
  it("lasts one year", () => {
    expect(CONSENT_KEY).toBe("thc-consent");
    expect(CONSENT_MAX_AGE).toBe(365 * 24 * 60 * 60);
  });

  it("serialises the choice with SameSite=Lax and Path=/", () => {
    expect(serializeConsentCookie("accepted", false)).toBe(
      `thc-consent=accepted; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax`
    );
  });

  it("adds Secure only on https", () => {
    expect(serializeConsentCookie("declined", true)).toBe(
      `thc-consent=declined; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax; Secure`
    );
  });

  it("expires the cookie to forget the choice", () => {
    expect(expireConsentCookie(false)).toBe("thc-consent=; Max-Age=0; Path=/; SameSite=Lax");
    expect(expireConsentCookie(true)).toMatch(/; Secure$/);
  });

  it("reads the choice back from a cookie header", () => {
    expect(readConsentCookie("a=1; thc-consent=accepted; b=2")).toBe("accepted");
    expect(readConsentCookie("thc-consent=declined")).toBe("declined");
    expect(readConsentCookie("thc-consent=maybe")).toBeNull();
    expect(readConsentCookie("xthc-consent=accepted")).toBeNull();
    expect(readConsentCookie("")).toBeNull();
  });
});

describe("ID patterns", () => {
  it.each(["G-ABCD", "G-ABC1234XYZ"])("accepts the measurement ID %s", (id) => {
    expect(GA_MEASUREMENT_ID_PATTERN.test(id)).toBe(true);
  });

  it.each(["", "G-ABC", "g-ABCD1", "UA-12345-1", "G-abcd1", "G-ABCD1\"", "G-ABCD1</script>"])(
    "rejects the measurement ID %j",
    (id) => {
      expect(GA_MEASUREMENT_ID_PATTERN.test(id)).toBe(false);
    }
  );

  it.each(["abcde", "k2l9x8m7q1"])("accepts the Clarity project ID %s", (id) => {
    expect(CLARITY_PROJECT_ID_PATTERN.test(id)).toBe(true);
  });

  it.each(["", "abcd", "ABCDE1", "abc de", "abcde;alert(1)"])("rejects the Clarity project ID %j", (id) => {
    expect(CLARITY_PROJECT_ID_PATTERN.test(id)).toBe(false);
  });
});

describe("isVendorCookie", () => {
  it.each(["_ga", "_ga_ABC123", "_gid", "_gat_gtag_G_X", "_clck", "_clsk", "CLID", "ANONCHK", "MUID", "SM"])(
    "matches %s",
    (name) => {
      expect(isVendorCookie(name)).toBe(true);
    }
  );

  it.each([CONSENT_KEY, "session", "gallery", "_other", ""])("does not match %j", (name) => {
    expect(isVendorCookie(name)).toBe(false);
  });
});

describe("cookieDomainsFor", () => {
  it("lists the host, its dotted form and the registrable domain", () => {
    expect(cookieDomainsFor("www.thehimalayancompass.in")).toEqual([
      "www.thehimalayancompass.in",
      ".www.thehimalayancompass.in",
      ".thehimalayancompass.in",
    ]);
  });

  it("lists every level between host and registrable domain", () => {
    expect(cookieDomainsFor("a.b.c.d")).toEqual(["a.b.c.d", ".a.b.c.d", ".b.c.d", ".c.d"]);
  });

  it("handles a bare registrable domain", () => {
    expect(cookieDomainsFor("thehimalayancompass.in")).toEqual([
      "thehimalayancompass.in",
      ".thehimalayancompass.in",
    ]);
  });

  it("keeps localhost as is and gives IPs no domains", () => {
    expect(cookieDomainsFor("localhost")).toEqual(["localhost"]);
    expect(cookieDomainsFor("127.0.0.1")).toEqual([]);
    expect(cookieDomainsFor("[::1]")).toEqual([]);
  });
});

describe("expiredCookieStrings", () => {
  it("expires the cookie for each domain and once without a domain", () => {
    expect(expiredCookieStrings("_ga", "www.example.in", false)).toEqual([
      "_ga=; Max-Age=0; Path=/; Domain=www.example.in",
      "_ga=; Max-Age=0; Path=/; Domain=.www.example.in",
      "_ga=; Max-Age=0; Path=/; Domain=.example.in",
      "_ga=; Max-Age=0; Path=/",
    ]);
  });

  it("adds Secure on https", () => {
    const strings = expiredCookieStrings("_clck", "example.in", true);

    expect(strings).toHaveLength(3);
    expect(strings.every((s) => s.endsWith("; Secure"))).toBe(true);
  });

  it("still expires the host-only cookie for an IP", () => {
    expect(expiredCookieStrings("_ga", "127.0.0.1", false)).toEqual(["_ga=; Max-Age=0; Path=/"]);
  });
});
