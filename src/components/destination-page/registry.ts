import type { ComponentType } from "react";

import { allDestinations, type Destination } from "@/data/destinations";

import type { Package } from "@/data/packages";

import ManaliPage from "@/components/destination-page/ManaliPage";

import ShimlaPage from "@/components/destination-page/ShimlaPage";

import SpitiPage from "@/components/destination-page/SpitiPage";

import SharedDestinationPage from "@/components/destination-page/SharedDestinationPage";

export type DestinationPageProps = {
  destination: Destination;
  packages: Package[];
};

const dedicatedPages: Record<string, ComponentType<DestinationPageProps>> = {
  manali: ManaliPage,
  shimla: ShimlaPage,
  "spiti-valley": SpitiPage,
};

// Every destination without a dedicated page uses the shared layout, so a
// new entry in `allDestinations` gets a page automatically.
export const sharedDestinationSlugs: string[] = allDestinations
  .map((destination) => destination.slug)
  .filter((slug) => !Object.hasOwn(dedicatedPages, slug));

export function getDestinationPage(
  slug: string
): ComponentType<DestinationPageProps> {
  return Object.hasOwn(dedicatedPages, slug)
    ? dedicatedPages[slug]
    : SharedDestinationPage;
}
