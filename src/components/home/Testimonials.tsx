import Link from "next/link";
import ScrollingTestimonials from "@/components/ui/ScrollingTestimonials";

export default function Testimonials() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F8F7F3]
        py-12
        md:py-16
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_15%_45%,rgba(255,255,255,0.9),transparent_38%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-1/2
          h-[320px]
          w-[320px]
          -translate-y-1/2
          rounded-full
          bg-[#C89A3D]/[0.035]
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div
          className="
            grid
            items-start
            gap-10
            lg:grid-cols-[0.82fr_1.18fr]
            lg:gap-16
          "
        >

          {/* ===================================================
              LEFT CONTENT
          =================================================== */}

          <div className="relative lg:pt-4">

            {/* Eyebrow */}

            <div className="flex items-center gap-3">

              <span className="h-px w-9 bg-[#C89A3D]/70" />

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.42em]
                  text-[#C89A3D]
                  md:text-[10px]
                "
              >
                Traveler Stories
              </p>

            </div>


            {/* Heading */}

            <h2
              className="
                mt-5
                max-w-md
                font-serif
                text-[2.45rem]
                font-medium
                leading-[1.06]
                tracking-[-0.025em]
                text-[#10264A]
                sm:text-[2.8rem]
                md:text-[3.15rem]
              "
            >
              Stories From
              <br />
              The Mountains
            </h2>


            {/* Ornament */}

            <div className="mt-5 flex items-center gap-3">

              <span className="h-px w-10 bg-[#C89A3D]/55" />

              <span
                className="
                  h-[7px]
                  w-[7px]
                  rotate-45
                  bg-[#C89A3D]
                  shadow-[0_0_7px_rgba(200,154,61,0.18)]
                "
              />

              <span className="h-px w-10 bg-[#C89A3D]/55" />

            </div>


            {/* Rating */}

            <div className="mt-6 flex flex-wrap items-center gap-3">

              <div
                className="
                  flex
                  items-center
                  gap-[2px]
                  text-[19px]
                  leading-none
                  text-[#D5A83F]
                "
                aria-label="5 star rating"
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <span
                className="
                  h-4
                  w-px
                  bg-[#10264A]/15
                "
              />

              <span
                className="
                  text-[12px]
                  font-semibold
                  tracking-wide
                  text-[#10264A]
                "
              >
                4.9 Google Rating
              </span>

            </div>


            {/* Description */}

            <p
              className="
                mt-6
                max-w-md
                font-serif
                text-[15px]
                leading-7
                text-[#596678]
                md:text-[16px]
                md:leading-8
              "
            >
              Real stories from travelers who discovered Himachal,
              experienced the Pahadi way, and took home memories
              worth returning for.
            </p>


            {/* CTA */}

            <Link
              href="/reviews"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#10264A]/25
                bg-white/70
                px-6
                py-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#10264A]
                shadow-[0_5px_18px_rgba(16,38,74,0.04)]
                transition-all
                duration-300
                hover:border-[#C89A3D]
                hover:bg-white
                hover:text-[#A97925]
                hover:shadow-[0_8px_22px_rgba(16,38,74,0.08)]
              "
            >
              View All Reviews

              <span
                className="
                  text-[14px]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>

            </Link>


            {/* Small supporting detail */}

            <div
              className="
                mt-7
                flex
                items-center
                gap-2
                text-[9px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[#7A8491]
              "
            >

              <span className="h-1.5 w-1.5 rounded-full bg-[#C89A3D]" />

              <span>
                Memories made in the Himalayas
              </span>

            </div>

          </div>


          {/* ===================================================
              RIGHT — SCROLLING TESTIMONIALS
          =================================================== */}

          <div
            className="
              relative
              min-w-0
            "
          >

            {/* Decorative vertical line */}

            <div
              className="
                pointer-events-none
                absolute
                -left-6
                top-8
                hidden
                h-[80%]
                w-px
                bg-gradient-to-b
                from-transparent
                via-[#C89A3D]/25
                to-transparent
                lg:block
              "
            />

            <ScrollingTestimonials />

          </div>

        </div>

      </div>
    </section>
  );
}