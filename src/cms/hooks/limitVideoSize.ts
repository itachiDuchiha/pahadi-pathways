import { APIError, type CollectionBeforeValidateHook } from "payload";

import { MAX_VIDEO_BYTES, uploadSize, VIDEO_TOO_LARGE } from "@/lib/media/limits";

/** Refuses a video upload over 100 MB; 413 makes the message public, so the editor sees it. */
export const limitVideoSize: CollectionBeforeValidateHook = async ({ data, req }) => {
  const file = req.file;
  if (file?.mimetype.startsWith("video/") && uploadSize(file) > MAX_VIDEO_BYTES) {
    throw new APIError(VIDEO_TOO_LARGE, 413);
  }
  return data;
};
