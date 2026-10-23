import type { GlobalConfig } from "payload";

import { isEditorOrAdmin } from "../access";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("pricing");

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
