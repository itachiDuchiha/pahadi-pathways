/**
 * Turnstile keys. The site key is inlined into client bundles at build
 * time; the secret stays on the server. The CAPTCHA is on only when both
 * are set.
 */
export function captchaSiteKey(): string | null {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;
}

/** Server-only: true when both Turnstile keys are configured. */
export function captchaEnabled(): boolean {
  return captchaSiteKey() !== null && Boolean(process.env.TURNSTILE_SECRET_KEY);
}
