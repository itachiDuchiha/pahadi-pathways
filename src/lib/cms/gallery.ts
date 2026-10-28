import { getPayloadClient } from "./client";
import { mapGalleryItem } from "./mappers";
import { PUBLIC_READ } from "./query";
import type { GalleryItem } from "./types";

/** Gallery photographs and videos in their editorial order. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "gallery-items", ...PUBLIC_READ, sort: ["order", "id"] });

  return docs.flatMap((doc) => mapGalleryItem(doc) ?? []);
}
