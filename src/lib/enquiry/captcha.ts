import { captchaEnabled } from "@/lib/captcha-config";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * `disabled`: no secret is configured, so there is nothing to check.
 * `unavailable`: Cloudflare could not give an answer (timeout, error
 * status, unreadable reply); the handler accepts the enquiry rather than
 * lose a real visitor's lead to an outage.
 */
export type CaptchaResult = "success" | "invalid" | "unavailable" | "disabled";

/**
 * Checks a Turnstile token with Cloudflare's siteverify endpoint. By
 * default the secret is used only when both keys are set: a secret alone,
 * with no site key to render the widget, must not reject every enquiry.
 */
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string | null,
  deps: { fetch?: typeof fetch; secret?: string | undefined; timeoutMs?: number } = {}
): Promise<CaptchaResult> {
  const secret = "secret" in deps
    ? deps.secret
    : captchaEnabled()
      ? process.env.TURNSTILE_SECRET_KEY
      : undefined;

  if (!secret) return "disabled";
  if (!token) return "invalid";

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await (deps.fetch ?? fetch)(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(deps.timeoutMs ?? 5000),
    });

    if (response.status !== 200) return "unavailable";

    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("success" in result)) return "unavailable";

    return result.success === true ? "success" : "invalid";
  } catch {
    return "unavailable";
  }
}
