import { afterEach, describe, expect, it, vi } from "vitest";

import { captchaWidgetSiteKey } from "./captcha-config";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("captchaWidgetSiteKey", () => {
  it("returns the site key only when the server reports both keys set", () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site-key");
    expect(captchaWidgetSiteKey(true)).toBe("site-key");
    expect(captchaWidgetSiteKey(false)).toBeNull();

    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
    expect(captchaWidgetSiteKey(true)).toBeNull();
  });
});
