import type { Metadata } from "next";

import { site } from "@/config/site";

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
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      url,
      title,
      description,
      ...(image ? { images: [{ url: absoluteUrl(image) }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
