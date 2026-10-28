import type { CollectionConfig } from "payload";

import { EXPERIENCE_ICONS } from "@/lib/cms/types";

import { isEditorOrAdmin } from "../access";
import { imageField } from "../fields/image";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("experience");

export const Experiences: CollectionConfig = {
  slug: "experiences",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "icon", "order"],
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
    { name: "description", type: "textarea", required: true },
    imageField("image", true),
    {
      name: "icon",
      type: "select",
      required: true,
      options: EXPERIENCE_ICONS.map((value) => ({ label: value, value })),
    },
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
