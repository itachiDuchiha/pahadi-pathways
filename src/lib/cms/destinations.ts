import { getPayloadClient } from "./client";
import { mapDestination } from "./mappers";
import { PUBLIC_READ } from "./query";
import { DESTINATION_CATEGORIES, type Destination } from "./types";

function categoryRank(category: string): number {
  const index = DESTINATION_CATEGORIES.findIndex((item) => item === category);
  return index === -1 ? DESTINATION_CATEGORIES.length : index;
}

/** Published destinations grouped by category order, then in the order they were added. */
export async function getDestinations(): Promise<Destination[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "destinations",
    ...PUBLIC_READ,
    sort: "id",
  });

  // Array.prototype.sort is stable, so the id order holds within a category.
  return docs.map(mapDestination).sort((a, b) => categoryRank(a.category) - categoryRank(b.category));
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "destinations",
    ...PUBLIC_READ,
    where: { slug: { equals: slug } },
    limit: 1,
  });

  return docs[0] ? mapDestination(docs[0]) : null;
}

export function destinationsInCategory(
  destinations: readonly Destination[],
  category: string
): Destination[] {
  return destinations.filter((destination) => destination.category === category);
}
