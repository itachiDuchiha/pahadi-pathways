import Navbar from "../layout/Navbar";
import HeroPlanner from "./HeroPlanner";

import {
  Mountain,
  Leaf,
  Users,
} from "lucide-react";

type HeroProps = {
  onPlanTrip: () => void;
};

export default function Hero({ onPlanTrip }: HeroProps) {
  return (
    <>
      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#071A2C]
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: "url('/images/hero/hero.png')",
        }}
      >

        {/* =======================================================
            CINEMATIC OVERLAY
        ======================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#071A2C]/75
            via-[#071A2C]/45
            to-[#06192B]/85
          "
        />

        {/* =======================================================
            SUBTLE CENTER GLOW
        ======================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.08),transparent_45%)]
          "
        />

        {/* =======================================================
            NAVBAR
        ======================================================= */}

        <Navbar onPlanTrip={onPlanTrip} />

        {/* =======================================================
            HERO CONTENT
        ======================================================= */}

        <div
          className="
            relative
            z-10
            flex
            min-h-[570px]
            items-start
            justify-center
            px-6
            pb-20
            pt-28
            text-center
            sm:min-h-[590px]
            md:min-h-[600px]
            md:pt-28
            lg:min-h-[658px]
          "
        >

          <div className="relative w-full max-w-6xl">

            {/* ===================================================
                TOP EYEBROW
            =================================================== */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-center
                gap-4
                md:mb-6
              "
            >

              <span
                className="
                  h-px
                  w-10
                  bg-[#D4AF37]/80
                  sm:w-14
                "
              />

              <p
                className="
                  whitespace-nowrap
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.42em]
                  text-[#D4AF37]
                  sm:text-[10px]
                  md:text-[11px]
                "
              >
                THE HIMALAYAN COMPASS
              </p>

              <span
                className="
                  h-px
                  w-10
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
                max-w-5xl
                font-serif
                font-medium
                leading-[0.98]
                tracking-[-0.025em]
                text-white
                drop-shadow-[0_5px_22px_rgba(0,0,0,0.5)]
                text-[2.65rem]
                sm:text-5xl
                md:text-6xl
                lg:text-[3.8rem]
              "
            >
              <span className="block">
                Where Every Mountain
              </span>

              <span
                className="
                  mt-1
                  block
                  font-serif
                  italic
                  font-medium
                  tracking-[-0.035em]
                  text-[#D4AF37]
                  drop-shadow-[0_5px_20px_rgba(0,0,0,0.45)]
                  text-[2.85rem]
                  sm:text-[3.15rem]
                  md:text-[3.9rem]
                  lg:text-[4rem]
                "
              >
                Tells a Story
              </span>
            </h1>

            {/* ===================================================
                GOLD ORNAMENT
            =================================================== */}

            <div
              className="
                mx-auto
                mt-5
                flex
                items-center
                justify-center
                gap-3
                md:mt-6
              "
            >

              <span
                className="
                  h-px
                  w-12
                  bg-[#D4AF37]/80
                  sm:w-16
                "
              />

              <span
                className="
                  relative
                  flex
                  h-3
                  w-3
                  items-center
                  justify-center
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rotate-45
                    bg-[#D4AF37]
                    shadow-[0_0_10px_rgba(212,175,55,0.35)]
                  "
                />
              </span>

              <span
                className="
                  h-px
                  w-12
                  bg-[#D4AF37]/80
                  sm:w-16
                "
              />

            </div>

            {/* ===================================================
                TAGLINE
            =================================================== */}

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                font-serif
                text-[15px]
                font-medium
                leading-7
                text-white/90
                drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]
                sm:text-base
                md:text-[17px]
                md:leading-8
              "
            >
              Your journey, our direction.
            </p>

            {/* ===================================================
                EXPERIENCE FEATURES
            =================================================== */}

            <div
              className="
                mx-auto
                mt-7
                flex
                max-w-2xl
                items-center
                justify-center
                gap-5
                sm:gap-8
                md:mt-8
                md:gap-10
              "
            >

              {/* AUTHENTIC */}

              <div className="flex items-center gap-2.5 sm:gap-3">

                <Mountain
                  size={24}
                  strokeWidth={1.5}
                  className="text-[#D4AF37] sm:h-7 sm:w-7"
                />

                <div className="text-left">
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-white
                      sm:text-[9px]
                    "
                  >
                    Authentic
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[7px]
                      uppercase
                      tracking-[0.2em]
                      text-white/55
                      sm:text-[8px]
                    "
                  >
                    Experiences
                  </p>
                </div>

              </div>

              {/* DIVIDER */}

              <span
                className="
                  hidden
                  h-9
                  w-px
                  bg-[#D4AF37]/45
                  sm:block
                "
              />

              {/* SUSTAINABLE */}

              <div className="flex items-center gap-2.5 sm:gap-3">

                <Leaf
                  size={24}
                  strokeWidth={1.5}
                  className="text-[#D4AF37] sm:h-7 sm:w-7"
                />

                <div className="text-left">
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-white
                      sm:text-[9px]
                    "
                  >
                    Sustainable
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[7px]
                      uppercase
                      tracking-[0.2em]
                      text-white/55
                      sm:text-[8px]
                    "
                  >
                    Travel
                  </p>
                </div>

              </div>

              {/* DIVIDER */}

              <span
                className="
                  hidden
                  h-9
                  w-px
                  bg-[#D4AF37]/45
                  sm:block
                "
              />

              {/* LOCAL */}

              <div className="flex items-center gap-2.5 sm:gap-3">

                <Users
                  size={24}
                  strokeWidth={1.5}
                  className="text-[#D4AF37] sm:h-7 sm:w-7"
                />

                <div className="text-left">
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-white
                      sm:text-[9px]
                    "
                  >
                    Local
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[7px]
                      uppercase
                      tracking-[0.2em]
                      text-white/55
                      sm:text-[8px]
                    "
                  >
                    Connections
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
              LEFT SIDE DECORATIVE TEXT
          ===================================================== */}

          <div
            className="
              absolute
              left-5
              top-[48%]
              hidden
              -translate-y-1/2
              lg:block
            "
          >
            <div className="flex items-start gap-3">

              <span className="mt-1 h-12 w-px bg-[#D4AF37]/70" />

              <div className="text-left">

                <p
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-white/55
                  "
                >
                  Beyond
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-white/55
                  "
                >
                  The Ordinary
                </p>

              </div>

            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE DECORATIVE TEXT
          ===================================================== */}

          <div
            className="
              absolute
              right-5
              top-[35%]
              hidden
              lg:block
            "
          >
            <div className="flex items-start gap-3">

              <span className="mt-1 h-12 w-px bg-[#D4AF37]/70" />

              <div className="text-left">

                <p
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-white/55
                  "
                >
                  More Than
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-white/55
                  "
                >
                  A Destination
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-white/55
                  "
                >
                  A Deeper Connection
                </p>

              </div>

            </div>
          </div>

        </div>

      </section>

      {/* =========================================================
          SEARCH PLANNER

          Moved slightly lower.
      ========================================================= */}

      <div
        className="
          relative
          z-30
          mx-auto
          -mt-[160px]
          max-w-6xl
          px-6
        "
      >
        <HeroPlanner />
      </div>
    </>
  );
}