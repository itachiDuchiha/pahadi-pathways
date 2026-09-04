import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function Hero({ pkg }: Props) {
  /*
   * Keep the route compact.
   *
   * First 5 locations are shown.
   * Remaining locations are grouped inside +N more.
   *
   * Arrows are rendered BETWEEN stops only.
   */

  const visibleStops = pkg.itinerary.slice(0, 5);
  const hiddenStops = pkg.itinerary.slice(5);

  return (
    <section className="bg-[#F5F6F8] pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================================================
            BREADCRUMB
        ========================================================= */}

        <div className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500">
          <Link
            href="/packages"
            className="transition-colors hover:text-[#C89A3D]"
          >
            Packages
          </Link>

          <span className="text-gray-300">/</span>

          <span className="truncate text-[#10264A]">
            {pkg.title}
          </span>
        </div>

        {/* =========================================================
            HERO
        ========================================================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-[#081526]
            shadow-[0_20px_60px_rgba(16,38,74,0.16)]
          "
        >

          {/* =======================================================
              BACKGROUND IMAGE
          ======================================================= */}

          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover"
          />

          {/* =======================================================
              CINEMATIC OVERLAY
          ======================================================= */}

          <div className="absolute inset-0 bg-gradient-to-r from-[#081526]/95 via-[#081526]/65 to-[#081526]/15" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/95 via-[#081526]/15 to-[#081526]/10" />

          {/* =======================================================
              MAIN HERO CONTENT
              
              IMPORTANT:
              Content now starts from a fixed top position instead
              of being pushed down by shorter titles.
          ======================================================= */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[405px]
              flex-col
              sm:min-h-[425px]
              md:min-h-[430px]
            "
          >

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div
              className="
                px-5
                pt-10
                pb-8
                sm:px-8
                sm:pt-10
                sm:pb-9
                md:px-12
                md:pt-10
                md:pb-10
              "
            >

              {/* ===================================================
                  EYEBROW
              =================================================== */}

              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#D4AF37]" />

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#D4AF37]
                  "
                >
                  Curated Himalayan Journey
                </p>
              </div>

              {/* ===================================================
                  TITLE
              =================================================== */}

              <h1
                className="
                  mt-4
                  max-w-6xl
                  font-serif
                  text-4xl
                  font-medium
                  leading-[1.02]
                  tracking-tight
                  text-white
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[4.25rem]
                "
              >
                {pkg.title}
              </h1>

              {/* ===================================================
                  JOURNEY ROUTE
              =================================================== */}

              <div className="mt-7">

                <p
                  className="
                    mb-3
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#D4AF37]
                  "
                >
                  Journey Route
                </p>

                <div className="flex flex-wrap items-center gap-y-2">

                  {/* =================================================
                      VISIBLE STOPS
                  ================================================= */}

                  {visibleStops.map((stop, index) => {
                    const isLastVisibleStop =
                      index === visibleStops.length - 1;

                    return (
                      <div
                        key={`${stop}-${index}`}
                        className="flex items-center"
                      >

                        {/* LOCATION */}

                        <span
                          className="
                            inline-flex
                            items-center
                            whitespace-nowrap
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            px-3
                            py-1.5
                            text-[10px]
                            font-medium
                            text-white
                            backdrop-blur-sm
                            transition-colors
                            duration-200
                            hover:border-[#D4AF37]/50
                            hover:bg-white/15
                          "
                        >
                          {stop}
                        </span>

                        {/* ARROW */}

                        {!isLastVisibleStop && (
                          <span
                            className="
                              mx-2
                              text-[13px]
                              text-[#D4AF37]
                            "
                          >
                            →
                          </span>
                        )}

                      </div>
                    );
                  })}

                  {/* =================================================
                      MORE STOPS
                  ================================================= */}

                  {hiddenStops.length > 0 && (
                    <div className="group relative">

                      {/* ARROW BEFORE +N MORE */}

                      {visibleStops.length > 0 && (
                        <span
                          className="
                            mx-2
                            text-[13px]
                            text-[#D4AF37]
                          "
                        >
                          →
                        </span>
                      )}

                      {/* MORE BUTTON */}

                      <span
                        className="
                          inline-flex
                          cursor-default
                          items-center
                          whitespace-nowrap
                          rounded-full
                          border
                          border-white/20
                          bg-white/10
                          px-3
                          py-1.5
                          text-[10px]
                          font-medium
                          text-white
                          backdrop-blur-sm
                          transition-all
                          duration-200
                          group-hover:border-[#D4AF37]/60
                          group-hover:bg-[#D4AF37]/15
                        "
                      >
                        +{hiddenStops.length} more
                      </span>

                      {/* =================================================
                          HOVER TOOLTIP
                      ================================================= */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          bottom-full
                          left-1/2
                          z-50
                          mb-3
                          w-max
                          min-w-[150px]
                          max-w-[280px]
                          -translate-x-1/2
                          translate-y-1
                          rounded-xl
                          border
                          border-white/10
                          bg-[#081526]/95
                          px-4
                          py-3
                          opacity-0
                          shadow-[0_15px_40px_rgba(0,0,0,0.35)]
                          backdrop-blur-xl
                          transition-all
                          duration-200
                          group-hover:pointer-events-auto
                          group-hover:translate-y-0
                          group-hover:opacity-100
                        "
                      >

                        <p
                          className="
                            mb-2
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[#D4AF37]
                          "
                        >
                          More Stops
                        </p>

                        <div className="flex flex-col gap-2">

                          {hiddenStops.map((stop, index) => (
                            <div
                              key={`${stop}-${index}`}
                              className="
                                flex
                                items-center
                                gap-2
                                text-[10px]
                                font-medium
                                text-white/85
                              "
                            >
                              <span
                                className="
                                  h-1
                                  w-1
                                  shrink-0
                                  rounded-full
                                  bg-[#D4AF37]
                                "
                              />

                              <span>
                                {stop}
                              </span>
                            </div>
                          ))}

                        </div>

                        {/* TOOLTIP ARROW */}

                        <div
                          className="
                            absolute
                            -bottom-1.5
                            left-1/2
                            h-3
                            w-3
                            -translate-x-1/2
                            rotate-45
                            border-r
                            border-b
                            border-white/10
                            bg-[#081526]/95
                          "
                        />

                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* =======================================================
                BOTTOM INFORMATION BAR

                mt-auto keeps this anchored to the bottom of the
                hero regardless of whether the title is one or
                two lines.
            ======================================================= */}

            <div
              className="
                mt-auto
                border-t
                border-white/10
                bg-[#081526]/85
                backdrop-blur-md
              "
            >

              <div
                className="
                  grid
                  md:grid-cols-[1fr_1fr_auto]
                "
              >

                {/* =================================================
                    DURATION
                ================================================= */}

                <div
                  className="
                    border-b
                    border-white/10
                    px-5
                    py-4
                    sm:px-6
                    md:border-b-0
                    md:border-r
                  "
                >

                  <div className="flex items-center gap-2">

                    <Clock3
                      size={14}
                      className="text-[#D4AF37]"
                    />

                    <span
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-white/45
                      "
                    >
                      Duration
                    </span>

                  </div>

                  <p className="mt-2 text-sm font-semibold text-white">
                    {pkg.duration}
                  </p>

                </div>

                {/* =================================================
                    STARTING POINT
                ================================================= */}

                <div
                  className="
                    border-b
                    border-white/10
                    px-5
                    py-4
                    sm:px-6
                    md:border-b-0
                    md:border-r
                  "
                >

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={14}
                      className="text-[#D4AF37]"
                    />

                    <span
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-white/45
                      "
                    >
                      Starting From
                    </span>

                  </div>

                  <p className="mt-2 text-sm font-semibold text-white">
                    {pkg.pickup}
                  </p>

                </div>

                {/* =================================================
                    PRICE + CTA
                ================================================= */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    px-5
                    py-4
                    sm:px-6
                    md:min-w-[330px]
                  "
                >

                  <div>

                    <p
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#D4AF37]
                      "
                    >
                      Starting From
                    </p>

                    <div className="mt-0.5 flex items-baseline">

                      <span
                        className="
                          font-sans
                          text-3xl
                          font-bold
                          tracking-tight
                          text-white
                        "
                      >
                        {pkg.price}
                      </span>

                    </div>

                    <p className="mt-0.5 text-[9px] text-white/45">
                      per person
                    </p>

                  </div>

                  <Link
                    href="/contact"
                    className="
                      inline-flex
                      shrink-0
                      items-center
                      gap-2
                      rounded-full
                      bg-[#C89A3D]
                      px-5
                      py-3
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-[#10264A]
                      shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#D7AE57]
                      hover:shadow-xl
                    "
                  >
                    Book This Tour

                    <ArrowRight size={14} />

                  </Link>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =========================================================
          SPACE BEFORE SECTION NAV
      ========================================================= */}

      <div className="h-5 md:h-7" />

    </section>
  );
}