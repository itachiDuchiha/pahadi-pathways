import {
  CalendarDays,
  Car,
  MapPin,
  Mountain,
  Users,
  Clock3,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function QuickFacts({ pkg }: Props) {
  const facts = [
    {
      label: "Duration",
      value: pkg.duration,
      icon: Clock3,
    },
    {
      label: "Vehicle",
      value: pkg.vehicle || "—",
      icon: Car,
    },
    {
      label: "Maximum Altitude",
      value: pkg.maxAltitude || "—",
      icon: Mountain,
    },
    {
      label: "Pickup",
      value: pkg.pickup || "—",
      icon: MapPin,
    },
    {
      label: "Best Time",
      value: pkg.bestTime || "—",
      icon: CalendarDays,
    },
    {
      label: "Tour Type",
      value: pkg.tourType || "Private Tour",
      icon: Users,
    },
  ];

  return (
    <section className="border-b border-[#10264A]/8 bg-[#F8F7F3]">
      <div className="px-6 py-7 sm:px-8 md:px-10 md:py-8">

        {/* =========================================================
            SECTION HEADING
        ========================================================= */}

        <div className="text-center">
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.32em]
              text-[#C89A3D]
            "
          >
            Quick Facts
          </p>

          <h2
            className="
              mt-1.5
              font-serif
              text-2xl
              font-medium
              leading-tight
              text-[#10264A]
              sm:text-[27px]
            "
          >
            Tour Information
          </h2>

          <div className="mx-auto mt-2.5 h-[3px] w-10 rounded-full bg-[#C89A3D]" />
        </div>

        {/* =========================================================
            FACTS GRID
        ========================================================= */}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {facts.map((fact) => {
            const Icon = fact.icon;

            return (
              <div
                key={fact.label}
                className="
                  flex
                  min-h-[82px]
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-[#10264A]/8
                  bg-white
                  px-4
                  py-3
                  shadow-[0_2px_8px_rgba(16,38,74,0.04)]
                "
              >
                {/* ICON */}

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#C89A3D]/10
                  "
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#C89A3D]"
                  />
                </div>

                {/* TEXT */}

                <div className="min-w-0">
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-[#7A8491]
                    "
                  >
                    {fact.label}
                  </p>

                  <p
                    className="
                      mt-1
                      line-clamp-2
                      text-[13px]
                      font-semibold
                      leading-5
                      text-[#10264A]
                    "
                  >
                    {fact.value}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}