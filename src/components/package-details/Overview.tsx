import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function Overview({ pkg }: Props) {
  return (
    <section className="border-b border-[#10264A]/8 bg-white">
      <div className="px-6 py-8 sm:px-8 md:px-10 md:py-9">

        {/* =========================================================
            SECTION LABEL
        ========================================================= */}

        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.32em]
            text-[#C89A3D]
          "
        >
          Tour Overview
        </p>

        {/* =========================================================
            TITLE
        ========================================================= */}

        <h2
          className="
            mt-2
            font-serif
            text-2xl
            font-medium
            leading-tight
            text-[#10264A]
            sm:text-[28px]
          "
        >
          Discover the Real Spiti Valley
        </h2>

        {/* =========================================================
            GOLD DIVIDER
        ========================================================= */}

        <div className="mt-3 h-[3px] w-12 rounded-full bg-[#C89A3D]" />

        {/* =========================================================
            OVERVIEW TEXT
        ========================================================= */}

        <p
          className="
            mt-5
            max-w-4xl
            text-[14px]
            leading-7
            text-[#25446D]
            sm:text-[15px]
            sm:leading-7
          "
        >
          {pkg.overview}
        </p>

      </div>
    </section>
  );
}