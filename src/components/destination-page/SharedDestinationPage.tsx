import Image from "next/image";

import Link from "next/link";

import PackageCard from "@/components/packages/PackageCard";

import type { DestinationPageProps } from "@/components/destination-page/registry";

/*
 * ============================================================
 * OTHER DESTINATION PAGES
 *
 * These use the same shared structure:
 *
 * Kufri
 * Solang Valley
 * Khajjiar
 * Chitkul
 * Kalpa
 * Tosh
 * Tabo
 * Dhankar
 * Manikaran
 *
 * Only destinations with an explicit `gallery` array of four images
 * (set on the destination in the CMS) render
 * the four-image photo grid below. Everything else falls back to a
 * single full-width image using `destination.image`.
 *
 * ============================================================
 */

export default function SharedDestinationPage({
  destination, packages,
}: DestinationPageProps) {
  const galleryImages =
    "gallery" in destination &&
    destination.gallery &&
    destination.gallery.length >= 4
      ? destination.gallery
      : null;


  /*
   * ============================================================
   * FIND EXISTING PACKAGES FOR THIS DESTINATION
   *
   * We check both:
   *
   * 1. The main itinerary
   * 2. The detailed itinerary days / places
   *
   * This is important because places such as Chitkul can appear
   * inside the detailed itinerary without appearing as a main
   * overnight stop.
   * ============================================================
   */

  const destinationPackages = packages.filter((pkg) => {

    const destinationName = destination.name.toLowerCase();


    const itineraryMatch = pkg.itinerary.some((stop) =>
      stop.toLowerCase().includes(destinationName)
    );


    const detailedItineraryMatch =
      pkg.itineraryDays?.some((day) => {

        const titleMatch = day.title
          .toLowerCase()
          .includes(destinationName);


        const placeMatch = day.places?.some((place) =>
          place.toLowerCase().includes(destinationName)
        );


        return titleMatch || placeMatch;

      }) ?? false;


    return itineraryMatch || detailedItineraryMatch;

  });


  return (
        <div className="bg-[#F8F6F1] pt-[82px]">


          {/* =====================================================
              DESTINATION HEADER + PHOTO GRID
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


              {/* =================================================
                  FOUR IMAGE GALLERY
              ================================================= */}

              {galleryImages ? (

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.25fr_1fr]">


                  {/* MAIN IMAGE */}

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


                  {/* THREE SMALL IMAGES */}

                  <div className="grid grid-cols-2 gap-3 md:grid-rows-[198px_198px]">


                    <div className="relative h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                      <Image
                        src={galleryImages[1]}
                        alt={`${destination.name} landscape`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />

                    </div>


                    <div className="relative h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                      <Image
                        src={galleryImages[2]}
                        alt={`${destination.name} scenic view`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />

                    </div>


                    <div className="relative col-span-2 h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                      <Image
                        src={galleryImages[3]}
                        alt={`${destination.name} Himalayan landscape`}
                        fill
                        sizes="(max-width: 768px) 50vw, 45vw"
                        className="object-cover"
                      />

                    </div>

                  </div>

                </div>

              ) : (

                /* No numbered gallery for this destination: show a
                   single full-width hero image instead. */

                <div className="relative h-[300px] overflow-hidden rounded-[20px] md:h-[420px]">

                  <Image
                    src={destination.image}
                    alt={`${destination.name} - featured`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />

                </div>

              )}

            </div>

          </section>


          {/* =====================================================
              DESTINATION DESCRIPTION
          ===================================================== */}

          <section className="border-b border-[#10264A]/8 bg-[#F8F6F1]">

            <div className="mx-auto max-w-6xl px-6 py-8 md:py-9">

              <div className="max-w-4xl">

                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                  Discover {destination.name}
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
              POPULAR PACKAGES
          ===================================================== */}

          <section className="bg-[#F7F6F2] py-7 md:py-9">

            <div className="mx-auto max-w-6xl px-6">


              {/* ================= HEADER ================= */}

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                    Explore {destination.name}
                  </p>

                  <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight text-[#10264A] md:text-5xl">
                    Popular {destination.name} Packages
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


              {/* ================= PACKAGES ================= */}

              {destinationPackages.length > 0 ? (

                <div className="mt-6 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                  {destinationPackages.map((pkg) => (

                    <PackageCard
                      key={pkg.slug}
                      pkg={pkg}
                    />

                  ))}

                </div>

              ) : (

                <div className="mt-6 rounded-3xl border border-[#10264A]/10 bg-white p-10 text-center">

                  <p className="text-gray-600">
                    No Data Found
                  </p>

                </div>

              )}

            </div>

          </section>


          {/* =====================================================
              FUTURE CONTENT PLACEHOLDER
          ===================================================== */}

          <section className="mx-auto max-w-6xl px-6 py-10 md:py-12">

            <div className="rounded-3xl border border-[#10264A]/10 bg-white px-7 py-8 text-center shadow-[0_8px_25px_rgba(16,38,74,0.04)]">

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                More to Explore
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#10264A] md:text-3xl">
                More experiences in {destination.name}
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                More information about things to do, popular activities,
                local experiences and travel tips for {destination.name}
                will be added here in the future.
              </p>

            </div>

          </section>

        </div>
  );
}
