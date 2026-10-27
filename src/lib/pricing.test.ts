import { describe, expect, it } from "vitest";

import { packageVehicleRates, pricingSettings } from "@/cms/seed/pricing";
import { mapPackagePricing } from "@/lib/cms/mappers";
import { mapPricingTables } from "@/lib/cms/pricing-tables";

import {
  computePackagePrice,
  findMealOption,
  findStayOption,
  findVehicleOption,
  parsePackagePrice,
} from "./pricing";

// The seeded tables, read back through the same mapper the site uses.
const tables = mapPricingTables({ id: 1, ...pricingSettings });

const defaults = {
  stay: tables.stayOptions[0].label,
  meals: tables.mealOptions[0].label,
  vehicle: tables.vehicleOptions[0].label,
};

function unrated(basePricePerAdult: number, tourDays = 1, isSpitiRoute = false) {
  return { slug: "test-package", basePricePerAdult, tourDays, isSpitiRoute };
}

describe("parsePackagePrice", () => {
  it("strips the currency symbol and separators", () => {
    expect(parsePackagePrice("₹32,249")).toBe(32249);
  });

  it("returns 0 for a price with no digits", () => {
    expect(parsePackagePrice("On request")).toBe(0);
  });
});

describe("option lookups", () => {
  it("find an option by label in the given tables and fall back to the first", () => {
    expect(findStayOption("Premium", tables)).toEqual({ label: "Premium", delta: 2500 });
    expect(findMealOption("Breakfast Only (CP)", tables)).toEqual({ label: "Breakfast Only (CP)", delta: -2500 });
    expect(findVehicleOption("Innova Crysta or similar", tables).key).toBe("crysta");
    expect(findStayOption("Palace", tables)).toBe(tables.stayOptions[0]);
  });
});

describe("computePackagePrice", () => {
  it("prices two adults on the default options of an unrated package", () => {
    expect(
      computePackagePrice(
        { package: unrated(10000), ...defaults, adults: 2, childAges: [] },
        tables
      )
    ).toMatchObject({ packageCost: 20000, gst: 1000, estimatedTotal: 21000 });
  });

  it("charges GST at 5% of the package cost, rounded", () => {
    const result = computePackagePrice(
      { package: unrated(12345), ...defaults, adults: 3, childAges: [6] },
      tables
    );

    expect(result.gst).toBe(Math.round(result.packageCost * 0.05));
    expect(result.estimatedTotal).toBe(result.packageCost + result.gst);
  });

  it("uses the per-vehicle adult rate, child-age rules and option deltas for a rated package", () => {
    // Ertiga rate 21624 per adult; one child under 5 is free, one aged 7 pays
    // round(21624 * 0.25) = 5406; Premium stay +2500; CP meals -2500.
    expect(
      computePackagePrice(
        {
          package: {
            slug: "shimla-manali-getaway",
            basePricePerAdult: 18999,
            vehicleRates: mapPackagePricing({
              basePricePerAdult: 18999,
              vehicleRates: packageVehicleRates["shimla-manali-getaway"],
            }).vehicleRates,
            tourDays: 7,
            isSpitiRoute: false,
          },
          stay: "Premium",
          meals: "Breakfast Only (CP)",
          vehicle: "Ertiga / Rumion or similar",
          adults: 2,
          childAges: [3, 7],
        },
        tables
      )
    ).toMatchObject({ packageCost: 48654, gst: 2433, estimatedTotal: 51087 });
  });

  it("adds a per-day vehicle upgrade for an unrated package", () => {
    // Crysta over Sedan on a non-Spiti route: (6000 - 3500) * 5 days.
    expect(
      computePackagePrice(
        {
          package: unrated(10000, 5),
          ...defaults,
          vehicle: "Innova Crysta or similar",
          adults: 1,
          childAges: [],
        },
        tables
      )
    ).toMatchObject({ packageCost: 22500, gst: 1125, estimatedTotal: 23625 });
  });

  it("uses the Spiti per-day upgrade on a Spiti route", () => {
    // Crysta over Sedan on a Spiti route: (8000 - 4500) * 5 days.
    expect(
      computePackagePrice(
        {
          package: unrated(10000, 5, true),
          ...defaults,
          vehicle: "Innova Crysta or similar",
          adults: 1,
          childAges: [],
        },
        tables
      )
    ).toMatchObject({ vehicleUpgradePerDay: 3500, packageCost: 27500 });
  });

  it("reads GST and the child rule from the tables", () => {
    const custom = { ...tables, gstPercent: 12, childFreeUnderAge: 3, childPercentOfAdult: 50 };
    const result = computePackagePrice(
      { package: unrated(10000), ...defaults, adults: 1, childAges: [2, 3] },
      custom
    );

    // The 2-year-old is free; the 3-year-old pays 50% of 10000.
    expect(result).toMatchObject({ childPrice: 5000, packageCost: 15000, gst: 1800, estimatedTotal: 16800 });
  });
});
