import type { PricingSetting } from "@/cms/payload-types";

import { effectivePricingTables } from "@/lib/pricing";

import { getPayloadClient } from "./client";
import { mapPricingOptions } from "./mappers";
import type { Package, PricingOption, PricingTables, VehiclePriceOption } from "./types";

function required<T>(rows: T[] | null | undefined, what: string): T[] {
  if (rows?.length) return rows;

  throw new Error(`Pricing settings have no ${what}. Run \`npm run cms:seed\` or add them in the admin.`);
}

function pricingOptions(rows: PricingOption[] | null | undefined, what: string): PricingOption[] {
  return mapPricingOptions(required(rows, what));
}

/**
 * The `pricing-settings` global as the site-wide tables. A package's own
 * stay and meal lists replace these through `effectivePricingTables`.
 * Labels are trimmed, as the enquiry schema trims the submitted ones, so a
 * stray space typed in the admin cannot make every enquiry fail.
 */
export function mapPricingTables(doc: PricingSetting): PricingTables {
  return {
    stayOptions: pricingOptions(doc.stayOptions, "stay options"),
    mealOptions: pricingOptions(doc.mealOptions, "meal options"),
    vehicleOptions: required(doc.vehicleOptions, "vehicle options").map(
      ({ label, key, perDayUpgrade, perDayUpgradeSpiti }): VehiclePriceOption =>
        perDayUpgradeSpiti == null
          ? { label: label.trim(), key, perDayUpgrade }
          : { label: label.trim(), key, perDayUpgrade, perDayUpgradeSpiti }
    ),
    gstPercent: doc.gstPercent,
    childFreeUnderAge: doc.childFreeUnderAge,
    childPercentOfAdult: doc.childPercentOfAdult,
  };
}

export async function getPricingTables(): Promise<PricingTables> {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({
    slug: "pricing-settings",
    draft: false,
    overrideAccess: false,
    depth: 1,
  });

  return mapPricingTables(doc);
}

/** The tables a package is priced with: its own stay and meal lists over the site-wide ones. */
export async function getPackagePricingTables(pkg: Pick<Package, "pricing">): Promise<PricingTables> {
  return effectivePricingTables(pkg, await getPricingTables());
}
