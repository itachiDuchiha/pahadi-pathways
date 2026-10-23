import Image from "next/image";
import Link from "next/link";
import { Camera, Mountain, ArrowRight } from "lucide-react";

import GalleryExplorer from "@/components/gallery/GalleryExplorer";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photographs from our Himachal journeys: mountain passes, valleys, villages and travellers on the road.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="relative flex min-h-[460px] items-center justify-center overflow-hidden pt-20 sm:min-h-[480px] md:min-h-[500px]">
        <Image
          src="/images/hero/gallery-hike-hero.png"
          alt="Himalayan mountain peaks reflected in a peaceful alpine lake at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Match the balanced, centered hero treatment used across the site. */}
        <div className="absolute inset-0 bg-[#081526]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#081526]/35 via-[#081526]/15 to-[#081526]/45" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-10 text-center text-white sm:px-8 sm:py-12 lg:px-10">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C89A3D] sm:w-10" />
            <Camera
              size={18}
              className="text-[#D4AF37]"
              strokeWidth={1.8}
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-xs sm:tracking-[0.35em]">
              The Himalayan Compass
            </p>
            <span className="h-px w-8 bg-[#C89A3D] sm:w-10" />
          </div>

          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            The Gallery
            <span className="mt-2 block font-serif italic text-[#D4AF37]">
              See the journey.
            </span>
          </h1>

          <div className="mt-4 flex items-center justify-center gap-2 text-[#D4AF37] sm:mt-5">
            <span className="h-px w-10 bg-[#C89A3D] sm:w-14" />
            <span className="text-sm">◆</span>
            <span className="h-px w-10 bg-[#C89A3D] sm:w-14" />
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/95 sm:mt-5 sm:text-base sm:leading-7">
            Mountains, roads, villages and quiet moments. A glimpse into the
            landscapes and experiences that make a Himalayan journey worth
            remembering.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:gap-x-5 sm:text-xs sm:tracking-[0.2em]">
            <span>Landscapes</span>
            <span className="text-[#D4AF37]">✦</span>
            <span>Local Life</span>
            <span className="text-[#D4AF37]">✦</span>
            <span>Journeys</span>
          </div>

          <a
            href="#gallery-collection"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#C89A3D] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#10264A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D4AF37] hover:shadow-xl"
          >
            Explore the Gallery
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ================================================== */}
      {/* INTRODUCTION */}
      {/* ================================================== */}

      <section className="bg-[#F7F3E9] px-6 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#C89A3D]" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
              A glimpse of the Himalayas
            </p>
            <span className="h-px w-9 bg-[#C89A3D]" />
          </div>

          <h2 className="font-serif text-3xl font-medium text-[#10264A] sm:text-4xl md:text-5xl">
            Every road has a story.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            From dramatic landscapes to quiet village moments, discover
            the places, people and experiences that give every Himalayan
            journey its own character.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#10264A]/70">
            <Mountain size={17} className="text-[#C89A3D]" />
            <span>Collected along the way</span>
          </div>
        </div>
      </section>

      <GalleryExplorer />

      {/* ================================================== */}
      {/* CLOSING CTA */}
      {/* ================================================== */}

      <section className="bg-[#F7F3E9] px-6 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
            Ready to see it yourself?
          </p>

          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-[#10264A] sm:text-4xl md:text-5xl">
            The best view is the one you experience.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            Explore the destinations behind these landscapes or browse
            our journeys and start planning your own Himalayan escape.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full bg-[#10264A] px-7 py-4 text-xs font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#183966] hover:shadow-lg sm:text-sm"
            >
              Explore Destinations
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/packages"
              className="inline-flex items-center gap-2 rounded-full border border-[#10264A]/20 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#10264A] transition-all duration-300 hover:-translate-y-1 hover:border-[#C89A3D] hover:text-[#9A7020] hover:shadow-lg sm:text-sm"
            >
              View Packages
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
