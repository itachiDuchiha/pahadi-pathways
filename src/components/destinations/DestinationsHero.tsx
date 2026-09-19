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
    <section
      className="
        relative
        flex
        min-h-[570px]
        items-center
        justify-center
        overflow-hidden
        md:min-h-[600px]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <Image
        src="/images/hero/destination-hero.png"
        alt="Mountain valley and Himalayan landscape in Himachal Pradesh"
        fill
        priority
        sizes="100vw"
        className="
          object-cover
          object-center
        "
      />

      {/* =====================================================
          DARK CINEMATIC OVERLAY
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-[#07182C]/55
          via-[#07182C]/30
          to-[#07182C]/85
        "
      />

      {/* Subtle center glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]
        "
      />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-5xl
          px-6
          pb-8
          pt-24
          text-center
          text-white
          sm:px-8
          md:pb-10
        "
      >
        {/* ===================================================
            EYEBROW
        =================================================== */}

        <div className="flex items-center justify-center gap-3">
          <span
            className="
              h-px
              w-8
              bg-[#D4AF37]/80
              sm:w-14
            "
          />

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.42em]
              text-[#D4AF37]
              sm:text-xs
            "
          >
            Explore Himachal
          </p>

          <span
            className="
              h-px
              w-8
              bg-[#D4AF37]/80
              sm:w-14
            "
          />
        </div>

        {/* ===================================================
            MAIN HEADING
        =================================================== */}

        <h1
          className="
            mx-auto
            mt-6
            max-w-4xl
            font-serif
            text-[2.8rem]
            font-medium
            leading-[1.02]
            tracking-[-0.025em]
            drop-shadow-[0_3px_12px_rgba(0,0,0,0.25)]
            sm:text-5xl
            md:text-6xl
            lg:text-[4.4rem]
          "
        >
          <span className="block">
            Places Worth
          </span>

          <span
            className="
              mt-1
              block
              font-serif
              italic
              text-[#D4AF37]
            "
          >
            Discovering
          </span>
        </h1>

        {/* ===================================================
            TAGLINE
        =================================================== */}

        <p
          className="
            mx-auto
            mt-5
            max-w-2xl
            font-serif
            text-lg
            font-medium
            italic
            text-white/95
            drop-shadow-md
            sm:text-xl
            md:text-2xl
          "
        >
          From familiar mountains to roads less travelled.
        </p>

        {/* ===================================================
            DECORATIVE COMPASS DIVIDER
        =================================================== */}

        <div
          className="
            mx-auto
            mt-5
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span
            className="
              h-px
              w-10
              bg-[#D4AF37]/75
              sm:w-16
            "
          />

          <Compass
            size={17}
            strokeWidth={1.5}
            className="text-[#D4AF37]"
          />

          <span
            className="
              h-px
              w-10
              bg-[#D4AF37]/75
              sm:w-16
            "
          />
        </div>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <p
          className="
            mx-auto
            mt-5
            max-w-2xl
            text-sm
            leading-6
            text-white/90
            drop-shadow-md
            sm:text-base
            sm:leading-7
          "
        >
          From iconic hill stations and peaceful valleys to
          high-altitude landscapes, discover the places that
          make Himachal unforgettable.
        </p>

        {/* ===================================================
            CTA
        =================================================== */}

        <Link
          href="#destinations"
          onClick={scrollToDestinations}
          className="
            group
            mt-7
            inline-flex
            items-center
            gap-2.5
            rounded-full
            bg-[#C89A3D]
            px-7
            py-3.5
            text-xs
            font-bold
            uppercase
            tracking-[0.14em]
            text-[#10264A]
            shadow-[0_8px_25px_rgba(0,0,0,0.22)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#D4AF37]
            hover:shadow-[0_12px_30px_rgba(0,0,0,0.28)]
            active:scale-[0.97]
            sm:px-8
            sm:py-4
            sm:text-sm
          "
        >
          <span>Explore Destinations</span>

          <ArrowDown
            size={17}
            strokeWidth={2}
            className="
              transition-transform
              duration-300
              group-hover:translate-y-1
            "
          />
        </Link>
      </div>

      {/* =====================================================
          BOTTOM CINEMATIC FADE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-24
          bg-gradient-to-t
          from-[#07182C]/55
          to-transparent
        "
      />
    </section>
  );
}