import type { MetadataRoute } from "next";

import { allDestinations } from "@/data/destinations";
import { packages } from "@/data/packages";
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
];

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...allDestinations.map((destination) => ({
      url: absoluteUrl(`/destinations/${destination.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
