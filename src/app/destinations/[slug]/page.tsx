import { notFound } from "next/navigation";
import Image from "next/image";

import SiteLayout from "@/components/layout/SiteLayout";
import { allDestinations } from "@/data/destinations";

import ManaliPackages from "@/components/destination-page/ManaliPackages";

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

              {/* PAGE TITLE */}

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
                        alt={`${destination.name} Atal Tunnel`}
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
              COMPACT INTRODUCTION
          ===================================================== */}

          <section className="border-b border-[#10264A]/8 bg-[#F8F6F1]">

            <div className="mx-auto max-w-6xl px-6 py-8 md:py-9">

              <div className="grid gap-7 lg:grid-cols-[1.45fr_0.75fr] lg:items-start">

                {/* LEFT — DESCRIPTION */}

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


                {/* =================================================
                    COMPACT MANALI AT A GLANCE
                ================================================= */}

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
              HIGHLIGHTS
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
              PACKAGES
          ===================================================== */}

          <section className="pt-5 md:pt-6">

            <ManaliPackages />

          </section>


          {/* =====================================================
              BEST TIME TO VISIT
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
              FAQ
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

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              {destination.subtitle}
            </p>

            <h1 className="mt-4 font-serif text-5xl font-medium md:text-7xl">
              {destination.name}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-white/90">
              {destination.description}
            </p>

          </div>

        </section>


        <section className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">

          <p className="text-lg leading-8 text-gray-600">
            This destination page is being prepared. Our packages
            and travel information for {destination.name} will be
            available soon.
          </p>

        </section>

      </main>
    </SiteLayout>
  );
}