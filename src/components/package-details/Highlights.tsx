import { CheckCircle2 } from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function Highlights({ pkg }: Props) {
  if (!pkg.highlights || pkg.highlights.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C89A3D]">
            Tour Highlights
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
            Why You'll Love This Journey
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#C89A3D]" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {pkg.highlights.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-2xl bg-[#F8F8F6] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CheckCircle2
                className="mt-1 text-[#C89A3D]"
                size={24}
              />

              <p className="leading-8 text-gray-700">
                {item}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}