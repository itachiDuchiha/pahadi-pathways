import { getPayloadClient } from "./client";
import { mapTestimonial } from "./mappers";
import { PUBLIC_READ } from "./query";
import type { Testimonial } from "./types";

/** Testimonials in the order they were added. */
export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "testimonials", ...PUBLIC_READ, sort: "id" });

  return docs.map(mapTestimonial);
}
