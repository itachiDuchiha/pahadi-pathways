import { describe, expect, it } from "vitest";

import {
  computePackagePrice,
  mealOptions,
  parsePackagePrice,
  stayOptions,
  vehicleOptions,
} from "./pricing";

const defaults = {
  stay: stayOptions[0].label,
  meals: mealOptions[0].label,
  vehicle: vehicleOptions[0].label,
};

describe("parsePackagePrice", () => {
  it("strips the currency symbol and separators", () => {
    expect(parsePackagePrice("₹32,249")).toBe(32249);
  });

  it("returns 0 for a price with no digits", () => {
    expect(parsePackagePrice("On request")).toBe(0);
  });
});

describe("computePackagePrice", () => {
  it("prices two adults on the default options of an unrated package", () => {
    expect(
      computePackagePrice({
        basePrice: 10000,
        ...defaults,
        adults: 2,
        childAges: [],
      })
    ).toMatchObject({ packageCost: 20000, gst: 1000, estimatedTotal: 21000 });
  });

  it("charges GST at 5% of the package cost, rounded", () => {
    const result = computePackagePrice({
      basePrice: 12345,
      ...defaults,
      adults: 3,
      childAges: [6],
    });

    expect(result.gst).toBe(Math.round(result.packageCost * 0.05));
    expect(result.estimatedTotal).toBe(result.packageCost + result.gst);
  });

  it("uses the per-vehicle adult rate, child-age rules and option deltas for a rated package", () => {
    // Ertiga rate 21624 per adult; one child under 5 is free, one aged 7 pays
    // round(21624 * 0.25) = 5406; Premium stay +2500; CP meals -2500.
    expect(
      computePackagePrice({
        basePrice: 18999,
        slug: "shimla-manali-getaway",
        stay: "Premium",
        meals: "Breakfast Only (CP)",
        vehicle: "Ertiga / Rumion or similar",
        adults: 2,
        childAges: [3, 7],
      })
    ).toMatchObject({ packageCost: 48654, gst: 2433, estimatedTotal: 51087 });
  });

  it("adds a per-day vehicle upgrade for an unrated package", () => {
    // Crysta over Sedan on a non-Spiti route: (6000 - 3500) * 5 days.
    expect(
      computePackagePrice({
        basePrice: 10000,
        ...defaults,
        vehicle: "Innova Crysta or similar",
        adults: 1,
        childAges: [],
        tourDays: 5,
      })
    ).toMatchObject({ packageCost: 22500, gst: 1125, estimatedTotal: 23625 });
  });
});
