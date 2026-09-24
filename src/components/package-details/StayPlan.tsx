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
    <section
      id="stays"
      className="border-b border-[#10264A]/8 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-7 sm:py-9 lg:px-8 lg:py-10">

        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <div className="mb-6 flex items-end justify-between gap-6">

          <div>
            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#C89A3D]
                sm:text-[9px]
              "
            >
              Accommodation
            </p>

            <h2
              className="
                mt-1.5
                font-serif
                text-[25px]
                font-medium
                leading-tight
                text-[#10264A]
                sm:text-[28px]
              "
            >
              Stay Plan
            </h2>

            <div className="mt-2 h-[3px] w-10 rounded-full bg-[#C89A3D]" />
          </div>

          <p
            className="
              hidden
              max-w-[280px]
              text-right
              text-[10px]
              leading-5
              text-[#667085]
              sm:block
            "
          >
            Comfortable overnight stays arranged along the journey.
          </p>

        </div>

        {/* =========================================================
            STAY LIST
        ========================================================= */}

        <div
          className="
            grid
            gap-2
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {pkg.stayPlan.map((stay, index) => (
            <div
              key={`${stay}-${index}`}
              className="
                group
                flex
                min-h-[62px]
                items-center
                gap-3
                rounded-xl
                border
                border-[#10264A]/8
                bg-[#F8F7F3]
                px-4
                py-3
                transition-all
                duration-200
                hover:border-[#C89A3D]/35
                hover:bg-[#FCFBF8]
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
                  border
                  border-[#C89A3D]/20
                  bg-[#C89A3D]/[0.07]
                  text-[#C89A3D]
                  transition-colors
                  duration-200
                  group-hover:border-[#C89A3D]/40
                  group-hover:bg-[#C89A3D]/[0.12]
                "
              >
                <BedDouble
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              {/* STAY */}

              <div className="min-w-0">
                <p
                  className="
                    text-[11px]
                    font-semibold
                    leading-5
                    text-[#10264A]
                    sm:text-[11.5px]
                  "
                >
                  {stay}
                </p>

                <p
                  className="
                    mt-0.5
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-[#98A1B2]
                  "
                >
                  Overnight stay
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================
            ACCOMMODATION NOTE
        ========================================================= */}

        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-[#10264A]/7
            bg-[#F8F7F3]/70
            px-3
            py-2
            text-[8.5px]
            leading-4
            text-[#7A8494]
            sm:text-[9px]
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-[#C89A3D]
            "
          />

          <span>
            Hotels and camps are selected based on the stay category,
            location and availability at the time of booking.
          </span>
        </div>

      </div>
    </section>
  );
}