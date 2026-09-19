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
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">

      {/* ================= INTRODUCTION ================= */}

      <div className="mx-auto max-w-3xl text-center">

        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Discover
        </p>

        <h2 className="mt-3 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
          About {destination.name}
        </h2>

        <p className="mt-5 text-base leading-8 text-gray-600 md:text-lg">
          {destination.fullDescription ??
            destination.description}
        </p>

      </div>

      {/* ================= DESTINATION FACTS ================= */}

      <div className="mt-10 grid gap-5 md:grid-cols-3">

        {/* REGION */}

        <div
          className="
            group
            rounded-2xl
            border
            border-[#10264A]/8
            bg-white
            p-7
            text-center
            shadow-[0_8px_30px_rgba(16,38,74,0.06)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#C89A3D]/50
            hover:shadow-[0_16px_35px_rgba(16,38,74,0.10)]
          "
        >

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
            Region
          </p>

          <h3 className="mt-3 text-lg font-bold text-[#10264A]">
            {destination.region ?? "Himachal Pradesh"}
          </h3>

          <div className="mx-auto mt-4 h-px w-8 bg-[#C89A3D]/50 transition-all duration-300 group-hover:w-12" />

        </div>

        {/* ELEVATION */}

        <div
          className="
            group
            rounded-2xl
            border
            border-[#10264A]/8
            bg-white
            p-7
            text-center
            shadow-[0_8px_30px_rgba(16,38,74,0.06)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#C89A3D]/50
            hover:shadow-[0_16px_35px_rgba(16,38,74,0.10)]
          "
        >

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
            Elevation
          </p>

          <h3 className="mt-3 text-lg font-bold text-[#10264A]">
            {destination.elevation ?? "Mountain Destination"}
          </h3>

          <div className="mx-auto mt-4 h-px w-8 bg-[#C89A3D]/50 transition-all duration-300 group-hover:w-12" />

        </div>

        {/* BEST TIME */}

        <div
          className="
            group
            rounded-2xl
            border
            border-[#10264A]/8
            bg-white
            p-7
            text-center
            shadow-[0_8px_30px_rgba(16,38,74,0.06)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#C89A3D]/50
            hover:shadow-[0_16px_35px_rgba(16,38,74,0.10)]
          "
        >

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
            Best Time
          </p>

          <h3 className="mt-3 text-lg font-bold text-[#10264A]">
            {destination.bestTime ?? "Throughout the Year"}
          </h3>

          <div className="mx-auto mt-4 h-px w-8 bg-[#C89A3D]/50 transition-all duration-300 group-hover:w-12" />

        </div>

      </div>

    </section>
  );
}