import type { CollectionConfig } from "payload";

import { isEditorOrAdmin } from "../access";
import { compressUpload } from "../hooks/compressUpload";
import { protectInUseMedia } from "../hooks/protectInUseMedia";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("media");

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  hooks: {
    // Compresses an uploaded image before Payload stores it and makes the sizes.
    beforeOperation: [compressUpload],
    beforeDelete: [protectInUseMedia],
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
  },
  upload: {
    staticDir: process.env.MEDIA_DIR ?? "media",
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    imageSizes: [
      { name: "card", width: 800, formatOptions: { format: "webp", options: { quality: 80 } } },
      { name: "hero", width: 1920, formatOptions: { format: "webp", options: { quality: 80 } } },
      {
        name: "og",
        width: 1200,
        height: 630,
        position: "centre",
        formatOptions: { format: "webp", options: { quality: 80 } },
      },
    ],
    adminThumbnail: "card",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
