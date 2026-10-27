import { cache } from "react";

import type { Package as PackageDoc } from "@/cms/payload-types";

import { getPayloadClient } from "./client";
import { mapPackage } from "./mappers";
import { PUBLIC_READ } from "./query";
import type { Package } from "./types";

/** Published packages: popular first, then in the order they were added. */
export async function getPackages(): Promise<Package[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "packages",
    ...PUBLIC_READ,
    sort: ["-popular", "id"],
  });

  return docs.map(mapPackage);
}

/**
 * Request-scoped (React `cache`), so `generateMetadata` and the page
 * share one read per slug.
 */
const findPublishedPackage = cache(async (slug: string): Promise<PackageDoc | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "packages",
    ...PUBLIC_READ,
    where: { slug: { equals: slug } },
    limit: 1,
  });

  return docs[0] ?? null;
});

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const doc = await findPublishedPackage(slug);
  return doc ? mapPackage(doc) : null;
}

/** A published package plus its CMS id, so a stored lead can link to it. */
export async function getPackageForEnquiry(
  slug: string
): Promise<{ id: PackageDoc["id"]; pkg: Package } | null> {
  const doc = await findPublishedPackage(slug);
  return doc ? { id: doc.id, pkg: mapPackage(doc) } : null;
}
