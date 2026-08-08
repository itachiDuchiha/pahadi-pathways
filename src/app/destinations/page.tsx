import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    name: "Shimla",
    subtitle: "The Queen of Hills",
    description:
      "Colonial charm, peaceful mountain views and timeless Himalayan escapes.",
    image: "/images/destinations/shimla.jpg",
  },
  {
    name: "Manali",
    subtitle: "Adventure in the Mountains",
    description:
      "Rivers, forests, high mountain passes and unforgettable adventures.",
    image: "/images/destinations/manali.jpg",
  },
  {
    name: "Spiti Valley",
    subtitle: "The Middle Land",
    description:
      "Ancient monasteries, dramatic landscapes and one of the Himalayas' most unique journeys.",
    image: "/images/destinations/spiti.jpg",
  },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9]">

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden">

        <Image
          src="/images/hero/hero.jpg"
          alt="Himalayan mountains"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-[#081526]/65" />

        {/* Content */}

        <div className="relative z-10 px-6 pt-24 text-center text-white">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37] md:text-sm">
            EXPLORE HIMACHAL
          </p>

          <h1 className="mt-5 text-5xl font-extrabold leading-tight md:text-7xl">
            Discover Your
            <br />
            Himalayan Escape
          </h1>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[#C89A3D]" />

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
            From peaceful hill stations to remote Himalayan valleys,
            discover the places that make Himachal unforgettable.
          </p>

        </div>

      </section>


      {/* ================= INTRO ================= */}

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Choose Your Journey
        </p>

        <h2 className="mt-4 text-3xl font-bold text-[#10264A] md:text-4xl">
          Three Destinations. Endless Stories.
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          Whether you want a relaxing mountain escape, an adventure-filled
          holiday or a journey into the remote Himalayas, we'll help you
          find the right destination for your travel style.
        </p>

      </section>


      {/* ================= DESTINATION CARDS ================= */}

      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="grid gap-8 md:grid-cols-3">

          {destinations.map((destination) => (
            <article
              key={destination.name}
              className="
                group
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-lg
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >

              {/* Image */}

              <div className="relative h-[360px] overflow-hidden">

                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/80 via-transparent to-transparent" />

                {/* Destination name */}

                <div className="absolute bottom-6 left-6 text-white">

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                    {destination.subtitle}
                  </p>

                  <h3 className="mt-2 text-4xl font-bold">
                    {destination.name}
                  </h3>

                </div>

              </div>


              {/* Card content */}

              <div className="p-7">

                <p className="leading-7 text-gray-600">
                  {destination.description}
                </p>

                <Link
                  href="#"
                  className="
                    mt-6
                    inline-flex
                    items-center
                    font-semibold
                    text-[#10264A]
                    transition-colors
                    duration-300
                    hover:text-[#C89A3D]
                  "
                >
                  Explore {destination.name}
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="mx-auto max-w-6xl px-6 pb-24">

        <div className="relative overflow-hidden rounded-3xl bg-[#10264A] px-8 py-16 text-center text-white md:px-16">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C89A3D]/10 blur-3xl" />

          <div className="relative">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Not Sure Where To Go?
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Let Us Help You Choose
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-300">
              Tell us what kind of experience you're looking for and
              we'll help you find the Himalayan destination that fits.
            </p>

            <button
              className="
                mt-8
                rounded-full
                bg-[#C89A3D]
                px-8
                py-4
                font-semibold
                text-[#10264A]
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D7AE57]
                hover:shadow-xl
              "
            >
              Plan My Journey
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}