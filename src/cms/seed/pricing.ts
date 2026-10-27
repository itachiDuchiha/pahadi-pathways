import type { PricingSetting } from "@/cms/payload-types";
import type { VehicleKey } from "@/lib/cms/types";

/**
 * Per-adult rate for each upgraded vehicle, by package slug. The Sedan is
 * left empty so it always follows the package's base price.
 */
export const packageVehicleRates: Record<string, Partial<Record<VehicleKey, number>>> = {
  "shimla-kinnaur-spiti-chandratal": { ertiga: 38749, crysta: 54999 },
  "shimla-manali-getaway": { ertiga: 21624, crysta: 32999 },
  "himachal-grand-circuit": { ertiga: 36624, crysta: 47999 },
  "shimla-manali-jibhi": { ertiga: 19999, crysta: 32999 },
  "shimla-kinnaur-spiti-kalpa": { ertiga: 34799, crysta: 49499 },
};

/** The `pricing-settings` global as the seed writes it. */
export type PricingSeed = Omit<PricingSetting, "id" | "updatedAt" | "createdAt">;

export const pricingSettings: PricingSeed = {
  stayOptions: [
    { label: "Deluxe", delta: 0 },
    { label: "Premium", delta: 2500 },
    { label: "Luxury", delta: 5000 },
  ],
  mealOptions: [
    { label: "Breakfast + Dinner (MAP)", delta: 0 },
    { label: "Breakfast Only (CP)", delta: -2500 },
  ],
  // Upgrades over a Sedan per day: daily rates of 3500 / 4500 / 6000,
  // and 4500 / 5500 / 8000 on Spiti routes.
  vehicleOptions: [
    { label: "Sedan", key: "sedan", perDayUpgrade: 0, perDayUpgradeSpiti: 0 },
    { label: "Ertiga / Rumion or similar", key: "ertiga", perDayUpgrade: 1000, perDayUpgradeSpiti: 1000 },
    { label: "Innova Crysta or similar", key: "crysta", perDayUpgrade: 2500, perDayUpgradeSpiti: 3500 },
  ],
  gstPercent: 5,
  childFreeUnderAge: 5,
  childPercentOfAdult: 25,
};
