import Image from "next/image";
import Link from "next/link";

const packages = [
  {
    name: "Shimla Escape",
    location: "Shimla",
    duration: "3 Days / 2 Nights",
    description:
      "A relaxing Himalayan getaway through Shimla's scenic views, colonial charm and peaceful mountain surroundings.",
    image: "/images/packages/shimla.jpg",
  },
  {
    name: "Manali Adventure",
    location: "Manali",
    duration: "5 Days / 4 Nights",
    description:
      "Experience the beauty of Manali with mountain landscapes, rivers, forests and unforgettable local experiences.",
    image: "/images/packages/manali.jpg",
  },
  {
    name: "Spiti Expedition",
    location: "Spiti Valley",
    duration: "7 Days / 6 Nights",
    description:
      "Journey deep into the remote Himalayas through ancient monasteries, dramatic valleys and breathtaking landscapes.",
    image: "/images/packages/spiti.jpg",
  },
];

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E9]">

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden">

        <Image
          src="/images/hero/hero.jpg"
          alt="Himalayan mountain journey"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-[#081526]/70" />

        {/* Hero Content */}

        <div className="relative z-10 px-6 pt-24 text-center text-white">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37] md:text-sm">
            CURATED HIMALAYAN JOURNEYS
          </p>

          <h1 className="mt-5 text-5xl font-extrabold leading-tight md:text-7xl">
            Journeys Made
            <br />
            For You
          </h1>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[#C89A3D]" />

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
            Thoughtfully planned journeys through the mountains,
            designed around comfort, discovery and authentic experiences.
          </p>

        </div>

      </section>


      {/* ================= INTRO ================= */}

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Our Journeys
        </p>

        <h2 className="mt-4 text-3xl font-bold text-[#10264A] md:text-4xl">
          Choose Your Himalayan Experience
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          From short mountain escapes to deeper Himalayan adventures,
          choose a journey that matches the way you want to travel.
        </p>

      </section>


      {/* ================= PACKAGE CARDS ================= */}

      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="grid gap-8 md:grid-cols-3">

          {packages.map((pkg) => (
            <article
              key={pkg.name}
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

              <div className="relative h-[340px] overflow-hidden">

                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/85 via-transparent to-transparent" />

                {/* Image Information */}

                <div className="absolute bottom-6 left-6 text-white">

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                    {pkg.location}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {pkg.name}
                  </h3>

                </div>

              </div>


              {/* Card Content */}

              <div className="p-7">

                {/* Duration */}

                <div className="mb-5 inline-flex rounded-full bg-[#F7F3E9] px-4 py-2 text-sm font-semibold text-[#10264A]">
                  {pkg.duration}
                </div>

                <p className="leading-7 text-gray-600">
                  {pkg.description}
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
                  View Journey
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* ================= CUSTOM JOURNEY ================= */}

      <section className="mx-auto max-w-6xl px-6 pb-24">

        <div className="relative overflow-hidden rounded-3xl bg-[#10264A] px-8 py-16 text-center text-white md:px-16">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C89A3D]/10 blur-3xl" />

          <div className="relative">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Travel Your Way
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Want Something More Personal?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-300">
              Every traveler is different. Tell us what you're looking for
              and we'll help create a Himalayan journey around you.
            </p>

            <button
              type="button"
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