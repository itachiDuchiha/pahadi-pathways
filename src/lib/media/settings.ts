import { site } from "@/config/site";

/** WebP quality for each level the owner can pick in the site settings. */
export const QUALITY_BY_LEVEL = { small: 65, balanced: 80, sharp: 90 } as const;
export type ImageQualityLevel = keyof typeof QUALITY_BY_LEVEL;

export const DEFAULT_IMAGE_QUALITY: ImageQualityLevel = site.media.imageQuality;
export const DEFAULT_MAX_IMAGE_WIDTH: number = site.media.maxImageWidth;
export const MIN_IMAGE_WIDTH = 1200;
export const MAX_IMAGE_WIDTH = 4000;

export type MediaSettings = { imageQuality: ImageQualityLevel; maxImageWidth: number };

function isQualityLevel(value: unknown): value is ImageQualityLevel {
  return typeof value === "string" && Object.hasOwn(QUALITY_BY_LEVEL, value);
}

/**
 * The `media` group of the site settings with its defaults: an unknown or
 * missing level is `balanced`, a missing width is 2400 and any width is
 * kept within 1200–4000 px. Free of sharp, so read paths can import it.
 */
export function resolveMediaSettings(
  media: { imageQuality?: string | null; maxImageWidth?: number | null } | null | undefined
): MediaSettings {
  const width = media?.maxImageWidth;
  return {
    imageQuality: isQualityLevel(media?.imageQuality) ? media.imageQuality : DEFAULT_IMAGE_QUALITY,
    maxImageWidth:
      typeof width === "number" && Number.isFinite(width)
        ? Math.min(MAX_IMAGE_WIDTH, Math.max(MIN_IMAGE_WIDTH, Math.round(width)))
        : DEFAULT_MAX_IMAGE_WIDTH,
  };
}
