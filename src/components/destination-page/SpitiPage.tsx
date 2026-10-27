import Image from "next/image";

import SpitiPackages from "@/components/destination-page/SpitiPackages";

import type { DestinationPageProps } from "@/components/destination-page/registry";

/*
 * ============================================================
 * SPITI VALLEY PAGE
 * ============================================================
 */

export default function SpitiPage({
  destination,
  packages,
}: DestinationPageProps) {
  const spitiGallery = [
    "/images/destinations/spiti-1.webp",
    "/images/destinations/spiti-2.webp",
    "/images/destinations/spiti-3.webp",
    "/images/destinations/spiti-4.webp",
  ];


  return (
        <div className="bg-[#F8F6F1] pt-[82px]">

          {/* =====================================================
              SPITI HEADER + PHOTO GRID
          ===================================================== */}

          <section className="border-b border-[#10264A]/8 bg-[#F8F6F1]">

            <div className="mx-auto max-w-6xl px-6 pb-8 pt-3 md:pb-9 md:pt-4">

              <div className="mb-4">

                <h1 className="font-serif text-4xl font-medium leading-none tracking-tight text-[#10264A] md:text-5xl">
                  {destination.name}
                </h1>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#C89A3D]">
                  {destination.subtitle}
                </p>

              </div>


              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.25fr_1fr]">

                <div className="relative h-[300px] overflow-hidden rounded-[20px] md:h-[420px]">

                  <Image
                    src={spitiGallery[0]}
                    alt={`${destination.name} - featured`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover"
                  />

                </div>


                <div className="grid grid-cols-2 gap-3 md:grid-rows-[198px_198px]">

                  <div className="relative h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                    <Image
                      src={spitiGallery[1]}
                      alt={`${destination.name} mountain landscape`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />

                  </div>


                  <div className="relative h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                    <Image
                      src={spitiGallery[2]}
                      alt={`${destination.name} monastery`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />

                  </div>


                  <div className="relative col-span-2 h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                    <Image
                      src={spitiGallery[3]}
                      alt={`${destination.name} Himalayan landscape`}
                      fill
                      sizes="(max-width: 768px) 50vw, 45vw"
                      className="object-cover"
                    />

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =====================================================
              SPITI INTRODUCTION
          ===================================================== */}

          <section className="border-b border-[#10264A]/8 bg-[#F8F6F1]">

            <div className="mx-auto max-w-6xl px-6 py-8 md:py-9">

              <div className="max-w-4xl">

                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                  Discover Spiti Valley
                </p>

                <h2 className="mt-2 font-serif text-3xl font-medium leading-tight text-[#10264A] md:text-4xl">
                  {destination.subtitle}
                </h2>

                <div className="mt-3 space-y-2 text-[13px] leading-6 text-[#25446D] md:text-sm md:leading-6">

                  <p>
                    {destination.fullDescription ||
                      destination.description}
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* =====================================================
              SPITI PACKAGES
          ===================================================== */}

          <section className="pt-5 md:pt-6">

            <SpitiPackages packages={packages} />

          </section>


          {/* =====================================================
              SPITI BEST TIME
          ===================================================== */}

          <section className="mx-auto max-w-6xl px-6 py-10 md:py-12">

            <div className="grid gap-6 rounded-3xl bg-[#10264A] px-7 py-7 text-white md:grid-cols-[0.7fr_1.3fr] md:items-center md:px-9">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Plan your visit
                </p>

                <h2 className="mt-1.5 font-serif text-2xl md:text-3xl">
                  Best Time to Visit Spiti Valley
                </h2>

              </div>

              <p className="text-sm leading-6 text-white/80">
                May to October is generally the main travel season for
                Spiti Valley, when many high-altitude roads and villages
                are more accessible. Conditions can change quickly,
                however, and road status should always be checked before
                travelling.
              </p>

            </div>

          </section>


          {/* =====================================================
              SPITI FAQ
          ===================================================== */}

          <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">

            <div className="text-center">

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-2 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
                Spiti Travel Guide
              </h2>

            </div>


            <div className="mt-7 divide-y divide-[#10264A]/10 rounded-3xl border border-[#10264A]/10 bg-white px-6 shadow-[0_10px_35px_rgba(16,38,74,0.05)]">

              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  Best time to visit Spiti?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  May to October is generally the main travel season,
                  although conditions vary with altitude and road
                  conditions.
                </p>

              </details>


              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  What are the main places to visit in Spiti?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  Popular places include Kaza, Key Monastery, Dhankar,
                  Langza, Hikkim, Komik and several traditional villages
                  throughout the valley.
                </p>

              </details>


              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  Is Spiti suitable for families?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  Spiti can be experienced by families, but the high
                  altitude, long road journeys and remote nature of the
                  region require more planning than a conventional hill
                  station holiday.
                </p>

              </details>


              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  How many days are enough for Spiti?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  A Spiti trip generally needs more time than a short
                  hill-station getaway because of the distances between
                  villages and attractions. A longer itinerary also
                  allows more flexibility for road and weather
                  conditions.
                </p>

              </details>

            </div>

          </section>

        </div>
  );
}
