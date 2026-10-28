import { readFile } from "node:fs/promises";

import { APIError, type CollectionBeforeOperationHook } from "payload";

import { compressImage, isCompressibleImage, QUALITY_BY_LEVEL, resolveMediaSettings } from "@/lib/media/compress";

/**
 * Before Payload stores an upload, replaces an image with a WebP that is
 * no wider than the site's maximum and encoded at the chosen quality, so
 * the original and every generated size come from the smaller file.
 */
export const compressUpload: CollectionBeforeOperationHook = async ({ args, operation, req }) => {
  const file = req.file;
  if ((operation !== "create" && operation !== "update") || !file) return args;
  if (!isCompressibleImage(file.mimetype)) return args;

  const settings = await req.payload.findGlobal({ slug: "site-settings", depth: 0, overrideAccess: true });
  const { imageQuality, maxImageWidth } = resolveMediaSettings(settings.media);

  let data: Buffer;
  try {
    const input = file.data.length === 0 && file.tempFilePath ? await readFile(file.tempFilePath) : file.data;
    ({ data } = await compressImage(input, { quality: QUALITY_BY_LEVEL[imageQuality], maxWidth: maxImageWidth }));
  } catch {
    // 400 makes the message public, so the editor sees it in the admin.
    throw new APIError("Could not process the image; upload a JPEG, PNG or WebP", 400);
  }

  req.file = {
    ...file,
    data,
    size: data.length,
    mimetype: "image/webp",
    name: file.name.replace(/\.[^.]+$/, ".webp"),
    tempFilePath: undefined,
  };
  return args;
};
