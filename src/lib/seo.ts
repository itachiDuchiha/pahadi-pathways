import type { Metadata } from "next";

import { site } from "@/config/site";

/** The parts of the site settings that metadata reads. */
export type Brand = { name: string; tagline: string };

export function defaultTitle(brand: Brand): string {
  return `${brand.name} | ${brand.tagline}`;
}

export const defaultDescription =
  "Handcrafted Himachal Pradesh tours, custom itineraries and trusted local hosts for Shimla, Manali, Spiti and beyond.";

export const ogImageSize = { width: 1200, height: 630 };

export function ogImageAlt(brand: Brand): string {
  return defaultTitle(brand);
}

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${site.url}${normalizedPath}`;
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) {
    return text;
  }

  const sliced = text.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;

  return `${cut}…`;
}

type PageMetadataInput = {
  // Omit to inherit the root layout's default title.
  title?: string;
  description: string;
  path: string;
  image?: string;
};

/** `brand` is the site settings, so an edited tagline reaches every page. */
export function pageMetadata(
  { title, description, path, image }: PageMetadataInput,
  brand: Brand
): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = title ?? defaultTitle(brand);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: "en_IN",
      url,
      title: socialTitle,
      description,
      // A page-level openGraph replaces the root one, so pages without their
      // own image would otherwise lose the default generated image.
      images: image
        ? [{ url: absoluteUrl(image) }]
        : [
            {
              url: absoluteUrl("/opengraph-image"),
              ...ogImageSize,
              alt: ogImageAlt(brand),
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
