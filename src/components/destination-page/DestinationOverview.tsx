type Destination = {
  name: string;
  fullDescription?: string;
  description: string;
  region?: string;
  elevation?: string;
  bestTime?: string;
};

type Props = {
  destination: Destination;
};

export default function DestinationOverview({
  destination,
}: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">

      <div className="mx-auto max-w-3xl text-center">

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Discover
        </p>

        <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
          About {destination.name}
        </h2>

        <p className="mt-8 text-lg leading-8 text-gray-600">
          {destination.fullDescription ??
            destination.description}
        </p>

      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-[#E8E8E8] bg-white p-8 text-center shadow-sm">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
            Region
          </p>

          <h3 className="mt-3 text-xl font-bold text-[#10264A]">
            {destination.region ?? "Coming Soon"}
          </h3>

        </div>

        <div className="rounded-3xl border border-[#E8E8E8] bg-white p-8 text-center shadow-sm">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
            Elevation
          </p>

          <h3 className="mt-3 text-xl font-bold text-[#10264A]">
            {destination.elevation ?? "Coming Soon"}
          </h3>

        </div>

        <div className="rounded-3xl border border-[#E8E8E8] bg-white p-8 text-center shadow-sm">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
            Best Time
          </p>

          <h3 className="mt-3 text-xl font-bold text-[#10264A]">
            {destination.bestTime ?? "Coming Soon"}
          </h3>

        </div>

      </div>

    </section>
  );
}