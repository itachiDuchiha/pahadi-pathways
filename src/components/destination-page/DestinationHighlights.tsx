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
          "Dramatic Himalayan mountain landscapes",
          "Solang Valley & adventure activities",
          "Ancient temples and local heritage",
          "Old Manali's cafés and mountain atmosphere",
          "Easy access to scenic valleys and high passes",
          "A mix of adventure, nature and relaxation",
        ];

  return (
    <section className="bg-[#F7F3E9] py-16 md:py-20">

      <div className="mx-auto max-w-6xl px-6">

        {/* ================= SECTION INTRO ================= */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
            Highlights
          </p>

          <h2 className="mt-3 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
            Why Visit {destination.name}?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Manali brings together dramatic mountain scenery, adventure,
            culture and the relaxed atmosphere of a Himalayan valley town.
          </p>

        </div>

        {/* ================= HIGHLIGHT CARDS ================= */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {highlights.map((item, index) => (
            <div
              key={item}
              className="
                group
                rounded-2xl
                border
                border-[#10264A]/8
                bg-white
                p-6
                shadow-[0_8px_30px_rgba(16,38,74,0.06)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#C89A3D]/50
                hover:shadow-[0_16px_35px_rgba(16,38,74,0.10)]
              "
            >

              {/* NUMBER / ICON */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#10264A]
                  text-sm
                  font-bold
                  text-[#D4AF37]
                  transition-all
                  duration-300
                  group-hover:bg-[#C89A3D]
                  group-hover:text-[#10264A]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* TITLE */}

              <h3
                className="
                  mt-5
                  text-lg
                  font-bold
                  leading-7
                  text-[#10264A]
                  transition-colors
                  duration-300
                  group-hover:text-[#C89A3D]
                "
              >
                {item}
              </h3>

              {/* GOLD ACCENT */}

              <div
                className="
                  mt-4
                  h-px
                  w-10
                  bg-[#C89A3D]/50
                  transition-all
                  duration-300
                  group-hover:w-16
                  group-hover:bg-[#C89A3D]
                "
              />

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}