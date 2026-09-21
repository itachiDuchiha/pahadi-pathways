import { notFound } from "next/navigation";

import Image from "next/image";

import SiteLayout from "@/components/layout/SiteLayout";

import { allDestinations } from "@/data/destinations";

import { packages } from "@/data/packages";

import ManaliPackages from "@/components/destination-page/ManaliPackages";

import SpitiPackages from "@/components/destination-page/SpitiPackages";

import PackageCard from "@/components/packages/PackageCard";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DestinationPage({
  params,
}: Props) {
  const { slug } = await params;

  const destination = allDestinations.find(
    (item) => item.slug === slug
  );

  if (!destination) {
    notFound();
  }

  /*
   * ============================================================
   * MANALI PAGE
   * ============================================================
   */

  if (destination.slug === "manali") {
    const galleryImages =
      "gallery" in destination && destination.gallery
        ? destination.gallery
        : [];

    return (
      <SiteLayout>

        <main className="bg-[#F8F6F1] pt-[82px]">

          {/* =====================================================
              MANALI HEADER + PHOTO GRID
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
                  FOUR IMAGE GRID
              ================================================= */}

              {galleryImages.length >= 4 && (

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.25fr_1fr]">

                  {/* LEFT — LARGE IMAGE */}

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


                  {/* RIGHT SIDE */}

                  <div className="grid grid-cols-2 gap-3 md:grid-rows-[198px_198px]">

                    {/* IMAGE 2 */}

                    <div className="relative h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                      <Image
                        src={galleryImages[1]}
                        alt={`${destination.name} mountain landscape`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />

                    </div>


                    {/* IMAGE 3 */}

                    <div className="relative h-[180px] overflow-hidden rounded-[20px] md:h-auto">

                      <Image
                        src={galleryImages[2]}
                        alt={`${destination.name} landmark`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />

                    </div>


                    {/* IMAGE 4 */}

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
              MANALI INTRODUCTION
          ===================================================== */}

          <section className="border-b border-[#10264A]/8 bg-[#F8F6F1]">

            <div className="mx-auto max-w-6xl px-6 py-8 md:py-9">

              <div className="grid gap-7 lg:grid-cols-[1.45fr_0.75fr] lg:items-start">

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                    Discover Manali
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-medium leading-tight text-[#10264A] md:text-4xl">
                    A Himalayan Escape
                  </h2>

                  <div className="mt-3 space-y-2 text-[13px] leading-6 text-[#25446D] md:text-sm md:leading-6">

                    <p>
                      Manali is a picturesque hill station nestled in the
                      Kullu Valley of Himachal Pradesh, surrounded by
                      snow-capped peaks, pine forests and the beautiful
                      Beas River. Its combination of mountain scenery,
                      peaceful villages and adventure makes it one of
                      Himachal Pradesh&apos;s most popular destinations.
                    </p>

                    <p>
                      From the forests and temples of Old Manali to the
                      adventure trails of Solang Valley, the landscapes
                      around Manali offer something for families, couples
                      and adventure travellers. Nearby attractions such
                      as Sissu and Atal Tunnel add even more variety to
                      a Manali journey.
                    </p>

                  </div>

                </div>


                <div className="rounded-2xl border border-[#10264A]/10 bg-white px-5 py-4 shadow-[0_8px_25px_rgba(16,38,74,0.04)]">

                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
                    Manali at a glance
                  </p>

                  <div className="mt-2 divide-y divide-[#10264A]/10">

                    <div className="flex items-center justify-between gap-4 py-2">

                      <span className="text-[12px] text-gray-500">
                        Region
                      </span>

                      <span className="text-right text-[12px] font-semibold text-[#10264A]">
                        Kullu Valley
                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-4 py-2">

                      <span className="text-[12px] text-gray-500">
                        Elevation
                      </span>

                      <span className="text-right text-[12px] font-semibold text-[#10264A]">
                        Approx. 2,050 m
                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-4 py-2">

                      <span className="text-[12px] text-gray-500">
                        Known for
                      </span>

                      <span className="text-right text-[12px] font-semibold text-[#10264A]">
                        Mountains &amp; Adventure
                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-4 py-2">

                      <span className="text-[12px] text-gray-500">
                        River
                      </span>

                      <span className="text-right text-[12px] font-semibold text-[#10264A]">
                        Beas River
                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-4 py-2">

                      <span className="text-[12px] text-gray-500">
                        Ideal for
                      </span>

                      <span className="text-right text-[12px] font-semibold text-[#10264A]">
                        Families · Couples · Adventure
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =====================================================
              MANALI HIGHLIGHTS
          ===================================================== */}

          <section className="border-b border-[#10264A]/8 bg-white">

            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 px-6 py-7 md:grid-cols-4 md:py-8">

              <div>

                <p className="font-serif text-lg text-[#10264A]">
                  Solang Valley
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-gray-500">
                  Adventure, snow and mountain views
                </p>

              </div>

              <div>

                <p className="font-serif text-lg text-[#10264A]">
                  Old Manali
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-gray-500">
                  Cafés, forests and local character
                </p>

              </div>

              <div>

                <p className="font-serif text-lg text-[#10264A]">
                  Sissu
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-gray-500">
                  Waterfalls and dramatic landscapes
                </p>

              </div>

              <div>

                <p className="font-serif text-lg text-[#10264A]">
                  Atal Tunnel
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-gray-500">
                  Gateway towards Lahaul
                </p>

              </div>

            </div>

          </section>


          {/* =====================================================
              MANALI PACKAGES
          ===================================================== */}

          <section className="pt-5 md:pt-6">

            <ManaliPackages />

          </section>


          {/* =====================================================
              MANALI BEST TIME TO VISIT
          ===================================================== */}

          <section className="mx-auto max-w-6xl px-6 py-10 md:py-12">

            <div className="grid gap-6 rounded-3xl bg-[#10264A] px-7 py-7 text-white md:grid-cols-[0.7fr_1.3fr] md:items-center md:px-9">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Plan your visit
                </p>

                <h2 className="mt-1.5 font-serif text-2xl md:text-3xl">
                  Best Time to Visit Manali
                </h2>

              </div>

              <p className="text-sm leading-6 text-white/80">
                March to June is ideal for pleasant weather, sightseeing
                and outdoor activities, while October to February is a
                great period for experiencing snowfall and winter
                landscapes. Weather can change quickly in the mountains,
                so travel plans should always allow some flexibility.
              </p>

            </div>

          </section>


          {/* =====================================================
              MANALI FAQ
          ===================================================== */}

          <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">

            <div className="text-center">

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-2 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
                Manali Travel Guide
              </h2>

            </div>


            <div className="mt-7 divide-y divide-[#10264A]/10 rounded-3xl border border-[#10264A]/10 bg-white px-6 shadow-[0_10px_35px_rgba(16,38,74,0.05)]">

              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  Best time to visit Manali?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  March to June is generally pleasant for sightseeing,
                  road trips and outdoor activities. October to February
                  brings colder weather and opportunities to experience
                  snow, depending on conditions.
                </p>

              </details>


              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  What are the main places to visit around Manali?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  Popular places include Solang Valley, Old Manali,
                  Hidimba Temple, Vashisht, Sissu and the Atal Tunnel.
                  The right combination depends on the season and the
                  type of trip you are planning.
                </p>

              </details>


              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  Is Manali suitable for families?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  Yes. Manali offers a mix of sightseeing, scenic drives,
                  temples, nature experiences and activities that can be
                  adapted for different age groups.
                </p>

              </details>


              <details className="group py-4">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-base text-[#10264A]">
                  How many days are enough for Manali?

                  <span className="text-xl text-[#C89A3D] transition-transform group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  A 3–5 day stay can cover the major Manali attractions,
                  while longer trips allow time for nearby valleys,
                  villages and slower mountain experiences.
                </p>

              </details>

            </div>

          </section>

        </main>

      </SiteLayout>
    );

  }


  /*
   * ============================================================
   * SHIMLA PAGE
   * ============================================================
   */

  if (destination.slug === "shimla") {
    const galleryImages =
      "gallery" in destination && destination.gallery
        ? destination.gallery
        : [];

    return (
      <SiteLayout>

        <main className="bg-[#F8F6F1] pt-[82px]">

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

                  <a
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
                  </a>

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

        </main>

      </SiteLayout>
    );

  }


  /*
   * ============================================================
   * SPITI VALLEY PAGE
   * ============================================================
   */

  if (
    destination.slug === "spiti-valley" ||
    destination.slug === "spiti"
  ) {

    const spitiGallery = [
      "/images/destinations/spiti-1.png",
      "/images/destinations/spiti-2.png",
      "/images/destinations/spiti-3.png",
      "/images/destinations/spiti-4.png",
    ];


    return (
      <SiteLayout>

        <main className="bg-[#F8F6F1] pt-[82px]">

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

            <SpitiPackages />

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

        </main>

      </SiteLayout>
    );

  }


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
   * Images automatically use:
   *
   * /images/destinations/[slug]-1.png
   * /images/destinations/[slug]-2.png
   * /images/destinations/[slug]-3.png
   * /images/destinations/[slug]-4.png
   *
   * ============================================================
   */

  const sharedDestinationSlugs = [
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


  if (sharedDestinationSlugs.includes(destination.slug)) {

    const galleryImages = [
      `/images/destinations/${destination.slug}-1.png`,
      `/images/destinations/${destination.slug}-2.png`,
      `/images/destinations/${destination.slug}-3.png`,
      `/images/destinations/${destination.slug}-4.png`,
    ];


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

      <SiteLayout>

        <main className="bg-[#F8F6F1] pt-[82px]">


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


                <a
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
                </a>

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

        </main>

      </SiteLayout>

    );

  }


  /*
   * ============================================================
   * TEMPORARY FALLBACK FOR OTHER DESTINATIONS
   * ============================================================
   */

  return (

    <SiteLayout>

      <main className="bg-[#F8F6F1]">

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

      </main>

    </SiteLayout>

  );

}