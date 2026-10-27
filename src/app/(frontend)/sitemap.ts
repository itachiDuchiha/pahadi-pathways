import type { MetadataRoute } from "next";

import { getDestinations } from "@/lib/cms/destinations";
import { getPackages } from "@/lib/cms/packages";
import { absoluteUrl } from "@/lib/seo";

// Evaluated once, so every entry carries the build time.
const lastModified = new Date();

const staticRoutes = [
  "/packages",
  "/destinations",
  "/experiences",
  "/gallery",
  "/reviews",
  "/contact",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, destinations] = await Promise.all([getPackages(), getDestinations()]);

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...packages.map((pkg) => ({
      url: absoluteUrl(`/packages/${pkg.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...destinations.map((destination) => ({
      url: absoluteUrl(`/destinations/${destination.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
