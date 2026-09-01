type Props = {
  destination: {
    name: string;
    highlights?: string[];
  };
};

export default function DestinationHighlights({
  destination,
}: Props) {
  const highlights =
    destination.highlights && destination.highlights.length > 0
      ? destination.highlights
      : [
          "Beautiful mountain scenery",
          "Local culture & traditions",
          "Perfect for photography",
          "Ideal for nature lovers",
          "Memorable Himalayan experiences",
          "Suitable for every traveler",
        ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">

      <div className="text-center">

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Highlights
        </p>

        <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
          Why Visit {destination.name}?
        </h2>

      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {highlights.map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#C89A3D]/10">

              <span className="text-xl text-[#C89A3D]">
                ★
              </span>

            </div>

            <h3 className="text-xl font-bold text-[#10264A]">
              {item}
            </h3>

          </div>
        ))}

      </div>

    </section>
  );
}