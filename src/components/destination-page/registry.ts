import type { ComponentType } from "react";

import type { Destination, Package } from "@/lib/cms/types";

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

/**
 * Destinations marked `dedicated` in the CMS render their own component
 * when one exists for the slug; every other destination, including a
 * dedicated one without a component, uses the shared layout.
 */
export function getDestinationPage(
  destination: Pick<Destination, "slug" | "layout">
): ComponentType<DestinationPageProps> {
  return destination.layout === "dedicated" && Object.hasOwn(dedicatedPages, destination.slug)
    ? dedicatedPages[destination.slug]
    : SharedDestinationPage;
}
