import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  MessageCircle,
  Mountain,
} from "lucide-react";

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#10264A]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#10264A]/8
          bg-[#F8F7F3]
          py-20
          md:py-28
        "
      >

        {/* Soft background glow */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),transparent_58%)]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[-160px]
            top-1/2
            h-[360px]
            w-[360px]
            -translate-y-1/2
            rounded-full
            bg-[#C89A3D]/[0.035]
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          {/* Eyebrow */}

          <div className="mb-5 flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-[#C89A3D]/65" />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.42em]
                text-[#C89A3D]
              "
            >
              Traveler Stories
            </p>

            <span className="h-px w-10 bg-[#C89A3D]/65" />

          </div>


          {/* Heading */}

          <h1
            className="
              font-serif
              text-[2.7rem]
              font-medium
              leading-[1.05]
              tracking-[-0.025em]
              text-[#10264A]
              sm:text-[3.5rem]
              md:text-[4.2rem]
            "
          >
            Stories From
            <br />
            The Mountains
          </h1>


          {/* Ornament */}

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">

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


          {/* Description */}

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              font-serif
              text-[15px]
              leading-7
              text-[#596678]
              md:text-[16px]
              md:leading-8
            "
          >
            Every Himalayan journey leaves behind a story.
            <br className="hidden sm:block" />
            This is where we will share the experiences of our travelers.
          </p>


          {/* Rating */}

          <div
            className="
              mx-auto
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#C89A3D]/25
              bg-white/70
              px-5
              py-2.5
              shadow-[0_5px_18px_rgba(16,38,74,0.04)]
            "
          >

            <div className="flex items-center gap-[2px]">

              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={15}
                  className="fill-[#D5A83F] text-[#D5A83F]"
                />
              ))}

            </div>

            <span className="h-4 w-px bg-[#10264A]/15" />

            <span
              className="
                text-[11px]
                font-semibold
                tracking-wide
                text-[#10264A]
              "
            >
              4.9 Google Rating
            </span>

          </div>

        </div>
      </section>


      {/* =====================================================
          REVIEWS CONTENT
      ===================================================== */}

      <section className="relative py-16 md:py-20">

        <div className="mx-auto max-w-5xl px-6">

          {/* Section heading */}

          <div className="mx-auto max-w-2xl text-center">

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.4em]
                text-[#C89A3D]
              "
            >
              Traveler Experiences
            </p>

            <h2
              className="
                mt-3
                font-serif
                text-[2rem]
                font-medium
                tracking-[-0.02em]
                text-[#10264A]
                md:text-[2.5rem]
              "
            >
              More Stories Coming Soon
            </h2>

            <p
              className="
                mt-4
                font-serif
                text-[14px]
                leading-7
                text-[#596678]
                md:text-[15px]
              "
            >
              We are just beginning our journey. As travelers experience
              Himachal with The Himalayan Compass, their stories will find
              a place here.
            </p>

          </div>


          {/* =================================================
              EMPTY REVIEW STATE
          ================================================= */}

          <div
            className="
              mx-auto
              mt-12
              max-w-2xl
              rounded-[24px]
              border
              border-[#C89A3D]/20
              bg-white/75
              p-8
              text-center
              shadow-[0_12px_40px_rgba(16,38,74,0.06)]
              md:p-12
            "
          >

            {/* Icon */}

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-[#C89A3D]/30
                bg-[#C89A3D]/[0.07]
                text-[#C89A3D]
              "
            >
              <MessageCircle
                size={25}
                strokeWidth={1.5}
              />
            </div>


            <h3
              className="
                mt-6
                font-serif
                text-[1.55rem]
                font-medium
                text-[#10264A]
              "
            >
              Your story could be here.
            </h3>


            <p
              className="
                mx-auto
                mt-3
                max-w-md
                text-[13px]
                leading-6
                text-[#596678]
              "
            >
              We look forward to welcoming our first travelers and
              collecting the stories that make every journey special.
            </p>


            {/* Decorative line */}

            <div className="mx-auto mt-6 flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#C89A3D]/40" />

              <Mountain
                size={15}
                strokeWidth={1.5}
                className="text-[#C89A3D]"
              />

              <span className="h-px w-8 bg-[#C89A3D]/40" />

            </div>

          </div>


          {/* =================================================
              GOOGLE REVIEW CTA
          ================================================= */}

          <div
            className="
              mx-auto
              mt-8
              max-w-2xl
              rounded-[20px]
              border
              border-[#10264A]/10
              bg-[#10264A]
              p-7
              text-center
              shadow-[0_14px_35px_rgba(16,38,74,0.10)]
              md:p-8
            "
          >

            <div className="flex justify-center gap-[2px]">

              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className="fill-[#F2D27B] text-[#F2D27B]"
                />
              ))}

            </div>


            <h3
              className="
                mt-4
                font-serif
                text-[1.45rem]
                font-medium
                text-white
              "
            >
              Been to the mountains with us?
            </h3>


            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-[13px]
                leading-6
                text-white/70
              "
            >
              Your experience will help future travelers discover
              Himachal with confidence.
            </p>


            {/* Future Google review button */}

            <button
              type="button"
              disabled
              className="
                mt-6
                inline-flex
                cursor-not-allowed
                items-center
                gap-2
                rounded-full
                border
                border-[#F2D27B]/35
                bg-[#F2D27B]/10
                px-6
                py-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#F2D27B]
                opacity-80
              "
            >
              Google Reviews Coming Soon

              <ArrowRight
                size={14}
                strokeWidth={1.8}
              />
            </button>

          </div>


          {/* =================================================
              BACK TO DESTINATIONS / HOME
          ================================================= */}

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#10264A]/20
                bg-white/70
                px-6
                py-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#10264A]
                shadow-[0_4px_14px_rgba(16,38,74,0.04)]
                transition-all
                duration-300
                hover:border-[#C89A3D]
                hover:bg-white
                hover:text-[#A97925]
              "
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.8}
              />

              Back Home
            </Link>


            <Link
              href="/destinations"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#10264A]
                bg-[#10264A]
                px-6
                py-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
                shadow-[0_6px_18px_rgba(16,38,74,0.10)]
                transition-all
                duration-300
                hover:bg-[#18355F]
                hover:shadow-[0_9px_24px_rgba(16,38,74,0.15)]
              "
            >
              Explore Destinations

              <ArrowRight
                size={14}
                strokeWidth={1.8}
              />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}