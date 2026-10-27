import type { Package } from "@/data/packages";

/* =========================================================
   TYPES
========================================================= */

export type StayKey = "Deluxe" | "Premium" | "Luxury";

export type MealKey = "Breakfast + Dinner (MAP)" | "Breakfast Only (CP)";

export type VehicleKey = "sedan" | "ertiga" | "crysta";

export type StayOption = {
  label: StayKey;
  price: number;
};

export type MealOption = {
  label: MealKey;
  price: number;
};

export type VehicleOption = {
  label: string;
  key: VehicleKey;
};

/* =========================================================
   OPTIONS

   Keep these simple and easy to modify later.
========================================================= */

export const stayOptions: StayOption[] = [
  {
    label: "Deluxe",
    price: 0,
  },
  {
    label: "Premium",
    price: 2500,
  },
  {
    label: "Luxury",
    price: 5000,
  },
];

export const mealOptions: MealOption[] = [
  {
    label: "Breakfast + Dinner (MAP)",
    price: 0,
  },
  {
    label: "Breakfast Only (CP)",
    price: -2500,
  },
];

export const vehicleOptions: VehicleOption[] = [
  {
    label: "Sedan",
    key: "sedan",
  },
  {
    label: "Ertiga / Rumion or similar",
    key: "ertiga",
  },
  {
    label: "Innova Crysta or similar",
    key: "crysta",
  },
];

// Published base prices are the lowest Sedan rates. These per-adult
// amounts keep the agreed vehicle tiers consistent across the five packages.
export const packageVehicleRates: Record<string, Record<VehicleKey, number>> = {
  "shimla-kinnaur-spiti-chandratal": { sedan: 32249, ertiga: 38749, crysta: 54999 },
  "shimla-manali-getaway": { sedan: 18999, ertiga: 21624, crysta: 32999 },
  "himachal-grand-circuit": { sedan: 32074, ertiga: 36624, crysta: 47999 },
  "shimla-manali-jibhi": { sedan: 18999, ertiga: 19999, crysta: 32999 },
  "shimla-kinnaur-spiti-kalpa": { sedan: 29549, ertiga: 34799, crysta: 49499 },
};

/** Daily vehicle cost, used for the upgrade on packages without vehicle rates. */
export const standardDailyVehicleRates: Record<VehicleKey, number> = {
  sedan: 3500,
  ertiga: 4500,
  crysta: 6000,
};

/** Daily vehicle cost on Spiti routes. */
export const spitiDailyVehicleRates: Record<VehicleKey, number> = {
  sedan: 4500,
  ertiga: 5500,
  crysta: 8000,
};

export const GST_RATE = 0.05;

/** Children younger than this travel free with no extra bed. */
export const COMPLIMENTARY_CHILD_MAX_AGE = 5;

/** Paying children are charged this share of the adult rate. */
export const CHILD_RATE_SHARE = 0.25;

/* =========================================================
   HELPERS
========================================================= */

export function formatCurrency(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function parsePackagePrice(price: string): number {
  return Number(String(price).replace(/[^\d.]/g, "")) || 0;
}

export function findStayOption(label: string): StayOption {
  return stayOptions.find((option) => option.label === label) ?? stayOptions[0];
}

export function findMealOption(label: string): MealOption {
  return mealOptions.find((option) => option.label === label) ?? mealOptions[0];
}

export function findVehicleOption(label: string): VehicleOption {
  return (
    vehicleOptions.find((option) => option.label === label) ?? vehicleOptions[0]
  );
}

/**
 * Package-specific inputs to `computePackagePrice`, derived from the
 * package record so the booking panel and the server price identically.
 */
export function packagePricingContext(
  pkg: Pick<Package, "slug" | "title" | "duration" | "price" | "itineraryDays">
): { basePrice: number; slug: string; tourDays: number; isSpitiRoute: boolean } {
  return {
    basePrice: parsePackagePrice(pkg.price),
    slug: pkg.slug,
    tourDays:
      Number(pkg.duration.match(/(\d+)\s*D/i)?.[1]) ||
      pkg.itineraryDays?.length ||
      1,
    isSpitiRoute: /spiti|kaza|tabo|kunzum|chandratal/i.test(
      pkg.title + " " + pkg.slug
    ),
  };
}

export type PackagePriceInput = {
  /** Published per-adult price of the package. */
  basePrice: number;
  stay: string;
  meals: string;
  vehicle: string;
  adults: number;
  childAges: number[];
  /** Selects the per-vehicle adult rates when the package has them. */
  slug?: string;
  /** Used for the per-day vehicle upgrade on packages without vehicle rates. */
  tourDays?: number;
  isSpitiRoute?: boolean;
};

export type PackagePrice = {
  packageCost: number;
  gst: number;
  estimatedTotal: number;
  /** True when the package has fixed per-vehicle adult rates. */
  hasVehicleRates: boolean;
  adultRate: number;
  extraAdultPrice: number;
  childRate: number;
  childPrice: number;
  paidChildren: number[];
  complimentaryChildren: number[];
  stayPrice: number;
  mealPrice: number;
  vehicleUpgradePerDay: number;
  vehicleUpgradeTotal: number;
  tourDays: number;
};

/* =========================================================
   CALCULATION

   Package price is treated as the price per adult. The first
   adult is included as the base package price; each additional
   adult is charged at the adult rate.

   Under 5: complimentary, no extra bed.
   5 and over: 25% of the adult rate.
========================================================= */

export function computePackagePrice(input: PackagePriceInput): PackagePrice {
  const { basePrice, adults, childAges } = input;
  const tourDays = input.tourDays ?? 1;

  const selectedStay = findStayOption(input.stay);
  const selectedMeal = findMealOption(input.meals);
  const selectedVehicle = findVehicleOption(input.vehicle);

  const packageRates =
    input.slug !== undefined ? packageVehicleRates[input.slug] : undefined;

  const dailyVehicleRates = input.isSpitiRoute
    ? spitiDailyVehicleRates
    : standardDailyVehicleRates;

  const vehicleUpgradePerDay =
    dailyVehicleRates[selectedVehicle.key] - dailyVehicleRates.sedan;

  const vehicleUpgradeTotal = packageRates ? 0 : vehicleUpgradePerDay * tourDays;

  const adultRate = packageRates
    ? (packageRates[selectedVehicle.key] ?? basePrice)
    : basePrice;

  const complimentaryChildren = childAges.filter(
    (age) => age < COMPLIMENTARY_CHILD_MAX_AGE
  );
  const paidChildren = childAges.filter(
    (age) => age >= COMPLIMENTARY_CHILD_MAX_AGE
  );

  const childRate = Math.round(adultRate * CHILD_RATE_SHARE);
  const childPrice = paidChildren.length * childRate;

  const extraAdultPrice = Math.max(0, adults - 1) * adultRate;

  const packageCost =
    adultRate +
    extraAdultPrice +
    childPrice +
    selectedStay.price +
    selectedMeal.price +
    vehicleUpgradeTotal;

  const gst = Math.round(packageCost * GST_RATE);

  return {
    packageCost,
    gst,
    estimatedTotal: packageCost + gst,
    hasVehicleRates: Boolean(packageRates),
    adultRate,
    extraAdultPrice,
    childRate,
    childPrice,
    paidChildren,
    complimentaryChildren,
    stayPrice: selectedStay.price,
    mealPrice: selectedMeal.price,
    vehicleUpgradePerDay,
    vehicleUpgradeTotal,
    tourDays,
  };
}
