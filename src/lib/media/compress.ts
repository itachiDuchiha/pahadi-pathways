import sharp from "sharp";

export { QUALITY_BY_LEVEL, type ImageQualityLevel } from "./settings";

const COMPRESSIBLE = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

/** Whether an upload of this type is re-encoded (JPEG, PNG, WebP or AVIF). */
export function isCompressibleImage(mimetype: string): boolean {
  return COMPRESSIBLE.has(mimetype);
}

/**
 * Turns the image upright (EXIF orientation), narrows it to `maxWidth`
 * without ever enlarging it, and re-encodes it as WebP at `quality`.
 */
export async function compressImage(
  input: Buffer,
  opts: { quality: number; maxWidth: number }
): Promise<{ data: Buffer; width: number; height: number }> {
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: opts.maxWidth, withoutEnlargement: true })
    .webp({ quality: opts.quality })
    .toBuffer({ resolveWithObject: true });

  return { data, width: info.width, height: info.height };
}
