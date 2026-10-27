import { getPayloadClient } from "./client";
import { mapExperience } from "./mappers";
import { PUBLIC_READ } from "./query";
import type { Experience } from "./types";

/** Experiences in their editorial order. */
export async function getExperiences(): Promise<Experience[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "experiences", ...PUBLIC_READ, sort: ["order", "id"] });

  return docs.map(mapExperience);
}
