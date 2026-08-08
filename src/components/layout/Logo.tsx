"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="The Himalayan Compass - Home"
      className="
        flex
        items-center
        transition-all
        duration-500
      "
    >
      <Image
        src="/images/logo/navbar-logo5.png"
        alt="The Himalayan Compass"
        width={280}
        height={70}
        priority
        className="
          h-20
          w-auto
          transition-all
          duration-500
          hover:scale-[1.03]
        "
      />
    </Link>
  );
}