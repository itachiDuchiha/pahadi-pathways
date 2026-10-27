import type { CollectionConfig } from "payload";

import { isEditorOrAdmin, publishedOnly } from "../access";
import { imageField } from "../fields/image";
import { slugField } from "../fields/slug";
import { stringList } from "../fields/stringList";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("package");

export const Packages: CollectionConfig = {
  slug: "packages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "duration", "_status"],
  },
  versions: { drafts: true },
  access: {
    read: publishedOnly,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
    readVersions: isEditorOrAdmin,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
  },
  fields: [
    slugField(),
    { name: "title", type: "text", required: true },
    imageField("image", true),
    imageField("heroImage"),
    { name: "duration", type: "text", required: true, admin: { description: "For example 9N / 10D" } },
    { name: "rating", type: "number", required: true, min: 0, max: 5 },
    { name: "pickup", type: "text", required: true },
    { name: "popular", type: "checkbox", defaultValue: false },
    {
      name: "pricing",
      type: "group",
      fields: [
        {
          name: "basePricePerAdult",
          type: "number",
          required: true,
          min: 0,
          admin: {
            description:
              "Rupees per adult before upgrades and GST. Shown on cards as the starting price, and used as the Sedan rate unless a Sedan vehicle rate is set below.",
          },
        },
        {
          name: "vehicleRates",
          type: "group",
          admin: {
            description:
              "Per-adult rate for each vehicle. Leave a vehicle empty to use the base price (Sedan is normally left empty). Ertiga and Crysta rates are absolute, not deltas.",
          },
          fields: [
            { name: "sedan", type: "number", min: 0 },
            { name: "ertiga", type: "number", min: 0 },
            { name: "crysta", type: "number", min: 0 },
          ],
        },
      ],
    },
    { name: "summary", type: "textarea" },
    { name: "overview", type: "textarea" },
    stringList("itinerary", { required: true }),
    stringList("hiddenItinerary"),
    stringList("includes", { required: true }),
    stringList("exclusions"),
    stringList("stayPlan"),
    stringList("highlights"),
    stringList("idealFor"),
    { name: "travelNote", type: "textarea" },
    { name: "bestTime", type: "text" },
    { name: "vehicle", type: "text" },
    { name: "tourType", type: "text" },
    { name: "maxAltitude", type: "text" },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      name: "itineraryDays",
      type: "array",
      fields: [
        { name: "day", type: "number", required: true, min: 1 },
        { name: "title", type: "text", required: true },
        { name: "start", type: "text" },
        { name: "end", type: "text" },
        { name: "stay", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        stringList("places"),
        {
          name: "details",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
          ],
        },
      ],
    },
  ],
};
