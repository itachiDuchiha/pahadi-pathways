import type { GlobalConfig } from "payload";

import { isEditorOrAdmin } from "../access";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("pricing");

/** Each vehicle key may be configured once; pricing looks options up by key. */
export function validateUniqueVehicleKeys(value: unknown): true | string {
  if (!Array.isArray(value)) return true;

  const seen = new Set<unknown>();
  for (const row of value) {
    const key: unknown = typeof row === "object" && row !== null ? Reflect.get(row, "key") : undefined;
    if (key === undefined || key === null) continue;
    if (seen.has(key)) return `Each vehicle can be listed once; "${String(key)}" appears more than once.`;
    seen.add(key);
  }

  return true;
}

export const PricingSettings: GlobalConfig = {
  slug: "pricing-settings",
  label: "Pricing settings",
  access: {
    read: () => true,
    update: isEditorOrAdmin,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
  },
  fields: [
    {
      name: "stayOptions",
      type: "array",
      admin: { description: "Hotel tiers. Delta is rupees per adult added to the base rate." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "delta", type: "number", required: true },
      ],
    },
    {
      name: "mealOptions",
      type: "array",
      admin: { description: "Meal plans. Delta is rupees per adult; negative lowers the price." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "delta", type: "number", required: true },
      ],
    },
    {
      name: "vehicleOptions",
      type: "array",
      validate: (value: unknown) => validateUniqueVehicleKeys(value),
      admin: { description: "Vehicles offered. Per-day upgrade applies when a package has no vehicle rate." },
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "key",
          type: "select",
          required: true,
          options: [
            { label: "Sedan", value: "sedan" },
            { label: "Ertiga", value: "ertiga" },
            { label: "Crysta", value: "crysta" },
          ],
        },
        { name: "perDayUpgrade", type: "number", required: true, defaultValue: 0, min: 0 },
        {
          name: "perDayUpgradeSpiti",
          type: "number",
          min: 0,
          admin: { description: "Per-day upgrade on Spiti routes, if it differs." },
        },
      ],
    },
    { name: "gstPercent", type: "number", required: true, defaultValue: 5, min: 0, max: 100 },
    {
      name: "childFreeUnderAge",
      type: "number",
      required: true,
      defaultValue: 5,
      min: 0,
      admin: { description: "Children younger than this travel free." },
    },
    {
      name: "childPercentOfAdult",
      type: "number",
      required: true,
      defaultValue: 25,
      min: 0,
      max: 100,
      admin: { description: "Paying children are charged this percentage of the adult rate." },
    },
  ],
};
