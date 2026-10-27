import Image from "next/image";

import { site } from "@/config/site";

export const LOGO_SRC = "/images/logo/full-logo.webp";
export const LOGO_SIZE = 220;

/** The full brand logo shown on the admin login screen. */
export function Logo() {
  return (
    <Image
      src={LOGO_SRC}
      alt={site.name}
      width={LOGO_SIZE}
      height={LOGO_SIZE}
      priority
    />
  );
}
