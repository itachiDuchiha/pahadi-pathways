import Image from "next/image";

import Link from "next/link";

import type { DestinationPageProps } from "@/components/destination-page/registry";

/*
 * ============================================================
 * SHIMLA PAGE
 * ============================================================
 */

export default function ShimlaPage({
  destination,
}: DestinationPageProps) {
  const galleryImages =
    "gallery" in destination && destination.gallery
      ? destination.gallery
      : [];

  return (
        <div className="bg-[#F8F6F1] pt-[82px]">

          {/* =====================================================
              SHIMLA HEADER + PHOTO GRID
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


              {galleryImages.length >= 4 && (

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.25fr_1fr]">

                  <div className="relative h-[300px] overflow-hidden rounded-[20px] md:h-[420px]">

                    <Image
                      src={galleryImages[0]}
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
                        src={galleryImages[1]}
                        alt={`${destination.name} mountain landscape`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />

                    </div>


                    <div className="relative h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                      <Image
                        src={galleryImages[2]}
                        alt={`${destination.name} landmark`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />

                    </div>


                    <div className="relative col-span-2 h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                      <Image
                        src={galleryImages[3]}
                        alt={`${destination.name} river and mountains`}
                        fill
                        sizes="(max-width: 768px) 50vw, 45vw"
                        className="object-cover"
                      />

                    </div>

                  </div>

                </div>

              )}

            </div>

          </section>


          {/* =====================================================
              SHIMLA INTRODUCTION
          ===================================================== */}

          <section className="border-b border-[#10264A]/8 bg-[#F8F6F1]">

            <div className="mx-auto max-w-6xl px-6 py-8 md:py-9">

              <div className="grid gap-7 lg:grid-cols-[1.45fr_0.75fr] lg:items-start">

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                    Discover Shimla
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

            </div>

          </section>


          {/* =====================================================
              SHIMLA PACKAGES
          ===================================================== */}

          <section className="pt-5 md:pt-6">

            <section className="bg-[#F7F6F2] py-7 md:py-9">

              <div className="mx-auto max-w-6xl px-6">

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                      Explore Shimla
                    </p>

                    <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight text-[#10264A] md:text-5xl">
                      Popular Shimla Packages
                    </h2>

                  </div>

                  <Link
                    href="/packages"
                    className="
                      shrink-0
                      text-sm
                      font-bold
                      text-[#B5852F]
                      transition-colors
                      hover:text-[#10264A]
                    "
                  >
                    View All Packages →
                  </Link>

                </div>

                <div className="mt-6 rounded-3xl border border-[#10264A]/10 bg-white p-10 text-center">

                  <p className="text-gray-600">
                    No Data Found
                  </p>

                </div>

              </div>

            </section>

          </section>


          {/* =====================================================
              SHIMLA BEST TIME TO VISIT
          ===================================================== */}

          <section className="mx-auto max-w-6xl px-6 py-10 md:py-12">

            <div className="grid gap-6 rounded-3xl bg-[#10264A] px-7 py-7 text-white md:grid-cols-[0.7fr_1.3fr] md:items-center md:px-9">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Plan your visit
                </p>

                <h2 className="mt-1.5 font-serif text-2xl md:text-3xl">
                  Best Time to Visit Shimla
                </h2>

              </div>

              <p className="text-sm leading-6 text-white/80">
                March to June is generally pleasant for sightseeing and
                outdoor activities, while the winter months bring colder
                weather and possible snowfall. Mountain weather can
                change quickly, so keeping some flexibility in your
                itinerary is always useful.
              </p>

            </div>

          </section>


          {/* =====================================================
              SHIMLA FAQ
          ===================================================== */}

          <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">

            <div className="text-center">

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-2 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
                Shimla Travel Guide
              </h2>

            </div>


            <div className="mt-7 divide-y divide-[#10264A]/10 rounded-3xl border border-[#10264A]/10 bg-white px-6 shadow-[0_10px_35px_rgba(16,38,74,0.05)]">

              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  Best time to visit Shimla?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  March to June is generally pleasant for sightseeing,
                  while the winter season is popular with travellers
                  looking for colder weather and snowfall.
                </p>

              </details>


              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  What are the main places to visit in Shimla?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  Popular places include Mall Road, The Ridge, Christ
                  Church, Jakhu Temple, Kufri and the Indian Institute
                  of Advanced Study.
                </p>

              </details>


              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  Is Shimla suitable for families?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  Yes. Shimla offers sightseeing, nature, heritage,
                  shopping and easy day excursions suitable for a wide
                  range of travellers.
                </p>

              </details>


              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  How many days are enough for Shimla?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  Two to three nights are enough for the main Shimla
                  attractions, while longer stays allow time for nearby
                  destinations such as Kufri and surrounding villages.
                </p>

              </details>

            </div>

          </section>

        </div>
  );
}
