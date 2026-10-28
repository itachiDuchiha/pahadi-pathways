import type { RootLivePreviewConfig, SanitizedCollectionConfig } from "payload";

import { site } from "@/config/site";
import { isPreviewCollection, PREVIEW_COLLECTIONS, previewPath } from "@/lib/cms/preview-collections";

type UrlArgs = {
  data: Record<string, unknown>;
  collectionConfig?: Pick<SanitizedCollectionConfig, "slug">;
};

/**
 * The page the admin's live preview frames: the site's preview route for
 * the document being edited, or none until the document has a slug.
 */
export function livePreviewUrl({ data, collectionConfig }: UrlArgs): string | null {
  const collection = collectionConfig?.slug;
  const slug = data.slug;
  if (!collection || !isPreviewCollection(collection)) return null;
  if (typeof slug !== "string" || slug === "") return null;

  return `${site.url}${previewPath(collection, slug)}`;
}

export const livePreview = {
  url: livePreviewUrl,
  collections: [...PREVIEW_COLLECTIONS],
  breakpoints: [
    { label: "Mobile", name: "mobile", width: 375, height: 812 },
    { label: "Tablet", name: "tablet", width: 768, height: 1024 },
    { label: "Desktop", name: "desktop", width: 1440, height: 900 },
  ],
} satisfies RootLivePreviewConfig;
