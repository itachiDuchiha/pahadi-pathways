import Image from "next/image";

import type { DestinationPageProps } from "@/components/destination-page/registry";

/*
 * ============================================================
 * TEMPORARY FALLBACK FOR OTHER DESTINATIONS
 * ============================================================
 */

export default function GenericDestinationPage({
  destination,
}: DestinationPageProps) {
  return (
      <div className="bg-[#F8F6F1]">

        <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden">

          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#081526]/65" />

          <div className="relative z-10 px-6 text-center text-white">

            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              Himachal Pradesh
            </p>

            <h1 className="mt-3 font-serif text-5xl font-medium md:text-7xl">
              {destination.name}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
              {destination.description}
            </p>

          </div>

        </section>

      </div>
  );
}
