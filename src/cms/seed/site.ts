import type { SiteSetting } from "@/cms/payload-types";
import { site } from "@/config/site";
import { DEFAULT_IMAGE_QUALITY, DEFAULT_MAX_IMAGE_WIDTH } from "@/lib/media/compress";

/** The `site-settings` global as seeded from `src/config/site.ts`. */
export type SiteSeed = Omit<SiteSetting, "id" | "updatedAt" | "createdAt" | "media">;

type MediaSeed = NonNullable<SiteSetting["media"]>;

export const siteSettings: SiteSeed = {
  phoneDisplay: site.phone.display,
  phoneE164: site.phone.e164,
  whatsapp: site.phone.whatsapp,
  email: site.email,
  instagram: site.social.instagram,
  facebook: site.social.facebook,
  tagline: site.tagline,
};

/**
 * The media settings are the owner's: the seed only fills a value that was
 * never set, even with `--overwrite`. `null` when both are set.
 */
export function siteMediaFill(current: SiteSetting["media"]): { media: MediaSeed } | null {
  if (current?.imageQuality && current.maxImageWidth != null) return null;

  return {
    media: {
      imageQuality: current?.imageQuality || DEFAULT_IMAGE_QUALITY,
      maxImageWidth: current?.maxImageWidth ?? DEFAULT_MAX_IMAGE_WIDTH,
    },
  };
}
