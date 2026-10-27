import type { SiteSetting } from "@/cms/payload-types";
import { site } from "@/config/site";

/** The `site-settings` global as seeded from `src/config/site.ts`. */
export type SiteSeed = Omit<SiteSetting, "id" | "updatedAt" | "createdAt">;

export const siteSettings: SiteSeed = {
  phoneDisplay: site.phone.display,
  phoneE164: site.phone.e164,
  whatsapp: site.phone.whatsapp,
  email: site.email,
  instagram: site.social.instagram,
  facebook: site.social.facebook,
  tagline: site.tagline,
};
