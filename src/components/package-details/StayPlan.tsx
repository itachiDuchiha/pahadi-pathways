import { BedDouble } from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function StayPlan({ pkg }: Props) {
  if (!pkg.stayPlan || pkg.stayPlan.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C89A3D]">
            Accommodation
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
            Stay Plan
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#C89A3D]" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {pkg.stayPlan.map((stay) => (
            <div
              key={stay}
              className="rounded-2xl border border-gray-200 bg-[#F8F8F6] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C89A3D] hover:shadow-lg"
            >
              <BedDouble
                className="mb-5 text-[#C89A3D]"
                size={34}
              />

              <h3 className="text-xl font-bold text-[#10264A]">
                {stay}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}