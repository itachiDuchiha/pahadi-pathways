import { getPayloadClient } from "./client";
import { mapDestination, mapPackage } from "./mappers";
import type { PreviewCollection } from "./preview-collections";
import type { Destination, Package } from "./types";

export { isPreviewCollection, type PreviewCollection } from "./preview-collections";

/**
 * The latest version (draft or published) of a package or destination,
 * for a signed-in CMS user only. Visitors, and requests with a missing or
 * forged admin cookie, get null, so drafts never reach them.
 */
export async function getPreviewDocument(
  collection: "packages",
  slug: string,
  headers: Headers
): Promise<Package | null>;
export async function getPreviewDocument(
  collection: "destinations",
  slug: string,
  headers: Headers
): Promise<Destination | null>;
export async function getPreviewDocument(
  collection: PreviewCollection,
  slug: string,
  headers: Headers
): Promise<Package | Destination | null>;
export async function getPreviewDocument(
  collection: PreviewCollection,
  slug: string,
  headers: Headers
): Promise<Package | Destination | null> {
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers });
  if (!user) return null;

  const query = {
    where: { slug: { equals: slug } },
    draft: true,
    overrideAccess: false,
    user,
    depth: 1,
    limit: 1,
    pagination: false,
  } as const;

  if (collection === "packages") {
    const { docs } = await payload.find({ collection, ...query });
    return docs[0] ? mapPackage(docs[0]) : null;
  }

  const { docs } = await payload.find({ collection, ...query });
  return docs[0] ? mapDestination(docs[0]) : null;
}
