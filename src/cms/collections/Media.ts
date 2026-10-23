import type { CollectionConfig } from "payload";

import { isEditorOrAdmin } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  upload: {
    staticDir: process.env.MEDIA_DIR ?? "media",
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    imageSizes: [
      { name: "card", width: 800 },
      { name: "hero", width: 1920 },
      { name: "og", width: 1200, height: 630, position: "centre" },
    ],
    adminThumbnail: "card",
    formatOptions: { format: "webp" },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
