import type { UploadField } from "payload";

/** A single image from the Media collection. */
export function imageField(name: string, required = false): UploadField {
  return {
    name,
    type: "upload",
    relationTo: "media",
    required,
  };
}
