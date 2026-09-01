"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, ArrowDown } from "lucide-react";

export default function DestinationsHero() {
  const scrollToDestinations = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    const destinationSection = document.getElementById("destinations");

    if (destinationSection) {
      destinationSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative flex min-h-[570px] items-center justify-center overflow-hidden md:min-h-[600px]">
      {/* ================= BACKGROUND ================= */}

      <Image
        src="/images/hero/hero.jpg"
        alt="Himalayan mountains in Himachal Pradesh"
        fill
        priority
        className="object-cover"
      />

      {/* ================= OVERLAY ================= */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#081526]/80 via-[#081526]/55 to-[#081526]/85" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)]" />

      {/* ================= HERO CONTENT ================= */}

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-2 pt-24 text-center text-white sm:px-8">

        {/* EYEBROW */}

        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#C89A3D]/80 sm:w-14" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37] sm:text-xs">
            Explore Himachal
          </p>

          <span className="h-px w-8 bg-[#C89A3D]/80 sm:w-14" />
        </div>

        {/* MAIN HEADING */}

        <h1 className="mx-auto mt-6 max-w-3xl font-serif text-[2.65rem] font-medium leading-[1] tracking-[-0.02em] sm:text-5xl md:text-6xl lg:text-[3.8rem]">
          <span className="block">
            Every Journey
          </span>

          <span className="mt-1 block">
            Begins With
          </span>

          <span className="mt-1 block font-serif italic text-[#D4AF37]">
            A Destination
          </span>
        </h1>

        {/* TAGLINE */}

        <p className="mx-auto mt-5 font-serif text-lg font-medium text-white sm:text-xl">
          Places Worth Taking the Long Way For
        </p>

        {/* DECORATIVE DIVIDER */}

        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#C89A3D]/80 sm:w-16" />

          <Compass
            size={14}
            strokeWidth={1.3}
            className="text-[#D4AF37]"
          />

          <span className="h-px w-10 bg-[#C89A3D]/80 sm:w-16" />
        </div>

        {/* DESCRIPTION */}

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base sm:leading-7">
          Discover iconic hill stations, hidden valleys, peaceful monasteries,
          alpine lakes and unforgettable Himalayan experiences across Himachal
          Pradesh.
        </p>

        {/* CTA */}

        <Link
          href="#destinations"
          onClick={scrollToDestinations}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#C89A3D]
            px-6
            py-3
            text-xs
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#10264A]
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#D4AF37]
            hover:shadow-xl
            sm:px-7
            sm:py-3.5
            sm:text-sm
          "
        >
          Explore Destinations
          <ArrowDown size={16} strokeWidth={2} />
        </Link>
      </div>

      {/* ================= BOTTOM FADE ================= */}

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#081526]/40 to-transparent" />
    </section>
  );
}