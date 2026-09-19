import Link from "next/link";

type Props = {
  destination: {
    name: string;
    nearbyPlaces?: string[];
  };
};

export default function NearbyDestinations({
  destination,
}: Props) {
  const nearby =
    destination.nearbyPlaces && destination.nearbyPlaces.length > 0
      ? destination.nearbyPlaces
      : [
          "Solang Valley",
          "Kullu",
          "Manikaran",
          "Naggar",
        ];

  const getSlug = (place: string) =>
    place
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">

      {/* ================= SECTION INTRO ================= */}

      <div className="mx-auto max-w-3xl text-center">

        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Continue Your Journey
        </p>

        <h2 className="mt-3 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
          Places Near {destination.name}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
          Extend your Himalayan journey with scenic valleys, mountain towns
          and peaceful destinations around {destination.name}.
        </p>

      </div>

      {/* ================= NEARBY DESTINATIONS ================= */}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {nearby.map((place) => (
          <Link
            key={place}
            href={`/destinations/${getSlug(place)}`}
            className="
              group
              rounded-2xl
              border
              border-[#10264A]/8
              bg-white
              p-6
              text-center
              shadow-[0_8px_30px_rgba(16,38,74,0.06)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#C89A3D]/60
              hover:shadow-[0_16px_35px_rgba(16,38,74,0.10)]
            "
          >

            {/* LOCATION MARKER */}

            <div
              className="
                mx-auto
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#10264A]
                text-lg
                text-[#D4AF37]
                transition-all
                duration-300
                group-hover:bg-[#C89A3D]
                group-hover:text-[#10264A]
              "
            >
              ✦
            </div>

            {/* PLACE NAME */}

            <h3
              className="
                mt-5
                text-lg
                font-bold
                text-[#10264A]
                transition-colors
                duration-300
                group-hover:text-[#C89A3D]
              "
            >
              {place}
            </h3>

            {/* EXPLORE */}

            <div
              className="
                mt-3
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-bold
                text-gray-500
                transition-all
                duration-300
                group-hover:text-[#C89A3D]
              "
            >
              <span>Explore</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>

          </Link>
        ))}

      </div>

    </section>
  );
}