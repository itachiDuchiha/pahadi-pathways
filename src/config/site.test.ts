import { describe, expect, it } from "vitest";

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
});
