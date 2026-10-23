import type { CollectionConfig } from "payload";

import { isEditorOrAdmin } from "../access";
import { imageField } from "../fields/image";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("gallery");

export const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
  labels: { singular: "Gallery item", plural: "Gallery items" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "location", "size", "order"],
  },
  defaultSort: "order",
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
    { name: "title", type: "text", required: true },
    { name: "category", type: "text", required: true },
    { name: "location", type: "text", required: true },
    {
      name: "size",
      type: "select",
      required: true,
      defaultValue: "normal",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Large", value: "large" },
      ],
    },
    imageField("image", true),
    { name: "caption", type: "textarea" },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      index: true,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
