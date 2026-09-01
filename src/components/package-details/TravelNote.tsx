import { AlertTriangle } from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function TravelNote({ pkg }: Props) {
  if (!pkg.travelNote) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-3xl border-l-8 border-[#C89A3D] bg-[#FFF8E8] p-8 shadow-lg">

          <div className="flex items-start gap-5">

            <AlertTriangle
              size={34}
              className="mt-1 text-[#C89A3D]"
            />

            <div>

              <h2 className="text-3xl font-bold text-[#10264A]">
                Important Travel Note
              </h2>

              <p className="mt-5 text-lg leading-9 text-gray-700">
                {pkg.travelNote}
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}