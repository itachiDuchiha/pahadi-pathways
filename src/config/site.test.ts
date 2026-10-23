import { afterEach, describe, expect, it, vi } from "vitest";

import { site, whatsappUrl } from "./site";

describe("site config", () => {
  it("builds a plain WhatsApp URL with no message", () => {
    expect(whatsappUrl()).toBe("https://wa.me/917559697919");
  });

  it("builds a WhatsApp URL with an encoded message", () => {
    expect(whatsappUrl("hi there")).toBe(
      "https://wa.me/917559697919?text=hi%20there"
    );
  });

  it("has a site URL with no trailing slash", () => {
    expect(site.url.endsWith("/")).toBe(false);
  });

  it("has the correct business email", () => {
    expect(site.email).toBe("thehimalayancompass@gmail.com");
  });

  describe("NEXT_PUBLIC_SITE_URL", () => {
    afterEach(() => {
      vi.unstubAllEnvs();
      vi.resetModules();
    });

    it("falls back to the default URL when the variable is empty", async () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      vi.resetModules();

      const fresh = await import("./site");

      expect(fresh.site.url).toBe("https://thehimalayancompass.in");
    });

    it("falls back to the default URL when the variable is only spaces", async () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "   ");
      vi.resetModules();

      const fresh = await import("./site");

      expect(fresh.site.url).toBe("https://thehimalayancompass.in");
    });
  });
});
