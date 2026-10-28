/**
 * Analytics consent, kept free of browser globals so it can be tested in
 * Node. The client provider (`src/components/analytics/ConsentProvider.tsx`)
 * does the reading and writing; this module only decides.
 */

export type Consent = "accepted" | "declined";

/**
 * The server render (and the hydration pass) cannot read the stored
 * choice, so it reports this instead of `null` ("no choice yet").
 */
export const UNKNOWN_CONSENT = "unknown";

/** What the consent store reports: a choice, no choice (`null`), or not yet known. */
export type ConsentSnapshot = Consent | null | typeof UNKNOWN_CONSENT;

/** The `localStorage` key and cookie name holding the visitor's choice. */
export const CONSENT_KEY = "thc-consent";

/** One year, in seconds. */
export const CONSENT_MAX_AGE = 365 * 24 * 60 * 60;

/** A Google Analytics 4 measurement ID, e.g. `G-ABC123XYZ9`. */
export const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,}$/;

/** A Microsoft Clarity project ID, e.g. `k2l9x8m7q1`. */
export const CLARITY_PROJECT_ID_PATTERN = /^[a-z0-9]{5,}$/;

export const DEFAULT_CONSENT_BANNER_TEXT =
  "We use cookies for analytics to improve this site. You can accept or decline; declining keeps the site fully usable.";

/** A stored choice, or `null` for anything else (no choice yet). */
export function parseConsent(value: unknown): Consent | null {
  return value === "accepted" || value === "declined" ? value : null;
}

/** A vendor loads only once the visitor accepted and its ID is set. */
export function shouldLoadAnalytics(
  consent: ConsentSnapshot,
  ids: { ga: string | null; clarity: string | null }
): { ga: boolean; clarity: boolean } {
  const accepted = consent === "accepted";

  return { ga: accepted && Boolean(ids.ga), clarity: accepted && Boolean(ids.clarity) };
}

/**
 * The banner asks only while analytics is configured and the client has
 * read the stored choice and found none; never while it is unknown.
 */
export function shouldShowConsentBanner(consent: ConsentSnapshot, enabled: boolean): boolean {
  return enabled && consent === null;
}

function cookieAttributes(maxAge: number, secure: boolean): string {
  return `Max-Age=${maxAge}; Path=/; SameSite=Lax${secure ? "; Secure" : ""}`;
}

/** The `document.cookie` string that stores `value` for a year. `secure` on https only. */
export function serializeConsentCookie(value: Consent, secure: boolean): string {
  return `${CONSENT_KEY}=${value}; ${cookieAttributes(CONSENT_MAX_AGE, secure)}`;
}

/** The `document.cookie` string that forgets the choice. */
export function expireConsentCookie(secure: boolean): string {
  return `${CONSENT_KEY}=; ${cookieAttributes(0, secure)}`;
}

/** The choice stored in a `Cookie` header (or `document.cookie`), if any. */
export function readConsentCookie(cookies: string): Consent | null {
  for (const part of cookies.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === CONSENT_KEY) return parseConsent(rest.join("="));
  }

  return null;
}

/**
 * Cookie names the analytics vendors set. The underscore-led ones are
 * families (`_ga_<ID>`, `_gat_gtag_...`) and match by prefix; the others
 * are exact names, so an unrelated `SMTP` or `MUIDX` is left alone.
 */
export const VENDOR_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_clck", "_clsk", "CLID", "ANONCHK", "MUID", "SM"];

export function isVendorCookie(name: string): boolean {
  return VENDOR_COOKIE_PREFIXES.some((prefix) => (prefix.startsWith("_") ? name.startsWith(prefix) : name === prefix));
}

/**
 * The `Domain` values a vendor cookie could have been set with, from the
 * host itself down to the registrable (last two labels) domain. IPs have
 * none, and a single-label host such as `localhost` is its own only value.
 */
export function cookieDomainsFor(hostname: string): string[] {
  if (hostname.includes(":") || /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) return [];

  const labels = hostname.split(".");
  if (labels.length < 2) return [hostname];

  const domains = [hostname];
  for (let start = 0; start <= labels.length - 2; start += 1) {
    domains.push(`.${labels.slice(start).join(".")}`);
  }

  return domains;
}

/** The `document.cookie` strings that expire `name` on every domain variant and host-only. */
export function expiredCookieStrings(name: string, hostname: string, secure = false): string[] {
  const suffix = secure ? "; Secure" : "";
  const base = `${name}=; Max-Age=0; Path=/`;

  return [...cookieDomainsFor(hostname).map((domain) => `${base}; Domain=${domain}${suffix}`), `${base}${suffix}`];
}
