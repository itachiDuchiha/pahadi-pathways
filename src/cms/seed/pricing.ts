import type { PricingSetting } from "@/cms/payload-types";
import {
  CHILD_RATE_SHARE,
  COMPLIMENTARY_CHILD_MAX_AGE,
  GST_RATE,
  mealOptions,
  packageVehicleRates,
  spitiDailyVehicleRates,
  stayOptions,
  standardDailyVehicleRates,
  vehicleOptions,
} from "@/lib/pricing";

export { packageVehicleRates };

/** The `pricing-settings` global as seeded from the tables in `src/lib/pricing.ts`. */
export type PricingSeed = Omit<PricingSetting, "id" | "updatedAt" | "createdAt">;

export const pricingSettings: PricingSeed = {
  stayOptions: stayOptions.map(({ label, price }) => ({ label, delta: price })),
  mealOptions: mealOptions.map(({ label, price }) => ({ label, delta: price })),
  vehicleOptions: vehicleOptions.map(({ label, key }) => ({
    label,
    key,
    perDayUpgrade: standardDailyVehicleRates[key] - standardDailyVehicleRates.sedan,
    perDayUpgradeSpiti: spitiDailyVehicleRates[key] - spitiDailyVehicleRates.sedan,
  })),
  gstPercent: Math.round(GST_RATE * 100),
  childFreeUnderAge: COMPLIMENTARY_CHILD_MAX_AGE,
  childPercentOfAdult: Math.round(CHILD_RATE_SHARE * 100),
};
