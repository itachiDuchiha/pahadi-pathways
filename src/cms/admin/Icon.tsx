import Image from "next/image";

import { site } from "@/config/site";

export const ICON_SRC = "/images/logo/icon-logo.webp";
export const ICON_SIZE = 28;

/** The compact brand mark shown in the admin navigation. */
export function Icon() {
  return <Image src={ICON_SRC} alt={site.name} width={ICON_SIZE} height={ICON_SIZE} />;
}
