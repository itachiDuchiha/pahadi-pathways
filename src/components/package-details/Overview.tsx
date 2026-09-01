import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function Overview({ pkg }: Props) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="max-w-4xl">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C89A3D]">
            Tour Overview
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
            Discover the Real Spiti Valley
          </h2>

          <div className="mt-5 h-1 w-20 rounded-full bg-[#C89A3D]" />

          <p className="mt-8 text-lg leading-9 text-gray-700">
            {pkg.overview}
          </p>

        </div>

      </div>
    </section>
  );
}