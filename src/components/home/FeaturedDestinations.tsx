import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Mountain,
} from "lucide-react";

const destinations = [
  {
    name: "Manali",
    image: "/images/destinations/manali-featured.png",
    tagline: "Valley of Gods",
    altitude: "2,050 m",
    bestTime: "Mar – Jun",
    description:
      "Snow-covered peaks, adventure sports and unforgettable Himalayan escapes.",
    large: true,
    slug: "manali",
  },
  {
    name: "Shimla",
    image: "/images/destinations/shimla-3.png",
    tagline: "Queen of Hills",
    altitude: "2,276 m",
    bestTime: "Mar – Jun",
    description:
      "Colonial elegance, pine forests and peaceful mountain walks.",
    slug: "shimla",
  },
  {
    name: "Spiti Valley",
    image: "/images/destinations/spiti-1.png",
    tagline: "Cold Desert of India",
    altitude: "3,800 m",
    bestTime: "Jun – Sep",
    description:
      "Ancient monasteries, dramatic landscapes and breathtaking high-altitude roads.",
    slug: "spiti-valley",
  },
];

export default function FeaturedDestinations() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F8F7F3]
        py-16
        md:py-20
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
          bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9),transparent_52%)]
        "
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div
          className="
            mx-auto
            mb-10
            max-w-3xl
            text-center
            md:mb-12
          "
        >

          {/* Eyebrow */}

          <div className="mb-4 flex items-center justify-center gap-3">

            <span className="h-px w-9 bg-[#C89A3D]/65 md:w-11" />

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
              Explore the Himalayas
            </p>

            <span className="h-px w-9 bg-[#C89A3D]/65 md:w-11" />

          </div>


          {/* Heading */}

          <h2
            className="
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
            Destinations Worth Discovering
          </h2>


          {/* Ornament */}

          <div className="mx-auto mt-4 flex items-center justify-center gap-3">

            <span className="h-px w-9 bg-[#C89A3D]/65 md:w-10" />

            <span
              className="
                h-[7px]
                w-[7px]
                rotate-45
                bg-[#C89A3D]
                shadow-[0_0_7px_rgba(200,154,61,0.18)]
              "
            />

            <span className="h-px w-9 bg-[#C89A3D]/65 md:w-10" />

          </div>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              font-serif
              text-[14px]
              leading-6
              text-[#536174]
              sm:text-[15px]
              sm:leading-7
            "
          >
            From peaceful valleys to dramatic high-altitude landscapes,
            <br className="hidden sm:block" />
            discover the places that make Himachal unforgettable.
          </p>

        </div>


        {/* =====================================================
            DESTINATION GRID
        ===================================================== */}

        <div
          className="
            grid
            gap-5
            lg:grid-cols-[1.55fr_1fr]
          "
        >

          {/* ===================================================
              FEATURED — MANALI
          =================================================== */}

          <Link
            href={`/destinations/${destinations[0].slug}`}
            className="
              group
              relative
              block
              h-[460px]
              overflow-hidden
              rounded-[20px]
              border
              border-[#C89A3D]/35
              bg-[#10264A]
              shadow-[0_10px_35px_rgba(16,38,74,0.10)]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-[#C89A3D]/70
              hover:shadow-[0_20px_45px_rgba(16,38,74,0.16)]
              md:h-[490px]
            "
          >

            <Image
              src={destinations[0].image}
              alt={destinations[0].name}
              fill
              sizes="(max-width:1024px) 100vw, 65vw"
              className="
                object-cover
                transition-transform
                duration-[900ms]
                ease-out
                group-hover:scale-[1.045]
              "
            />

            {/* Image overlay */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#071525]/95
                via-[#071525]/35
                to-transparent
              "
            />

            {/* Top label */}

            <div
              className="
                absolute
                left-6
                top-6
                rounded-full
                border
                border-[#D4AF37]/60
                bg-[#10264A]/80
                px-3.5
                py-1.5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#F2D27B]
                backdrop-blur-md
              "
            >
              Featured Destination
            </div>


            {/* Content */}

            <div className="absolute bottom-7 left-7 right-7">

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#D9B255]
                  drop-shadow-[0_2px_7px_rgba(0,0,0,0.7)]
                "
              >
                {destinations[0].tagline}
              </p>

              <h3
                className="
                  mt-1
                  font-serif
                  text-[2.7rem]
                  font-medium
                  leading-none
                  tracking-[-0.02em]
                  text-white
                "
              >
                {destinations[0].name}
              </h3>


              {/* Meta */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-5
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-[#F1D17A]
                "
              >

                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} strokeWidth={1.7} />
                  {destinations[0].bestTime}
                </span>

                <span className="flex items-center gap-1.5">
                  <Mountain size={13} strokeWidth={1.7} />
                  {destinations[0].altitude}
                </span>

              </div>


              {/* Description */}

              <p
                className="
                  mt-3
                  max-w-md
                  text-[13px]
                  leading-6
                  text-white/80
                "
              >
                {destinations[0].description}
              </p>


              {/* CTA */}

              <div
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#F2D27B]
                  transition-all
                  duration-300
                  group-hover:gap-3
                "
              >
                Explore Destination

                <ArrowRight
                  size={15}
                  strokeWidth={1.8}
                />
              </div>

            </div>

          </Link>


          {/* ===================================================
              SECONDARY DESTINATIONS
          =================================================== */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">

            {destinations.slice(1).map((destination) => (

              <Link
                key={destination.name}
                href={`/destinations/${destination.slug}`}
                className="
                  group
                  relative
                  block
                  h-[225px]
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#C89A3D]/30
                  bg-[#10264A]
                  shadow-[0_8px_28px_rgba(16,38,74,0.08)]
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-[#C89A3D]/65
                  hover:shadow-[0_18px_38px_rgba(16,38,74,0.14)]
                  lg:h-[232px]
                "
              >

                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 35vw"
                  className="
                    object-cover
                    transition-transform
                    duration-[900ms]
                    ease-out
                    group-hover:scale-[1.045]
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#071525]/95
                    via-[#071525]/35
                    to-transparent
                  "
                />


                <div className="absolute bottom-5 left-6 right-6">

                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-[#F1D17A]
                    "
                  >
                    {destination.tagline}
                  </p>

                  <h3
                    className="
                      mt-1
                      font-serif
                      text-[1.85rem]
                      font-medium
                      leading-none
                      text-white
                    "
                  >
                    {destination.name}
                  </h3>


                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-4
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.1em]
                      text-[#F1D17A]
                    "
                  >

                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={12} strokeWidth={1.7} />
                      {destination.bestTime}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Mountain size={12} strokeWidth={1.7} />
                      {destination.altitude}
                    </span>

                  </div>


                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-2
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-white/85
                      transition-all
                      duration-300
                      group-hover:gap-3
                      group-hover:text-[#F1D17A]
                    "
                  >
                    Explore Destination

                    <ArrowRight
                      size={13}
                      strokeWidth={1.8}
                    />
                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>


        {/* =====================================================
            BOTTOM LINK
        ===================================================== */}

        <div className="mt-8 text-center">

          <Link
            href="/destinations"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#10264A]/20
              bg-white/70
              px-6
              py-2.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#10264A]
              shadow-[0_4px_14px_rgba(16,38,74,0.05)]
              transition-all
              duration-300
              hover:border-[#C89A3D]
              hover:bg-white
              hover:text-[#B5852F]
            "
          >
            View All Destinations

            <ArrowRight
              size={14}
              strokeWidth={1.8}
            />
          </Link>

        </div>

      </div>
    </section>
  );
}