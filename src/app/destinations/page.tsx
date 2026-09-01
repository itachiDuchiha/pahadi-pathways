import SiteLayout from "@/components/layout/SiteLayout";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationSection from "@/components/destinations/DestinationSection";
import TravelThemes from "@/components/destinations/TravelThemes";

import {
  featuredJourneys,
  alongTheWay,
  hiddenHimachal,
  cultureAndSoul,
} from "@/data/destinations";

export default function DestinationsPage() {
  return (
    <SiteLayout>
      {/* ================= HERO ================= */}

      <DestinationsHero />

      {/* ================= TRAVEL THEMES ================= */}

      <TravelThemes />

      {/* ================= FEATURED JOURNEYS ================= */}

      <div id="destinations" className="scroll-mt-[96px]">
        <DestinationSection
          title="Featured Journeys"
          subtitle="Our Most Loved Destinations"
          destinations={featuredJourneys}
        />
      </div>

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

      {/* ================= DESTINATION GUIDE ================= */}

      <section className="bg-[#F7F3E9] py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
              Himalayan Guide
            </p>

            <h2 className="mt-3 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
              Places to Visit in Himachal Pradesh
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-7 text-gray-600">
              Himachal is not one single kind of destination. Each region has
              its own landscape, atmosphere and character — from popular hill
              stations and adventure valleys to remote villages and ancient
              Himalayan settlements.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {/* WESTERN HIMACHAL */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#10264A]">
                Western Himachal
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Explore destinations such as Dharamshala, McLeod Ganj,
                Dalhousie and Khajjiar, where forests, valleys and mountain
                culture come together.
              </p>
            </div>

            {/* CENTRAL HIMACHAL */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#10264A]">
                Central Himachal
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Discover classic Himalayan escapes around Shimla, Manali,
                Kullu and nearby valleys, with a mix of scenery, adventure and
                familiar mountain towns.
              </p>
            </div>

            {/* HIGH HIMALAYAS */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#10264A]">
                High Himalayas
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Travel deeper into Kinnaur and Spiti for dramatic landscapes,
                ancient monasteries, high mountain roads and remote Himalayan
                villages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#10264A] px-8 py-12 text-center text-white md:px-16 md:py-16">
          {/* Decorative glow */}

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C89A3D]/10 blur-3xl" />

          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
              Can't Decide?
            </p>

            <h2 className="mt-3 font-serif text-3xl font-medium md:text-4xl">
              Let Us Plan Your Himalayan Journey
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300">
              Tell us your travel dates, interests and budget. We'll recommend
              the perfect route through Himachal Pradesh.
            </p>

            <button
              type="button"
              className="
                mt-7
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
    </SiteLayout>
  );
}