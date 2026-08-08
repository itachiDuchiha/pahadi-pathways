import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationSection from "@/components/destinations/DestinationSection";

import {
  featuredJourneys,
  alongTheWay,
  hiddenHimachal,
  cultureAndSoul,
} from "@/data/destinations";

export default function DestinationsPage() {
  return (
    <main className="bg-[#FCFBF8]">

      <DestinationsHero />

      {/* ================= INTRO ================= */}

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Explore Himachal
        </p>

        <h2 className="mt-4 text-3xl font-bold text-[#10264A] md:text-4xl">
          Every Journey Begins With A Place
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          From famous hill stations to hidden Himalayan villages,
          discover destinations that inspire unforgettable journeys.
          Browse by travel style and find the places that speak to you.
        </p>

      </section>

      {/* ================= FEATURED ================= */}

      <DestinationSection
        title="Featured Journeys"
        subtitle="Our Most Loved Destinations"
        destinations={featuredJourneys}
      />

      {/* ================= ALONG THE WAY ================= */}

      <DestinationSection
        title="Along the Way"
        subtitle="Perfect Stops Between Destinations"
        destinations={alongTheWay}
      />

      {/* ================= HIDDEN HIMACHAL ================= */}

      <DestinationSection
        title="Hidden Himachal"
        subtitle="Quiet Corners of the Himalayas"
        destinations={hiddenHimachal}
      />

      {/* ================= CULTURE & SOUL ================= */}

      <DestinationSection
        title="Culture & Soul"
        subtitle="Monasteries, Temples & Traditions"
        destinations={cultureAndSoul}
      />

      {/* ================= CTA ================= */}

      <section className="mx-auto max-w-6xl px-6 py-24">

        <div className="relative overflow-hidden rounded-3xl bg-[#10264A] px-8 py-16 text-center text-white md:px-16">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C89A3D]/10 blur-3xl" />

          <div className="relative">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
              Can't Decide?
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Let Us Plan Your Himalayan Journey
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-300">
              Tell us your travel dates, interests and budget.
              We'll recommend the perfect route through Himachal Pradesh.
            </p>

            <button
              className="
                mt-8
                rounded-full
                bg-[#C89A3D]
                px-8
                py-4
                font-semibold
                text-[#10264A]
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D7AE57]
                hover:shadow-xl
              "
            >
              Plan My Journey
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}