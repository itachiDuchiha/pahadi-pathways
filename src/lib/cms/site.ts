import { cache } from "react";

import type { SiteSetting } from "@/cms/payload-types";
import { site } from "@/config/site";
import { resolveMediaSettings } from "@/lib/media/compress";

import { getPayloadClient } from "./client";
import type { Site } from "./types";

function pick(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/** Lays the editable values of the `site-settings` global over the code fallbacks. */
export function mergeSiteSettings(doc: SiteSetting): Site {
  return {
    name: site.name,
    tagline: pick(doc.tagline, site.tagline),
    url: site.url,
    phone: {
      display: pick(doc.phoneDisplay, site.phone.display),
      e164: pick(doc.phoneE164, site.phone.e164),
      whatsapp: pick(doc.whatsapp, site.phone.whatsapp),
    },
    email: pick(doc.email, site.email),
    social: {
      instagram: pick(doc.instagram, site.social.instagram),
      facebook: pick(doc.facebook, site.social.facebook),
    },
    address: { region: site.address.region, country: site.address.country },
    media: resolveMediaSettings(doc.media),
  };
}

/**
 * Request-scoped (React `cache`): the layout, its metadata and the page
 * each ask for the settings, and they share one read.
 */
export const getSiteSettings = cache(async (): Promise<Site> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({
    slug: "site-settings",
    draft: false,
    overrideAccess: false,
    depth: 1,
  });

  return mergeSiteSettings(doc);
});
