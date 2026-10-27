import { describe, expect, it } from "vitest";

import type { PricingSetting } from "@/cms/payload-types";
import { pricingSettings } from "@/cms/seed/pricing";

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
        { label: "Deluxe", delta: 0 },
        { label: "Premium", delta: 2500 },
        { label: "Luxury", delta: 5000 },
      ],
      mealOptions: [
        { label: "Breakfast + Dinner (MAP)", delta: 0 },
        { label: "Breakfast Only (CP)", delta: -2500 },
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
