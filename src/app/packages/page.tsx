import Image from "next/image";

import SiteLayout from "@/components/layout/SiteLayout";
import PackageCard from "@/components/packages/PackageCard";

import { packages } from "@/data/packages";

export default function PackagesPage() {
  return (
    <SiteLayout>
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden md:min-h-[560px]">
        <Image
          src="/images/hero/hero.jpg"
          alt="Himalayan mountain journey"
          fill
          priority
          className="object-cover"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081526]/80 via-[#081526]/55 to-[#081526]/85" />

        {/* Soft center glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-4 pt-24 text-center text-white sm:px-8">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C89A3D]/80 sm:w-14" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37] sm:text-xs">
              Handpicked Himalayan Escapes
            </p>

            <span className="h-px w-8 bg-[#C89A3D]/80 sm:w-14" />
          </div>

          {/* Heading */}
          <h1 className="mx-auto mt-6 max-w-3xl font-serif text-[2.75rem] font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl">
            Journeys Made
            <br />
            <span className="italic text-[#D4AF37]">For You</span>
          </h1>

          {/* Divider */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C89A3D]/80 sm:w-16" />

            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />

            <span className="h-px w-10 bg-[#C89A3D]/80 sm:w-16" />
          </div>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base sm:leading-7">
            Thoughtfully planned journeys through the mountains, designed
            around comfort, discovery and authentic Himalayan experiences.
          </p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#081526]/35 to-transparent" />
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-12 text-center md:pb-12 md:pt-14">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Our Journeys
        </p>

        <h2 className="mt-3 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
          Choose Your Himalayan Experience
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          From short mountain escapes to deeper Himalayan adventures, choose a
          journey that matches the way you want to travel.
        </p>
      </section>

      {/* =========================================================
          PACKAGE GRID
      ========================================================= */}

      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* =========================================================
          CUSTOM JOURNEY
      ========================================================= */}

      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#10264A] px-7 py-12 text-center text-white sm:px-10 md:px-16 md:py-14">
          {/* Decorative glow */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C89A3D]/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Travel Your Way
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-medium md:text-4xl">
              Want Something More Personal?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              Every traveler is different. Tell us what you're looking for and
              we'll help create a Himalayan journey around you.
            </p>

            <button
              type="button"
              className="
                mt-7
                rounded-full
                bg-[#C89A3D]
                px-7
                py-3.5
                text-sm
                font-bold
                text-[#10264A]
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D7AE57]
                hover:shadow-xl
                active:scale-95
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