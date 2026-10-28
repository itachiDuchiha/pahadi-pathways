import { readFile } from "node:fs/promises";

import { APIError, type CollectionBeforeOperationHook } from "payload";

import { compressImage, isCompressibleImage } from "@/lib/media/compress";
import { IMAGE_TOO_LARGE, MAX_IMAGE_BYTES, uploadSize } from "@/lib/media/limits";
import { QUALITY_BY_LEVEL, resolveMediaSettings, type MediaSettings } from "@/lib/media/settings";

type HookArgs = Parameters<CollectionBeforeOperationHook>[0];

/** The owner's settings; a failed read falls back to the defaults so the upload still works. */
async function readSettings(req: HookArgs["req"]): Promise<MediaSettings> {
  try {
    const settings = await req.payload.findGlobal({ slug: "site-settings", depth: 0, overrideAccess: true });
    return resolveMediaSettings(settings.media);
  } catch (error) {
    req.payload.logger.warn(`Upload compression: using the default settings (${String(error)})`);
    return resolveMediaSettings(undefined);
  }
}

/**
 * Before Payload stores an upload, replaces an image with a WebP that is
 * no wider than the site's maximum and encoded at the chosen quality, so
 * the original and every generated size come from the smaller file.
 */
export const compressUpload: CollectionBeforeOperationHook = async ({ args, operation, overrideAccess, req }) => {
  const file = req.file;
  if ((operation !== "create" && operation !== "update") || !file) return args;
  if (!isCompressibleImage(file.mimetype)) return args;
  // This hook runs before access control: do no work for a request that
  // will be refused (no signed-in user and no server-side override).
  if (!overrideAccess && !req.user) return args;
  // The HTTP limit is sized for videos; images keep their smaller one.
  if (uploadSize(file) > MAX_IMAGE_BYTES) throw new APIError(IMAGE_TOO_LARGE, 413);

  const { imageQuality, maxImageWidth } = await readSettings(req);

  let data: Buffer;
  try {
    const input = file.data.length === 0 && file.tempFilePath ? await readFile(file.tempFilePath) : file.data;
    ({ data } = await compressImage(input, { quality: QUALITY_BY_LEVEL[imageQuality], maxWidth: maxImageWidth }));
  } catch (error) {
    req.payload.logger.error({ err: error, msg: `Upload compression failed for ${file.name}` });
    // 400 makes the message public, so the editor sees it in the admin.
    throw new APIError("Could not process the image; upload a JPEG, PNG or WebP", 400);
  }

  req.file = {
    ...file,
    data,
    size: data.length,
    mimetype: "image/webp",
    name: `${file.name.replace(/\.[^.]+$/, "")}.webp`,
    tempFilePath: undefined,
  };
  return args;
};
