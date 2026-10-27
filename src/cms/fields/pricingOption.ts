import type { Field } from "payload";

/**
 * The row of a stay or meal option list: a label the visitor picks and the
 * rupees per booking per night it adds, once regardless of the number of
 * adults (negative lowers the price). The quote multiplies it by the
 * package's nights.
 */
export const pricingOptionFields: Field[] = [
  { name: "label", type: "text", required: true },
  {
    name: "deltaPerNight",
    label: "Delta per night",
    type: "number",
    required: true,
    admin: { description: "Rupees per booking per night (added once, regardless of the number of adults); decimals are allowed." },
  },
];
