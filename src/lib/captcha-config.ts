/**
 * Turnstile keys. The site key is inlined into client bundles at build
 * time; the secret stays on the server. The CAPTCHA is on only when both
 * are set; the server-side check is `captchaEnabled()` in
 * `@/lib/enquiry/captcha`, kept out of this client-safe module.
 */
export function captchaSiteKey(): string | null {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;
}
