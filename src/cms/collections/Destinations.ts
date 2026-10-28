import type { CollectionConfig } from "payload";

import { DESTINATION_CATEGORIES } from "@/lib/cms/types";

import { isEditorOrAdmin, publishedOnly } from "../access";
import { imageField, mimeTypeFilter } from "../fields/image";
import { slugField } from "../fields/slug";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("destination");

export const Destinations: CollectionConfig = {
  slug: "destinations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "category", "layout", "_status"],
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
    { name: "name", type: "text", required: true },
    { name: "subtitle", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "fullDescription", type: "textarea", required: true },
    imageField("image", true),
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      filterOptions: mimeTypeFilter("image/"),
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: DESTINATION_CATEGORIES.map((value) => ({ label: value, value })),
    },
    {
      name: "layout",
      type: "select",
      defaultValue: "shared",
      options: [
        { label: "Dedicated page", value: "dedicated" },
        { label: "Shared template", value: "shared" },
      ],
      admin: {
        position: "sidebar",
        description: "Dedicated uses a hand-built page in code for this slug.",
      },
    },
  ],
};
