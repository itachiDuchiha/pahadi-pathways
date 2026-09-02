"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function DayTimeline({ pkg }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  if (!pkg.itineraryDays || pkg.itineraryDays.length === 0) {
    return null;
  }

  const toggleDay = (day: number) => {
    setOpenDay((current) =>
      current === day ? null : day
    );
  };

  return (
    <section className="bg-[#F8F8F6] py-16">
      <div className="mx-auto max-w-6xl px-6">

        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C89A3D]">
            Complete Itinerary
          </p>

          <h2 className="mt-3 font-serif text-4xl font-medium text-[#10264A]">
            Detailed Itinerary
          </h2>

          <div className="mt-4 h-[3px] w-16 rounded-full bg-[#C89A3D]" />
        </div>


        {/* =====================================================
            DAY ACCORDION
        ===================================================== */}

        <div className="space-y-4">

          {pkg.itineraryDays.map((day) => {
            const isOpen = openDay === day.day;

            return (
              <div
                key={day.day}
                className="
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#10264A]/10
                  bg-white
                  shadow-[0_3px_14px_rgba(16,38,74,0.05)]
                "
              >

                {/* =================================================
                    DAY HEADER
                ================================================= */}

                <button
                  type="button"
                  onClick={() => toggleDay(day.day)}
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    gap-5
                    px-5
                    py-5
                    text-left
                    transition-colors
                    duration-200
                    hover:bg-[#FAF8F1]
                    sm:px-6
                  "
                >

                  {/* DAY NUMBER */}

                  <div
                    className={`
                      flex
                      h-12
                      w-16
                      shrink-0
                      items-center
                      justify-center
                      text-lg
                      font-semibold
                      tracking-wide
                      transition-colors
                      duration-200
                      ${
                        isOpen
                          ? "text-[#C89A3D]"
                          : "text-[#10264A]"
                      }
                    `}
                  >
                    DAY {day.day}
                  </div>


                  {/* TITLE + ROUTE */}

                  <div className="min-w-0 flex-1">

                    <h3 className="text-base font-semibold uppercase tracking-[0.02em] text-[#10264A] sm:text-lg">
                      {day.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#52627A]">
                      Overnight Stay:{" "}
                      <span className="font-medium text-[#10264A]">
                        {day.stay}
                      </span>
                    </p>

                  </div>


                  {/* ARROW */}

                  <ChevronDown
                    size={20}
                    strokeWidth={1.8}
                    className={`
                      shrink-0
                      text-[#10264A]
                      transition-transform
                      duration-300
                      ${
                        isOpen
                          ? "rotate-180"
                          : "rotate-0"
                      }
                    `}
                  />

                </button>


                {/* =================================================
                    DAY DETAILS
                ================================================= */}

                <div
                  className={`
                    grid
                    transition-[grid-template-rows]
                    duration-300
                    ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >

                  <div className="overflow-hidden">

                    <div className="border-t border-[#10264A]/10 px-5 pb-6 pt-6 sm:px-6">

                      <div className="max-w-4xl">

                        <p className="text-[15px] leading-7 text-[#52627A]">
                          {day.description}
                        </p>


                        {/* OVERNIGHT BOX */}

                        {day.stay !== "-" && (
                          <div
                            className="
                              mt-6
                              flex
                              items-center
                              justify-between
                              gap-4
                              rounded-lg
                              border
                              border-[#C89A3D]/30
                              bg-[#FBF6E8]
                              px-4
                              py-4
                            "
                          >

                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C89A3D]">
                                Overnight Stay
                              </p>

                              <p className="mt-1 font-medium text-[#10264A]">
                                {day.stay}
                              </p>
                            </div>

                          </div>
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}