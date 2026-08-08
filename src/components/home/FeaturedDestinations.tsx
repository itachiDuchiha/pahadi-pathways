import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Mountain,
} from "lucide-react";

const destinations = [
  {
    name: "Manali",
    image: "/images/destinations/manali1.jpg",
    tagline: "Valley of Gods",
    altitude: "2,050 m",
    bestTime: "Mar – Jun",
    description:
      "Snow-covered peaks, adventure sports and unforgettable Himalayan escapes.",
    large: true,
  },
  {
    name: "Shimla",
    image: "/images/destinations/shimla.jpg",
    tagline: "Queen of Hills",
    altitude: "2,276 m",
    bestTime: "Mar – Jun",
    description:
      "Colonial elegance, pine forests and peaceful mountain walks.",
  },
  {
    name: "Spiti Valley",
    image: "/images/destinations/spiti.jpg",
    tagline: "Cold Desert of India",
    altitude: "3,800 m",
    bestTime: "Jun – Sep",
    description:
      "Ancient monasteries, dramatic landscapes and breathtaking high-altitude roads.",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="relative bg-[#F8F8F6] pt-28 pb-24">

      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}

        <div className="mb-14 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#C89A3D]">
            EXPLORE
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#10264A] md:text-5xl">
            Himalayan Destinations
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#C89A3D]" />

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Discover handpicked destinations across the Himalayas,
            each offering unforgettable journeys and breathtaking landscapes.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">

          {/* Large Card */}

          <div className="group relative h-[500px] overflow-hidden rounded-3xl">

            <Image
              src={destinations[0].image}
              alt={destinations[0].name}
              fill
              sizes="(max-width:768px)100vw,(max-width:1200px)65vw,65vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

            <div className="absolute left-8 top-8 rounded-full bg-[#C89A3D] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#10264A]">

              Featured Destination

            </div>

            <div className="absolute bottom-8 left-8 right-8">

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#D9B255] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">

                {destinations[0].tagline}

              </p>

              <h3 className="text-5xl font-bold text-white">

                {destinations[0].name}

              </h3>

              <div className="mt-4 flex items-center gap-6 text-sm text-[#F4D06F]">

                <div className="flex items-center gap-2">

                  <CalendarDays size={15} />

                  <span>{destinations[0].bestTime}</span>

                </div>

                <div className="flex items-center gap-2">

                  <Mountain size={15} />

                  <span>{destinations[0].altitude}</span>

                </div>

              </div>

              <p className="mt-4 max-w-md leading-8 text-gray-200">

                {destinations[0].description}

              </p>

              <button className="mt-8 flex items-center gap-2 font-semibold text-[#F4D06F] transition-all duration-300 group-hover:gap-4">

                Explore Destination

                <ArrowRight size={20} />

              </button>

            </div>

          </div>

          {/* Right Cards */}

          <div className="flex flex-col gap-6">

            {destinations.slice(1).map((destination) => (

              <div
                key={destination.name}
                className="group relative h-[238px] overflow-hidden rounded-3xl"
              >

                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width:768px)100vw,(max-width:1200px)35vw,35vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F4D06F] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">

                    {destination.tagline}

                  </p>

                  <h3 className="text-3xl font-bold text-white">

                    {destination.name}

                  </h3>

                  <div className="mt-3 flex items-center gap-5 text-xs text-[#F4D06F]">

                    <div className="flex items-center gap-2">

                      <CalendarDays size={14} />

                      <span>{destination.bestTime}</span>

                    </div>

                    <div className="flex items-center gap-2">

                      <Mountain size={14} />

                      <span>{destination.altitude}</span>

                    </div>

                  </div>

                  <p className="mt-3 leading-7 text-gray-200">

                    {destination.description}

                  </p>

                  <button className="mt-5 flex items-center gap-2 font-semibold text-[#F4D06F] transition-all duration-300 group-hover:gap-4">

                    Explore Destination

                    <ArrowRight size={18} />

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}