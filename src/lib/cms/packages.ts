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

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "packages",
    ...PUBLIC_READ,
    where: { slug: { equals: slug } },
    limit: 1,
  });

  return docs[0] ? mapPackage(docs[0]) : null;
}
