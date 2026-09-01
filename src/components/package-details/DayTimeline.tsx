import { ArrowRight } from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function DayTimeline({ pkg }: Props) {
  if (!pkg.itineraryDays || pkg.itineraryDays.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F8F8F6] py-20">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C89A3D]">
            Complete Itinerary
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
            Day-wise Journey
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#C89A3D]" />
        </div>

        <div className="space-y-8">

          {pkg.itineraryDays.map((day) => (
            <div
              key={day.day}
              className="rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col gap-6 md:flex-row">

                {/* Left */}
                <div className="md:w-44">

                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#10264A] text-xl font-bold text-white">
                    {day.day}
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C89A3D]">
                    Day {day.day}
                  </p>

                </div>

                {/* Right */}
                <div className="flex-1">

                  <h3 className="text-2xl font-bold text-[#10264A]">
                    {day.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-[#C89A3D]">

                    <ArrowRight size={18} />

                    <span className="font-semibold">
                      Overnight Stay : {day.stay}
                    </span>

                  </div>

                  <p className="mt-5 leading-8 text-gray-700">
                    {day.description}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}