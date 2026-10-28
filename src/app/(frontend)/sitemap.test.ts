import { describe, expect, it, vi } from "vitest";

import { allDestinations } from "@/cms/seed/destinations";
import { packages } from "@/cms/seed/packages";

vi.mock("@/lib/cms/packages", () => ({ getPackages: async () => packages }));
vi.mock("@/lib/cms/destinations", () => ({ getDestinations: async () => allDestinations }));

const { default: sitemap } = await import("./sitemap");

describe("sitemap", () => {
  it("lists every package and destination page and never a draft preview", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls.length).toBe(1 + 8 + packages.length + allDestinations.length);
    expect(urls.some((url) => url.includes("/preview/"))).toBe(false);
  });
});
