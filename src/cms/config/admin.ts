import type { MetaConfig } from "payload";

import { site } from "@/config/site";

/**
 * Admin metadata. Payload joins the page title and the suffix with a space,
 * so the suffix carries no leading space of its own.
 */
export const adminMeta: MetaConfig = {
  titleSuffix: `· ${site.name}`,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    images: [{ url: "/opengraph-image" }],
  },
  defaultOGImageType: "off",
};

export const adminGraphics = {
  Logo: "/cms/admin/Logo#Logo",
  Icon: "/cms/admin/Icon#Icon",
};
