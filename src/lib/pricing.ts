import type {
  Package,
  PackagePricing,
  PricingOption,
  PricingTables,
  VehiclePriceOption,
} from "@/lib/cms/types";

/*
  Pricing arithmetic only. The option tables, GST and child rule come
  from the `pricing-settings` global and each package's rates from its
  `pricing` group, so editors change prices without a deploy. Stay and
  meal options are priced per booking per night; a package's own lists
  replace the site-wide ones. The booking panel and the package enquiry
  route call the same functions, so the server recomputes exactly what
  the visitor sees.
*/

export type { PricingOption, VehicleKey } from "@/lib/cms/types";

/* =========================================================
   HELPERS
========================================================= */

export function formatCurrency(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function parsePackagePrice(price: string): number {
  return Number(String(price).replace(/[^\d.]/g, "")) || 0;
}

export function findStayOption(label: string, tables: PricingTables): PricingOption {
  return tables.stayOptions.find((option) => option.label === label) ?? tables.stayOptions[0];
}

export function findMealOption(label: string, tables: PricingTables): PricingOption {
  return tables.mealOptions.find((option) => option.label === label) ?? tables.mealOptions[0];
}

export function findVehicleOption(label: string, tables: PricingTables): VehiclePriceOption {
  return tables.vehicleOptions.find((option) => option.label === label) ?? tables.vehicleOptions[0];
}

/**
 * The tables a package is priced with. A package's non-empty stay or meal
 * list replaces the site-wide list wholesale (never merged label by label);
 * vehicles, GST and the child rule always come from the site-wide tables.
 */
export function effectivePricingTables(
  pkg: Pick<Package, "pricing">,
  globals: PricingTables
): PricingTables {
  const { stayOptions, mealOptions } = pkg.pricing;

  return {
    ...globals,
    stayOptions: stayOptions?.length ? stayOptions : globals.stayOptions,
    mealOptions: mealOptions?.length ? mealOptions : globals.mealOptions,
  };
}

/**
 * Nights of a package: the `N` count in its duration ("9N / 10D"), else
 * one less than its days, and never fewer than one.
 */
export function packageNights(duration: string, tourDays: number): number {
  const nights = Number(duration.match(/(\d+)\s*N/i)?.[1]) || tourDays - 1;
  return Math.max(1, nights);
}

/** The package inputs to `computePackagePrice`. */
export type PricedPackage = Pick<PackagePricing, "basePricePerAdult" | "vehicleRates"> & {
  slug: string;
  /** Used for the per-day vehicle upgrade on packages without vehicle rates. */
  tourDays: number;
  /** Multiplies the per-night stay and meal deltas. */
  nights: number;
  /** Selects the Spiti per-day upgrade. */
  isSpitiRoute: boolean;
};

/**
 * Package-specific inputs to `computePackagePrice`, derived from the
 * package record so the booking panel and the server price identically.
 */
export function packagePricingContext(
  pkg: Pick<Package, "slug" | "title" | "duration" | "itineraryDays" | "pricing">
): PricedPackage {
  const { basePricePerAdult, vehicleRates } = pkg.pricing;
  const tourDays =
    Number(pkg.duration.match(/(\d+)\s*D/i)?.[1]) ||
    pkg.itineraryDays?.length ||
    1;

  return {
    basePricePerAdult,
    ...(vehicleRates && { vehicleRates }),
    slug: pkg.slug,
    tourDays,
    nights: packageNights(pkg.duration, tourDays),
    isSpitiRoute: /spiti|kaza|tabo|kunzum|chandratal/i.test(
      pkg.title + " " + pkg.slug
    ),
  };
}

export type PackagePriceInput = {
  package: PricedPackage;
  stay: string;
  meals: string;
  vehicle: string;
  adults: number;
  childAges: number[];
};

export type PackagePrice = {
  packageCost: number;
  gst: number;
  estimatedTotal: number;
  /** GST rate applied, in percent. */
  gstPercent: number;
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

   The base price is the price per adult. The first adult is
   included as the base package price; each additional adult
   is charged at the adult rate.

   Children younger than `childFreeUnderAge` are complimentary
   with no extra bed; older children pay `childPercentOfAdult`
   of the adult rate.
========================================================= */

export function computePackagePrice(
  input: PackagePriceInput,
  tables: PricingTables
): PackagePrice {
  const { adults, childAges } = input;
  const { basePricePerAdult, vehicleRates, tourDays, nights, isSpitiRoute } = input.package;

  const selectedStay = findStayOption(input.stay, tables);
  const selectedMeal = findMealOption(input.meals, tables);
  const selectedVehicle = findVehicleOption(input.vehicle, tables);

  const vehicleUpgradePerDay = isSpitiRoute
    ? (selectedVehicle.perDayUpgradeSpiti ?? selectedVehicle.perDayUpgrade)
    : selectedVehicle.perDayUpgrade;

  const vehicleUpgradeTotal = vehicleRates ? 0 : vehicleUpgradePerDay * tourDays;

  const adultRate = vehicleRates
    ? (vehicleRates[selectedVehicle.key] ?? basePricePerAdult)
    : basePricePerAdult;

  const complimentaryChildren = childAges.filter(
    (age) => age < tables.childFreeUnderAge
  );
  const paidChildren = childAges.filter(
    (age) => age >= tables.childFreeUnderAge
  );

  const childRate = Math.round(adultRate * (tables.childPercentOfAdult / 100));
  const childPrice = paidChildren.length * childRate;

  const extraAdultPrice = Math.max(0, adults - 1) * adultRate;

  // Per adult per night, rounded once to the rupee over the whole stay.
  const stayPrice = Math.round(selectedStay.deltaPerNight * nights);
  const mealPrice = Math.round(selectedMeal.deltaPerNight * nights);

  const packageCost =
    adultRate +
    extraAdultPrice +
    childPrice +
    stayPrice +
    mealPrice +
    vehicleUpgradeTotal;

  const gst = Math.round(packageCost * (tables.gstPercent / 100));

  return {
    packageCost,
    gst,
    estimatedTotal: packageCost + gst,
    gstPercent: tables.gstPercent,
    hasVehicleRates: Boolean(vehicleRates),
    adultRate,
    extraAdultPrice,
    childRate,
    childPrice,
    paidChildren,
    complimentaryChildren,
    stayPrice,
    mealPrice,
    vehicleUpgradePerDay,
    vehicleUpgradeTotal,
    tourDays,
  };
}
