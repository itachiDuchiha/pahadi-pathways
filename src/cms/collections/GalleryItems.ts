import type { CollectionConfig, PayloadRequest, UploadField } from "payload";
import { upload } from "payload/shared";

import { isEditorOrAdmin } from "../access";
import { imageField, mimeTypeFilter } from "../fields/image";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("gallery");

type Kind = "image" | "video";
type MediaPrefix = "image/" | "video/";

function kindOf(data: unknown): Kind {
  return typeof data === "object" && data !== null && Reflect.get(data, "kind") === "video" ? "video" : "image";
}

function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || value === "";
}

/** Whether the chosen media document (an ID or a populated doc) has the given type. */
async function hasMimeType(value: unknown, prefix: MediaPrefix, req: PayloadRequest): Promise<boolean> {
  const id: unknown = typeof value === "object" && value !== null ? Reflect.get(value, "id") : value;
  if (typeof id !== "number" && typeof id !== "string") return false;

  const { docs } = await req.payload.find({
    collection: "media",
    where: { id: { equals: id } },
    depth: 0,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    req,
  });
  return docs[0]?.mimeType?.startsWith(prefix) ?? false;
}

/**
 * A media field the item needs only for one kind: required (and of the
 * right type) for that kind, hidden in the admin for the other.
 */
function mediaFor(name: string, kind: Kind, prefix: MediaPrefix, wrongType: string, description?: string): UploadField {
  return {
    name,
    type: "upload",
    relationTo: "media",
    filterOptions: mimeTypeFilter(prefix),
    admin: { condition: (_data, siblingData) => kindOf(siblingData) === kind, description },
    validate: async (value, options) => {
      if (kindOf(options.siblingData) === kind) {
        if (isEmpty(value)) return options.req.t("validation:required");
        if (!(await hasMimeType(value, prefix, options.req))) return wrongType;
      }
      return upload(value, options);
    },
  };
}

/** The photograph of an image item; a video item uses its poster instead. */
const imageOnly: UploadField = {
  ...imageField("image"),
  admin: { condition: (_data, siblingData) => kindOf(siblingData) === "image" },
  validate: async (value, options) => {
    if (kindOf(options.siblingData) === "image" && isEmpty(value)) return options.req.t("validation:required");
    return upload(value, options);
  },
};

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
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "image",
      options: [
        { label: "Image", value: "image" },
        { label: "Video", value: "video" },
      ],
      admin: { description: "A video appears in the video section, with its poster as the thumbnail." },
    },
    imageOnly,
    mediaFor("video", "video", "video/", "Choose an MP4 or WebM video.", "MP4 or WebM, up to 100 MB."),
    mediaFor("poster", "video", "image/", "Choose an image for the poster.", "Shown before the video plays."),
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
