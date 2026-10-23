import type { ComponentType } from "react";

import type { Destination } from "@/data/destinations";

import type { Package } from "@/data/packages";

import ManaliPage from "@/components/destination-page/ManaliPage";

import ShimlaPage from "@/components/destination-page/ShimlaPage";

import SpitiPage from "@/components/destination-page/SpitiPage";

import SharedDestinationPage from "@/components/destination-page/SharedDestinationPage";

import GenericDestinationPage from "@/components/destination-page/GenericDestinationPage";

export type DestinationPageProps = {
  destination: Destination;
  packages: Package[];
};

const dedicatedPages: Record<string, ComponentType<DestinationPageProps>> = {
  manali: ManaliPage,
  shimla: ShimlaPage,
  "spiti-valley": SpitiPage,
  spiti: SpitiPage,
};

export const sharedDestinationSlugs = [
  "kufri",
  "solang-valley",
  "khajjiar",
  "chitkul",
  "kalpa",
  "tosh",
  "tabo",
  "dhankar",
  "manikaran",
];

export function getDestinationPage(
  slug: string
): ComponentType<DestinationPageProps> {
  const dedicated = dedicatedPages[slug];

  if (dedicated) {
    return dedicated;
  }

  if (sharedDestinationSlugs.includes(slug)) {
    return SharedDestinationPage;
  }

  return GenericDestinationPage;
}
