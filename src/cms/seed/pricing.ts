import type { PricingSetting } from "@/cms/payload-types";
import type { PricingOption, VehicleKey } from "@/lib/cms/types";

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
  // Rupees per adult per night: round defaults for packages without their own lists.
  stayOptions: [
    { label: "Deluxe", deltaPerNight: 0 },
    { label: "Premium", deltaPerNight: 300 },
    { label: "Luxury", deltaPerNight: 600 },
  ],
  mealOptions: [
    { label: "Breakfast + Dinner (MAP)", deltaPerNight: 0 },
    { label: "Breakfast Only (CP)", deltaPerNight: -300 },
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

/**
 * Flat per-adult deltas the seeded packages were quoted with before stay
 * and meal options were priced per night.
 */
const flatStayDeltas: [label: string, delta: number][] = [
  ["Deluxe", 0],
  ["Premium", 2500],
  ["Luxury", 5000],
];
const flatMealDeltas: [label: string, delta: number][] = [
  ["Breakfast + Dinner (MAP)", 0],
  ["Breakfast Only (CP)", -2500],
];

/** Nights of each seeded package, from its duration. */
export const seededPackageNights: Record<string, number> = {
  "shimla-kinnaur-spiti-chandratal": 9,
  "shimla-manali-getaway": 6,
  "himachal-grand-circuit": 9,
  "shimla-manali-jibhi": 7,
  "shimla-kinnaur-spiti-kalpa": 8,
};

function perNight(flat: [label: string, delta: number][], nights: number): PricingOption[] {
  return flat.map(([label, delta]) => ({ label, deltaPerNight: delta / nights }));
}

/**
 * Each seeded package's own stay and meal lists: the flat delta divided by
 * its nights, unrounded, so its quotes match the flat-delta quotes exactly.
 */
export const packageOptionOverrides: Record<string, { stayOptions: PricingOption[]; mealOptions: PricingOption[] }> =
  Object.fromEntries(
    Object.entries(seededPackageNights).map(([slug, nights]) => [
      slug,
      { stayOptions: perNight(flatStayDeltas, nights), mealOptions: perNight(flatMealDeltas, nights) },
    ])
  );
