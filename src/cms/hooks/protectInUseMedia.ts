import { APIError, type CollectionBeforeDeleteHook, type CollectionSlug, type Payload, type PayloadRequest, type Where } from "payload";

/** Every place an image or video can be used, with the field that names the document. */
const USAGES = [
  { collection: "packages", title: "title", fields: ["image", "heroImage"], drafts: true },
  { collection: "destinations", title: "name", fields: ["image", "gallery"], drafts: true },
  { collection: "gallery-items", title: "title", fields: ["image", "video", "poster"], drafts: false },
  { collection: "experiences", title: "title", fields: ["image"], drafts: false },
] as const satisfies readonly {
  collection: CollectionSlug;
  title: string;
  fields: readonly string[];
  drafts: boolean;
}[];

const MAX_LISTED = 5;

export type MediaUsage = { collection: string; title: string };

function titleOf(doc: object, field: string): string {
  const value: unknown = Reflect.get(doc, field);
  return typeof value === "string" && value ? value : `#${String(Reflect.get(doc, "id"))}`;
}

/**
 * The documents that use a media item, counting both the published
 * documents and their latest drafts.
 */
export async function findMediaUsages(
  payload: Pick<Payload, "find">,
  id: number | string,
  req?: PayloadRequest
): Promise<MediaUsage[]> {
  const usages: MediaUsage[] = [];

  for (const usage of USAGES) {
    const where: Where = { or: usage.fields.map((field) => ({ [field]: { in: [id] } })) };
    const seen = new Set<string>();
    const passes = usage.drafts ? [false, true] : [false];

    for (const draft of passes) {
      const { docs } = await payload.find({
        collection: usage.collection,
        where,
        draft,
        depth: 0,
        limit: 0,
        pagination: false,
        overrideAccess: true,
        req,
      });

      for (const doc of docs) {
        const key = String(doc.id);
        if (seen.has(key)) continue;
        seen.add(key);
        usages.push({ collection: usage.collection, title: titleOf(doc, usage.title) });
      }
    }
  }

  return usages;
}

export function inUseMessage(usages: readonly MediaUsage[]): string {
  const listed = usages
    .slice(0, MAX_LISTED)
    .map((usage) => `${usage.collection} "${usage.title}"`)
    .join(", ");
  const more = usages.length > MAX_LISTED ? ` and ${usages.length - MAX_LISTED} more` : "";

  return `This image is still used by: ${listed}${more}`;
}

/** Refuses to delete an image that content still uses, so no page loses it. */
export const protectInUseMedia: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const usages = await findMediaUsages(req.payload, id, req);

  if (usages.length > 0) throw new APIError(inUseMessage(usages), 400, null, true);
};
