import type { CollectionConfig } from "payload";

import { deny, isAdmin, isEditorOrAdmin, serverOnly } from "../access";

/**
 * Leads from the trip, contact and package forms. Only the fields the
 * visitor typed and the server-computed price are kept: no IP address or
 * user agent. Documents are written by the enquiry handler through the
 * Local API (create is server-only), never edited, and pruned after the
 * retention window by `npm run cms:prune-enquiries`.
 */
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["createdAt", "source", "name", "phone"],
    group: "Leads",
  },
  access: {
    read: isEditorOrAdmin,
    create: serverOnly,
    update: deny,
    delete: isAdmin,
  },
  timestamps: true,
  defaultSort: "-createdAt",
  fields: [
    {
      name: "source",
      type: "select",
      required: true,
      index: true,
      options: [
        { label: "Trip planner", value: "trip" },
        { label: "Contact page", value: "contact" },
        { label: "Package booking", value: "package" },
      ],
    },
    { name: "name", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "email", type: "email" },
    { name: "message", type: "textarea" },
    { name: "travelDate", type: "date", admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "destination", type: "text", admin: { description: "Trip planner destination key." } },
    { name: "adults", type: "number" },
    { name: "children", type: "number" },
    { name: "budgetPerPerson", type: "number", admin: { description: "Rupees." } },
    { name: "package", type: "relationship", relationTo: "packages" },
    // Copied at enquiry time so the lead stays readable if the package is
    // later retired and the relationship is cleared.
    { name: "packageSlug", type: "text", admin: { readOnly: true } },
    { name: "packageTitle", type: "text", admin: { readOnly: true } },
    {
      name: "selections",
      type: "group",
      fields: [
        { name: "stay", type: "text" },
        { name: "meals", type: "text" },
        { name: "vehicle", type: "text" },
        {
          name: "childAges",
          type: "array",
          fields: [{ name: "age", type: "number", required: true }],
        },
      ],
    },
    {
      name: "computedPrice",
      type: "group",
      admin: { description: "Computed on the server from the published prices (rupees)." },
      fields: [
        { name: "packageCost", type: "number" },
        { name: "gst", type: "number" },
        { name: "gstPercent", type: "number" },
        { name: "estimatedTotal", type: "number" },
      ],
    },
  ],
};
