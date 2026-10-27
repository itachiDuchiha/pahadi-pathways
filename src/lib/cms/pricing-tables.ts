import type { PricingSetting } from "@/cms/payload-types";

import { getPayloadClient } from "./client";
import type { PriceOption, PricingTables, VehiclePriceOption } from "./types";

function required<T>(rows: T[] | null | undefined, what: string): T[] {
  if (rows?.length) return rows;

  throw new Error(`Pricing settings have no ${what}. Run \`npm run cms:seed\` or add them in the admin.`);
}

function priceOptions(rows: PriceOption[] | null | undefined, what: string): PriceOption[] {
  return required(rows, what).map(({ label, delta }) => ({ label, delta }));
}

/** The `pricing-settings` global as the tables `computePackagePrice` needs. */
export function mapPricingTables(doc: PricingSetting): PricingTables {
  return {
    stayOptions: priceOptions(doc.stayOptions, "stay options"),
    mealOptions: priceOptions(doc.mealOptions, "meal options"),
    vehicleOptions: required(doc.vehicleOptions, "vehicle options").map(
      ({ label, key, perDayUpgrade, perDayUpgradeSpiti }): VehiclePriceOption =>
        perDayUpgradeSpiti == null
          ? { label, key, perDayUpgrade }
          : { label, key, perDayUpgrade, perDayUpgradeSpiti }
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
