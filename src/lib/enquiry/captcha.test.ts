import { describe, expect, it, vi } from "vitest";

import { verifyTurnstile } from "./captcha";

const SECRET = "test-secret";
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function jsonFetch(status: number, body: unknown) {
  return vi.fn<typeof fetch>(async () => Response.json(body, { status }));
}

describe("verifyTurnstile", () => {
  it("is disabled when no secret is configured", async () => {
    const fetch = jsonFetch(200, { success: true });

    await expect(verifyTurnstile("token", "203.0.113.1", { fetch, secret: undefined })).resolves.toBe(
      "disabled"
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rejects a missing token without calling Cloudflare", async () => {
    const fetch = jsonFetch(200, { success: true });

    await expect(verifyTurnstile(undefined, "203.0.113.1", { fetch, secret: SECRET })).resolves.toBe(
      "invalid"
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("posts the secret, token and IP form-encoded and accepts a success", async () => {
    const fetch = jsonFetch(200, { success: true });

    await expect(verifyTurnstile("token", "203.0.113.1", { fetch, secret: SECRET })).resolves.toBe(
      "success"
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe(VERIFY_URL);
    expect(init?.method).toBe("POST");
    expect(init?.signal).toBeInstanceOf(AbortSignal);
    const body = init?.body;
    expect(body).toBeInstanceOf(URLSearchParams);
    const params = body as URLSearchParams;
    expect(params.get("secret")).toBe(SECRET);
    expect(params.get("response")).toBe("token");
    expect(params.get("remoteip")).toBe("203.0.113.1");
  });

  it("omits remoteip when the client IP is unknown", async () => {
    const fetch = jsonFetch(200, { success: true });

    await verifyTurnstile("token", null, { fetch, secret: SECRET });

    const params = fetch.mock.calls[0][1]?.body as URLSearchParams;
    expect(params.has("remoteip")).toBe(false);
  });

  it("treats a failed check as invalid", async () => {
    const fetch = jsonFetch(200, { success: false, "error-codes": ["invalid-input-response"] });

    await expect(verifyTurnstile("token", null, { fetch, secret: SECRET })).resolves.toBe("invalid");
  });

  it("treats a non-200 answer as unavailable", async () => {
    const fetch = jsonFetch(500, { success: false });

    await expect(verifyTurnstile("token", null, { fetch, secret: SECRET })).resolves.toBe(
      "unavailable"
    );
  });

  it("treats a timeout as unavailable", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () => {
      throw new DOMException("The operation was aborted.", "AbortError");
    });

    await expect(
      verifyTurnstile("token", null, { fetch, secret: SECRET, timeoutMs: 10 })
    ).resolves.toBe("unavailable");
  });

  it("treats an unreadable answer as unavailable", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(
      async () => new Response("<html>", { status: 200 })
    );

    await expect(verifyTurnstile("token", null, { fetch, secret: SECRET })).resolves.toBe(
      "unavailable"
    );
  });

  it("reads the secret from TURNSTILE_SECRET_KEY only when both keys are set", async () => {
    const fetch = jsonFetch(200, { success: true });

    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site-key");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    await expect(verifyTurnstile("token", null, { fetch })).resolves.toBe("disabled");

    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    await expect(verifyTurnstile(undefined, null, { fetch })).resolves.toBe("disabled");

    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site-key");
    await expect(verifyTurnstile("token", null, { fetch })).resolves.toBe("success");
    expect((fetch.mock.calls[0][1]?.body as URLSearchParams).get("secret")).toBe(SECRET);
    vi.unstubAllEnvs();
  });
});
