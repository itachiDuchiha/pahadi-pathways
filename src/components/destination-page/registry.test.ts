import { describe, expect, it, vi } from "vitest";

// Stand-ins keep the page components (and their imports) out of a node test.
vi.mock("@/components/destination-page/ManaliPage", () => ({ default: function ManaliPage() { return null; } }));
vi.mock("@/components/destination-page/ShimlaPage", () => ({ default: function ShimlaPage() { return null; } }));
vi.mock("@/components/destination-page/SpitiPage", () => ({ default: function SpitiPage() { return null; } }));
vi.mock("@/components/destination-page/SharedDestinationPage", () => ({
  default: function SharedDestinationPage() { return null; },
}));

const { getDestinationPage } = await import("./registry");
const { default: ManaliPage } = await import("@/components/destination-page/ManaliPage");
const { default: SharedDestinationPage } = await import("@/components/destination-page/SharedDestinationPage");

describe("getDestinationPage", () => {
  it("renders the dedicated component for a dedicated destination that has one", () => {
    expect(getDestinationPage({ slug: "manali", layout: "dedicated" })).toBe(ManaliPage);
  });

  it("uses the shared layout for a shared destination even when its slug has a dedicated component", () => {
    expect(getDestinationPage({ slug: "manali", layout: "shared" })).toBe(SharedDestinationPage);
  });

  it("falls back to the shared layout for a dedicated destination without a component", () => {
    expect(getDestinationPage({ slug: "tabo", layout: "dedicated" })).toBe(SharedDestinationPage);
  });

  it("does not resolve inherited object keys as components", () => {
    expect(getDestinationPage({ slug: "constructor", layout: "dedicated" })).toBe(SharedDestinationPage);
  });
});
