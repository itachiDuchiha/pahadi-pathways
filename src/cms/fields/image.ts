import type { UploadField, Where } from "payload";

/** Media of one kind; also checked when a document is saved. */
export function mimeTypeFilter(prefix: "image/" | "video/"): Where {
  return { mimeType: { like: prefix } };
}

/** A single image from the Media collection (videos are not offered). */
export function imageField(name: string, required = false): UploadField {
  return {
    name,
    type: "upload",
    relationTo: "media",
    required,
    filterOptions: mimeTypeFilter("image/"),
  };
}
