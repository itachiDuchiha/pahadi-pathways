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
          "Coming Soon",
          "Coming Soon",
          "Coming Soon",
          "Coming Soon",
        ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">

      <div className="text-center">

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Continue Your Journey
        </p>

        <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
          Nearby Destinations
        </h2>

      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        {nearby.map((place) => (

          <Link
            key={place}
            href="#"
            className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C89A3D] hover:shadow-xl"
          >

            <div className="mb-5 text-4xl">
              📍
            </div>

            <h3 className="text-xl font-bold text-[#10264A]">
              {place}
            </h3>

          </Link>

        ))}

      </div>

    </section>
  );
}