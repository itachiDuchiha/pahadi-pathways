import { packages } from "@/data/packages";
import PackageCard from "@/components/packages/PackageCard";

export default function PopularPackages() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F7F5F0]
        py-10
        md:py-14
      "
    >
      {/* =====================================================
          PREMIUM BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),transparent_48%)]
        "
      />

      {/* Very subtle top transition from hero */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-16
          bg-gradient-to-b
          from-[#E8E5DE]/60
          to-transparent
        "
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div
          className="
            mb-8
            text-center
            md:mb-9
          "
        >

          {/* Eyebrow */}

          <div
            className="
              mb-3
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-9
                bg-[#C89A3D]/65
                md:w-11
              "
            />

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
              Popular Packages
            </p>

            <span
              className="
                h-px
                w-9
                bg-[#C89A3D]/65
                md:w-11
              "
            />
          </div>


          {/* Main Heading */}

          <h2
            className="
              mx-auto
              max-w-4xl
              font-serif
              text-[2.35rem]
              font-medium
              leading-[1.05]
              tracking-[-0.025em]
              text-[#10264A]
              sm:text-[2.8rem]
              md:text-[3.15rem]
            "
          >
            Journeys Loved by Travelers
          </h2>


          {/* Gold Ornament */}

          <div
            className="
              mx-auto
              mt-4
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-9
                bg-[#C89A3D]/65
                md:w-10
              "
            />

            <span
              className="
                h-[7px]
                w-[7px]
                rotate-45
                bg-[#C89A3D]
                shadow-[0_0_7px_rgba(200,154,61,0.18)]
              "
            />

            <span
              className="
                h-px
                w-9
                bg-[#C89A3D]/65
                md:w-10
              "
            />
          </div>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              font-serif
              text-[14px]
              leading-6
              text-[#536174]
              sm:text-[15px]
              sm:leading-7
            "
          >
            Handcrafted journeys through Himachal Pradesh,
            <br className="hidden sm:block" />
            created for travelers seeking more than an ordinary holiday.
          </p>

        </div>


        {/* =====================================================
            PACKAGES
        ===================================================== */}

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
            xl:gap-7
          "
        >
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.slug}
              pkg={pkg}
            />
          ))}
        </div>


        {/* =====================================================
            VIEW ALL
        ===================================================== */}

        <div className="mt-9 text-center md:mt-10">
          <button
            className="
              rounded-full
              border
              border-[#10264A]
              bg-[#10264A]
              px-8
              py-3
              text-sm
              font-semibold
              tracking-wide
              text-white
              transition-all
              duration-300
              hover:bg-[#18355F]
              hover:shadow-[0_8px_24px_rgba(16,38,74,0.16)]
            "
          >
            View All Packages
          </button>
        </div>

      </div>
    </section>
  );
}