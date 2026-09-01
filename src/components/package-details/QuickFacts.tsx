import {
  CalendarDays,
  Car,
  Mountain,
  MapPinned,
  Users,
  Route,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function QuickFacts({ pkg }: Props) {
  return (
    <section className="bg-[#F8F8F6] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C89A3D]">
            Quick Facts
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
            Tour Information
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <CalendarDays className="mb-4 text-[#C89A3D]" size={28} />
            <p className="text-sm text-gray-500">Duration</p>
            <h3 className="mt-2 text-xl font-bold text-[#10264A]">
              {pkg.duration}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Car className="mb-4 text-[#C89A3D]" size={28} />
            <p className="text-sm text-gray-500">Vehicle</p>
            <h3 className="mt-2 text-xl font-bold text-[#10264A]">
              {pkg.vehicle || "Private Cab / SUV"}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Mountain className="mb-4 text-[#C89A3D]" size={28} />
            <p className="text-sm text-gray-500">Maximum Altitude</p>
            <h3 className="mt-2 text-xl font-bold text-[#10264A]">
              {pkg.maxAltitude || "-"}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <MapPinned className="mb-4 text-[#C89A3D]" size={28} />
            <p className="text-sm text-gray-500">Pickup</p>
            <h3 className="mt-2 text-xl font-bold text-[#10264A]">
              {pkg.pickup}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Route className="mb-4 text-[#C89A3D]" size={28} />
            <p className="text-sm text-gray-500">Best Time</p>
            <h3 className="mt-2 text-xl font-bold text-[#10264A]">
              {pkg.bestTime || "-"}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Users className="mb-4 text-[#C89A3D]" size={28} />
            <p className="text-sm text-gray-500">Tour Type</p>
            <h3 className="mt-2 text-xl font-bold text-[#10264A]">
              {pkg.tourType || "Private Tour"}
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
}