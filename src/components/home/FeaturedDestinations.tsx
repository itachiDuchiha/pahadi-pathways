import Image from "next/image";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "Manali",
    image: "/images/destinations/manali.jpg",
    description:
      "Snow-capped peaks, adventure sports and unforgettable Himalayan experiences.",
  },
  {
    name: "Shimla",
    image: "/images/destinations/shimla.jpg",
    description:
      "Colonial charm, pine forests and scenic mountain escapes.",
  },
  {
    name: "Spiti Valley",
    image: "/images/destinations/spiti.jpg",
    description:
      "Ancient monasteries, dramatic landscapes and high-altitude adventures.",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="relative -mt-3 bg-[#F8F8F6] pt-12 pb-14">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-10 text-center">

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

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">

          {/* Featured */}

          <div className="group relative h-[540px] overflow-hidden rounded-3xl">

            <Image
              src={destinations[0].image}
              alt={destinations[0].name}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute left-8 top-8 rounded-full bg-[#C89A3D] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#10264A]">
              Featured Destination
            </div>

            <div className="absolute bottom-8 left-8 right-8">

              <h3 className="text-5xl font-bold text-white">
                {destinations[0].name}
              </h3>

              <p className="mt-4 max-w-md leading-8 text-gray-200">
                {destinations[0].description}
              </p>

              <button className="mt-8 flex items-center gap-2 font-semibold text-[#D9B255] transition-all duration-300 group-hover:gap-4">
                Explore Destination
                <ArrowRight size={20} />
              </button>

            </div>

          </div>

          {/* Right */}

          <div className="grid h-[540px] grid-rows-2 gap-8">

            {destinations.slice(1).map((destination) => (

              <div
                key={destination.name}
                className="group relative overflow-hidden rounded-3xl"
              >

                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">

                  <h3 className="text-3xl font-bold text-white">
                    {destination.name}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-200">
                    {destination.description}
                  </p>

                  <button className="mt-5 flex items-center gap-2 font-semibold text-[#D9B255] transition-all duration-300 group-hover:gap-4">
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