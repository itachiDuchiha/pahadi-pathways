// Kept free of the Payload client, so the CMS config can import it too.

/** The collections with drafts that editors can preview on the site. */
export const PREVIEW_COLLECTIONS = ["packages", "destinations"] as const;

export type PreviewCollection = (typeof PREVIEW_COLLECTIONS)[number];

export function isPreviewCollection(value: string): value is PreviewCollection {
  return PREVIEW_COLLECTIONS.some((collection) => collection === value);
}

/** The site path that renders the latest draft of a document. */
export function previewPath(collection: PreviewCollection, slug: string): string {
  return `/preview/${collection}/${encodeURIComponent(slug)}`;
}
