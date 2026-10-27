import { afterEach, describe, expect, it, vi } from "vitest";

import { mailtoUrl, site, telUrl, whatsappUrl } from "./site";

const custom = {
  ...site,
  phone: { display: "+91 00000 00000", e164: "+910000000000", whatsapp: "910000000000" },
  email: "desk@example.com",
};

describe("site config", () => {
  it("builds a plain WhatsApp URL with no message", () => {
    expect(whatsappUrl(site)).toBe("https://wa.me/917559697919");
  });

  it("builds a WhatsApp URL with an encoded message", () => {
    expect(whatsappUrl(site, "hi there")).toBe(
      "https://wa.me/917559697919?text=hi%20there"
    );
  });

  it("builds the links from the settings it is given", () => {
    expect(whatsappUrl(custom, "hi")).toBe("https://wa.me/910000000000?text=hi");
    expect(whatsappUrl(custom, "a&b ✓")).toBe(
      "https://wa.me/910000000000?text=a%26b%20%E2%9C%93"
    );
    expect(telUrl(custom)).toBe("tel:+910000000000");
    expect(mailtoUrl(custom)).toBe("mailto:desk@example.com");
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
