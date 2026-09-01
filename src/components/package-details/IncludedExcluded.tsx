import { CheckCircle2, XCircle } from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function IncludedExcluded({ pkg }: Props) {
  return (
    <section className="bg-[#F8F8F6] py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">

        {/* INCLUDED */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="mb-8 text-3xl font-bold text-[#10264A]">
            What's Included
          </h2>

          <div className="space-y-5">

            {pkg.includes.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4"
              >
                <CheckCircle2
                  className="mt-1 text-green-600"
                  size={22}
                />

                <p className="text-gray-700">
                  {item}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* EXCLUDED */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="mb-8 text-3xl font-bold text-[#10264A]">
            What's Not Included
          </h2>

          <div className="space-y-5">

            {pkg.exclusions && pkg.exclusions.length > 0 ? (
              pkg.exclusions.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4"
                >
                  <XCircle
                    className="mt-1 text-red-500"
                    size={22}
                  />

                  <p className="text-gray-700">
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No exclusions listed.
              </p>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}