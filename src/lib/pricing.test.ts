import { describe, expect, it } from "vitest";

import { packages } from "@/cms/seed/packages";
import {
  packageOptionOverrides,
  packageVehicleRates,
  pricingSettings,
  seededPackageNights,
} from "@/cms/seed/pricing";
import { mapPackagePricing } from "@/lib/cms/mappers";
import { mapPricingTables } from "@/lib/cms/pricing-tables";
import type { Package } from "@/lib/cms/types";

import {
  computePackagePrice,
  effectivePricingTables,
  findMealOption,
  findStayOption,
  findVehicleOption,
  packageNights,
  packagePricingContext,
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
  return { slug: "test-package", basePricePerAdult, tourDays, nights: Math.max(1, tourDays - 1), isSpitiRoute };
}

/** A fixture package with the pricing the seed writes for it. */
function seededPackage(slug: string): Package {
  const fixture = packages.find((item) => item.slug === slug);
  if (!fixture) throw new Error(`No package fixture ${slug}`);

  return {
    ...fixture,
    pricing: mapPackagePricing({
      basePricePerAdult: parsePackagePrice(fixture.price),
      vehicleRates: packageVehicleRates[slug],
      ...packageOptionOverrides[slug],
    }),
  };
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
    expect(findStayOption("Premium", tables)).toEqual({ label: "Premium", deltaPerNight: 300 });
    expect(findMealOption("Breakfast Only (CP)", tables)).toEqual({ label: "Breakfast Only (CP)", deltaPerNight: -300 });
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
    // round(21624 * 0.25) = 5406; Premium stay +2500 and CP meals -2500 over
    // the package's 6 nights.
    const pkg = seededPackage("shimla-manali-getaway");
    expect(
      computePackagePrice(
        {
          package: packagePricingContext(pkg),
          stay: "Premium",
          meals: "Breakfast Only (CP)",
          vehicle: "Ertiga / Rumion or similar",
          adults: 2,
          childAges: [3, 7],
        },
        effectivePricingTables(pkg, tables)
      )
    ).toMatchObject({ packageCost: 48654, gst: 2433, estimatedTotal: 51087, stayPrice: 2500, mealPrice: -2500 });
  });

  it("charges stay and meal options per night, rounded to the rupee", () => {
    // A stay at 333.4 and CP at -300 per night over 4 nights.
    const result = computePackagePrice(
      {
        package: unrated(10000, 5),
        stay: "Premium",
        meals: "Breakfast Only (CP)",
        vehicle: "Sedan",
        adults: 1,
        childAges: [],
      },
      { ...tables, stayOptions: [{ label: "Premium", deltaPerNight: 333.4 }] }
    );
    expect(result).toMatchObject({ stayPrice: 1334, mealPrice: -1200, packageCost: 10134 });
  });

  it("prices the same per-night option differently on a 6-night and a 9-night package", () => {
    const fixture = seededPackage("shimla-manali-getaway");
    const pricing = { ...fixture.pricing, stayOptions: [{ label: "Premium", deltaPerNight: 400 }] };
    const quote = (duration: string) => {
      const pkg = { ...fixture, duration, pricing };
      return computePackagePrice(
        { package: packagePricingContext(pkg), ...defaults, stay: "Premium", adults: 1, childAges: [] },
        effectivePricingTables(pkg, tables)
      );
    };

    const six = quote("6N / 7D");
    const nine = quote("9N / 10D");
    expect(six).toMatchObject({ stayPrice: 2400, packageCost: 18999 + 2400 });
    expect(nine).toMatchObject({ stayPrice: 3600, packageCost: 18999 + 3600 });
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

describe("packageNights", () => {
  it("reads the nights from the duration, else one less than the days, at least one", () => {
    expect(packageNights("9N / 10D", 10)).toBe(9);
    expect(packageNights("6n/7d", 7)).toBe(6);
    expect(packageNights("10 Days", 10)).toBe(9);
    expect(packageNights("Day trip", 1)).toBe(1);
  });
});

/*
  Quotes recorded from the flat per-booking deltas (Premium +2500, Luxury
  +5000, CP -2500) before options were priced per night: Sedan, two adults
  and one child aged 7. The seeded per-night overrides must reproduce them.
*/
const FLAT_QUOTES: [slug: string, stay: string, meals: string, packageCost: number, gst: number, estimatedTotal: number][] = [
  ["himachal-grand-circuit", "Deluxe", "Breakfast + Dinner (MAP)", 72167, 3608, 75775],
  ["himachal-grand-circuit", "Deluxe", "Breakfast Only (CP)", 69667, 3483, 73150],
  ["himachal-grand-circuit", "Premium", "Breakfast + Dinner (MAP)", 74667, 3733, 78400],
  ["himachal-grand-circuit", "Premium", "Breakfast Only (CP)", 72167, 3608, 75775],
  ["himachal-grand-circuit", "Luxury", "Breakfast + Dinner (MAP)", 77167, 3858, 81025],
  ["himachal-grand-circuit", "Luxury", "Breakfast Only (CP)", 74667, 3733, 78400],
  ["shimla-kinnaur-spiti-chandratal", "Deluxe", "Breakfast + Dinner (MAP)", 72560, 3628, 76188],
  ["shimla-kinnaur-spiti-chandratal", "Deluxe", "Breakfast Only (CP)", 70060, 3503, 73563],
  ["shimla-kinnaur-spiti-chandratal", "Premium", "Breakfast + Dinner (MAP)", 75060, 3753, 78813],
  ["shimla-kinnaur-spiti-chandratal", "Premium", "Breakfast Only (CP)", 72560, 3628, 76188],
  ["shimla-kinnaur-spiti-chandratal", "Luxury", "Breakfast + Dinner (MAP)", 77560, 3878, 81438],
  ["shimla-kinnaur-spiti-chandratal", "Luxury", "Breakfast Only (CP)", 75060, 3753, 78813],
  ["shimla-kinnaur-spiti-kalpa", "Deluxe", "Breakfast + Dinner (MAP)", 66485, 3324, 69809],
  ["shimla-kinnaur-spiti-kalpa", "Deluxe", "Breakfast Only (CP)", 63985, 3199, 67184],
  ["shimla-kinnaur-spiti-kalpa", "Premium", "Breakfast + Dinner (MAP)", 68985, 3449, 72434],
  ["shimla-kinnaur-spiti-kalpa", "Premium", "Breakfast Only (CP)", 66485, 3324, 69809],
  ["shimla-kinnaur-spiti-kalpa", "Luxury", "Breakfast + Dinner (MAP)", 71485, 3574, 75059],
  ["shimla-kinnaur-spiti-kalpa", "Luxury", "Breakfast Only (CP)", 68985, 3449, 72434],
  ["shimla-manali-getaway", "Deluxe", "Breakfast + Dinner (MAP)", 42748, 2137, 44885],
  ["shimla-manali-getaway", "Deluxe", "Breakfast Only (CP)", 40248, 2012, 42260],
  ["shimla-manali-getaway", "Premium", "Breakfast + Dinner (MAP)", 45248, 2262, 47510],
  ["shimla-manali-getaway", "Premium", "Breakfast Only (CP)", 42748, 2137, 44885],
  ["shimla-manali-getaway", "Luxury", "Breakfast + Dinner (MAP)", 47748, 2387, 50135],
  ["shimla-manali-getaway", "Luxury", "Breakfast Only (CP)", 45248, 2262, 47510],
  ["shimla-manali-jibhi", "Deluxe", "Breakfast + Dinner (MAP)", 42748, 2137, 44885],
  ["shimla-manali-jibhi", "Deluxe", "Breakfast Only (CP)", 40248, 2012, 42260],
  ["shimla-manali-jibhi", "Premium", "Breakfast + Dinner (MAP)", 45248, 2262, 47510],
  ["shimla-manali-jibhi", "Premium", "Breakfast Only (CP)", 42748, 2137, 44885],
  ["shimla-manali-jibhi", "Luxury", "Breakfast + Dinner (MAP)", 47748, 2387, 50135],
  ["shimla-manali-jibhi", "Luxury", "Breakfast Only (CP)", 45248, 2262, 47510],
];

/** The flat per-booking deltas the overrides replace. */
const FLAT_DELTAS: Record<string, number> = {
  Deluxe: 0,
  Premium: 2500,
  Luxury: 5000,
  "Breakfast + Dinner (MAP)": 0,
  "Breakfast Only (CP)": -2500,
};

describe("per-night parity with the flat deltas", () => {
  it("seeds overrides for every fixture package, divided by its nights", () => {
    for (const pkg of packages) {
      expect(seededPackageNights[pkg.slug]).toBe(packagePricingContext(seededPackage(pkg.slug)).nights);
    }
    expect(Object.keys(seededPackageNights).sort()).toEqual(packages.map((pkg) => pkg.slug).sort());
  });

  it.each(FLAT_QUOTES)("%s, %s, %s keeps its quote", (slug, stay, meals, packageCost, gst, estimatedTotal) => {
    const pkg = seededPackage(slug);
    expect(
      computePackagePrice(
        { package: packagePricingContext(pkg), stay, meals, vehicle: "Sedan", adults: 2, childAges: [7] },
        effectivePricingTables(pkg, tables)
      )
    ).toMatchObject({ packageCost, gst, estimatedTotal });
  });

  it("charges every seeded package the old flat delta for every stay, meal and vehicle", () => {
    let compared = 0;
    for (const { slug } of packages) {
      const pkg = seededPackage(slug);
      const effective = effectivePricingTables(pkg, tables);
      for (const stay of effective.stayOptions) {
        for (const meal of effective.mealOptions) {
          for (const vehicle of effective.vehicleOptions) {
            const price = computePackagePrice(
              {
                package: packagePricingContext(pkg),
                stay: stay.label,
                meals: meal.label,
                vehicle: vehicle.label,
                adults: 2,
                childAges: [3, 7],
              },
              effective
            );
            expect(price.stayPrice).toBe(FLAT_DELTAS[stay.label]);
            expect(price.mealPrice).toBe(FLAT_DELTAS[meal.label]);
            compared++;
          }
        }
      }
    }
    expect(compared).toBe(5 * 3 * 2 * 3);
  });
});
