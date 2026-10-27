// Response header rules for next.config.ts. Kept dependency-free so the
// config can import it and tests can run the sources through Next's matcher.

export type HeaderRule = { source: string; headers: { key: string; value: string }[] };

// Google Analytics and Microsoft Clarity, loaded only after the visitor
// accepts the consent banner (and only when an ID is configured). Clarity's
// tag on www.clarity.ms pulls its runtime from scripts.clarity.ms.
const ANALYTICS_SCRIPTS = ["https://www.googletagmanager.com", "https://www.clarity.ms", "https://scripts.clarity.ms"];
const ANALYTICS_CONNECT = [
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.googletagmanager.com",
  "https://*.clarity.ms",
];
const ANALYTICS_IMG = ["https://*.google-analytics.com", "https://*.googletagmanager.com"];

const siteHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      `img-src 'self' data: blob: ${ANALYTICS_IMG.join(" ")}`,
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      `script-src 'self' 'unsafe-inline' ${ANALYTICS_SCRIPTS.join(" ")}`,
      `connect-src 'self' ${ANALYTICS_CONNECT.join(" ")}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

// Payload's admin and REST API. The admin needs eval (its bundles), Workers
// from blob: URLs, and may load Monaco from jsDelivr for code fields; it may
// also frame its own pages (live preview), so framing is same-origin only.
const cmsHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Content-Security-Policy-Report-Only",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'",
  },
];

/**
 * Later rules override earlier ones for the same header key. Public media
 * files (`/api/media/file/*`, used as page and og:image sources) are not
 * matched by the CMS rules, so they keep the site headers and stay
 * indexable; Next cannot unset a header set by an earlier rule.
 */
export const headerRules: HeaderRule[] = [
  { source: "/(.*)", headers: siteHeaders },
  { source: "/ramram/:path*", headers: cmsHeaders },
  { source: "/api", headers: cmsHeaders },
  { source: "/api/:path((?!media/file/).*)", headers: cmsHeaders },
];
