import { describe, expect, it } from "vitest";

import type { PricingSetting } from "@/cms/payload-types";
import { pricingSettings } from "@/cms/seed/pricing";
import { effectivePricingTables } from "@/lib/pricing";

import { mapPackagePricing } from "./mappers";
import { mapPricingTables } from "./pricing-tables";

const STAMP = "2026-10-27T00:00:00.000Z";

function doc(fields: Partial<PricingSetting>): PricingSetting {
  return { id: 1, createdAt: STAMP, updatedAt: STAMP, ...pricingSettings, ...fields };
}

describe("mapPricingTables", () => {
  it("returns the seeded tables without row ids", () => {
    const withIds = doc({
      stayOptions: pricingSettings.stayOptions?.map((row, index) => ({ ...row, id: `s${index}` })),
    });

    expect(mapPricingTables(withIds)).toEqual({
      stayOptions: [
        { label: "Deluxe", deltaPerNight: 0 },
        { label: "Premium", deltaPerNight: 300 },
        { label: "Luxury", deltaPerNight: 600 },
      ],
      mealOptions: [
        { label: "Breakfast + Dinner (MAP)", deltaPerNight: 0 },
        { label: "Breakfast Only (CP)", deltaPerNight: -300 },
      ],
      vehicleOptions: [
        { label: "Sedan", key: "sedan", perDayUpgrade: 0, perDayUpgradeSpiti: 0 },
        { label: "Ertiga / Rumion or similar", key: "ertiga", perDayUpgrade: 1000, perDayUpgradeSpiti: 1000 },
        { label: "Innova Crysta or similar", key: "crysta", perDayUpgrade: 2500, perDayUpgradeSpiti: 3500 },
      ],
      gstPercent: 5,
      childFreeUnderAge: 5,
      childPercentOfAdult: 25,
    });
  });

  it("trims option labels so padded admin input still matches submitted labels", () => {
    const tables = mapPricingTables(
      doc({
        stayOptions: [{ label: " Premium  ", deltaPerNight: 300 }],
        mealOptions: [{ label: "Breakfast Only (CP) ", deltaPerNight: -300 }],
        vehicleOptions: [{ label: "  Sedan", key: "sedan", perDayUpgrade: 0, perDayUpgradeSpiti: 0 }],
      })
    );

    expect(tables.stayOptions[0].label).toBe("Premium");
    expect(tables.mealOptions[0].label).toBe("Breakfast Only (CP)");
    expect(tables.vehicleOptions[0].label).toBe("Sedan");
  });

  it("omits an unset Spiti upgrade", () => {
    const tables = mapPricingTables(
      doc({ vehicleOptions: [{ label: "Sedan", key: "sedan", perDayUpgrade: 0, perDayUpgradeSpiti: null }] })
    );
    expect(tables.vehicleOptions).toEqual([{ label: "Sedan", key: "sedan", perDayUpgrade: 0 }]);
  });

  it("refuses empty option tables", () => {
    expect(() => mapPricingTables(doc({ stayOptions: [] }))).toThrow(/stay options/);
    expect(() => mapPricingTables(doc({ vehicleOptions: null }))).toThrow(/vehicle options/);
  });
});

describe("effectivePricingTables", () => {
  const globals = mapPricingTables(doc({}));

  it("uses the site-wide options when the package has no overrides", () => {
    for (const overrides of [{}, { stayOptions: null, mealOptions: null }, { stayOptions: [], mealOptions: [] }]) {
      const pricing = mapPackagePricing({ basePricePerAdult: 18999, ...overrides });
      expect(effectivePricingTables({ pricing }, globals)).toEqual(globals);
    }
  });

  it("replaces a site-wide list wholesale with the package's list, not label by label", () => {
    const pricing = mapPackagePricing({
      basePricePerAdult: 18999,
      stayOptions: [{ id: "a", label: " Premium ", deltaPerNight: 450 }],
    });

    const tables = effectivePricingTables({ pricing }, globals);

    // Only the package's Premium remains; Deluxe and Luxury are not merged in.
    expect(tables.stayOptions).toEqual([{ label: "Premium", deltaPerNight: 450 }]);
    expect(tables.mealOptions).toEqual(globals.mealOptions);
    expect(tables.vehicleOptions).toBe(globals.vehicleOptions);
    expect(tables).toMatchObject({ gstPercent: 5, childFreeUnderAge: 5, childPercentOfAdult: 25 });
  });

  it("replaces the meal list independently of the stay list", () => {
    const pricing = mapPackagePricing({
      basePricePerAdult: 18999,
      mealOptions: [{ label: "All meals (AP)", deltaPerNight: 500 }],
    });

    const tables = effectivePricingTables({ pricing }, globals);
    expect(tables.stayOptions).toEqual(globals.stayOptions);
    expect(tables.mealOptions).toEqual([{ label: "All meals (AP)", deltaPerNight: 500 }]);
  });
});
