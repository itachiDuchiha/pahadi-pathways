import type { CollectionConfig } from "payload";

import { isEditorOrAdmin } from "../access";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("testimonial");

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "city", "tour", "rating"],
  },
  access: {
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "city", type: "text", required: true },
    { name: "tour", type: "text", required: true },
    { name: "review", type: "textarea", required: true },
    { name: "rating", type: "number", required: true, min: 1, max: 5 },
  ],
};
