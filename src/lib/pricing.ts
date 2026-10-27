import type {
  Package,
  PackagePricing,
  PriceOption,
  PricingTables,
  VehiclePriceOption,
} from "@/lib/cms/types";

/*
  Pricing arithmetic only. The option tables, GST and child rule come
  from the `pricing-settings` global and each package's rates from its
  `pricing` group, so editors change prices without a deploy. The
  booking panel and the package enquiry route call the same function,
  so the server recomputes exactly what the visitor sees.
*/

export type { VehicleKey } from "@/lib/cms/types";

/* =========================================================
   HELPERS
========================================================= */

export function formatCurrency(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function parsePackagePrice(price: string): number {
  return Number(String(price).replace(/[^\d.]/g, "")) || 0;
}

export function findStayOption(label: string, tables: PricingTables): PriceOption {
  return tables.stayOptions.find((option) => option.label === label) ?? tables.stayOptions[0];
}

export function findMealOption(label: string, tables: PricingTables): PriceOption {
  return tables.mealOptions.find((option) => option.label === label) ?? tables.mealOptions[0];
}

export function findVehicleOption(label: string, tables: PricingTables): VehiclePriceOption {
  return tables.vehicleOptions.find((option) => option.label === label) ?? tables.vehicleOptions[0];
}

/** The package inputs to `computePackagePrice`. */
export type PricedPackage = PackagePricing & {
  slug: string;
  /** Used for the per-day vehicle upgrade on packages without vehicle rates. */
  tourDays: number;
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
  return {
    ...pkg.pricing,
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
  const { basePricePerAdult, vehicleRates, tourDays, isSpitiRoute } = input.package;

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

  const packageCost =
    adultRate +
    extraAdultPrice +
    childPrice +
    selectedStay.delta +
    selectedMeal.delta +
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
    stayPrice: selectedStay.delta,
    mealPrice: selectedMeal.delta,
    vehicleUpgradePerDay,
    vehicleUpgradeTotal,
    tourDays,
  };
}
