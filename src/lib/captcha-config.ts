/**
 * Turnstile keys. The site key is inlined into client bundles at build
 * time; the secret stays on the server. The CAPTCHA is on only when both
 * are set; the server-side check is `captchaEnabled()` in
 * `@/lib/enquiry/captcha`, kept out of this client-safe module.
 */
export function captchaSiteKey(): string | null {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;
}

/**
 * The site key the browser should use, or null for no widget and no
 * script. `enabled` is the server's `captchaEnabled()`, handed down by
 * the layout, so a site key without the secret shows nothing.
 */
export function captchaWidgetSiteKey(enabled: boolean): string | null {
  return enabled ? captchaSiteKey() : null;
}
