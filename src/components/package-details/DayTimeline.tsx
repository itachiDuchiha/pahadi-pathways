"use client";

import { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Moon,
  Navigation,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function DayTimeline({ pkg }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  const days = pkg.itineraryDays ?? [];

  if (!days.length) {
    return null;
  }

  return (
    <section
      id="itinerary"
      className="border-b border-[#10264A]/8 bg-[#F8F7F3]"
    >
      <div className="px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8">

        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <div className="mb-5">
          <div className="flex items-end justify-between gap-4">

            <div>
              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.32em]
                  text-[#C89A3D]
                  sm:text-[9px]
                "
              >
                Complete Itinerary
              </p>

              <h2
                className="
                  mt-1
                  font-serif
                  text-[26px]
                  font-medium
                  leading-tight
                  text-[#10264A]
                  sm:text-[29px]
                "
              >
                Detailed Itinerary
              </h2>

              <div className="mt-2 h-[3px] w-11 rounded-full bg-[#C89A3D]" />
            </div>

          </div>
        </div>

        {/* =========================================================
            ITINERARY TIMELINE
        ========================================================= */}

        <div className="relative">

          {/* Vertical gold journey line */}

          <div
            className="
              absolute
              bottom-5
              left-[20px]
              top-5
              w-px
              bg-[#C89A3D]/25
              sm:left-[22px]
            "
          />

          <div className="space-y-2.5">

            {days.map((day) => {
              const isOpen = openDay === day.day;

              return (
                <div
                  key={day.day}
                  className="relative pl-[51px] sm:pl-[57px]"
                >

                  {/* =================================================
                      DAY NUMBER
                  ================================================= */}

                  <div
                    className={`
                      absolute
                      left-0
                      top-2.5
                      z-10
                      flex
                      h-[40px]
                      w-[40px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      text-[10px]
                      font-bold
                      transition-all
                      duration-200
                      sm:h-[44px]
                      sm:w-[44px]
                      ${
                        isOpen
                          ? "border-[#C89A3D] bg-[#C89A3D] text-white shadow-[0_3px_10px_rgba(200,154,61,0.20)]"
                          : "border-[#C89A3D]/35 bg-[#F8F7F3] text-[#10264A]"
                      }
                    `}
                  >
                    {String(day.day).padStart(2, "0")}
                  </div>

                  {/* =================================================
                      DAY CARD
                  ================================================= */}

                  <div
                    className={`
                      overflow-hidden
                      rounded-[11px]
                      border
                      bg-white
                      transition-all
                      duration-200
                      ${
                        isOpen
                          ? "border-[#C89A3D]/30 shadow-[0_4px_14px_rgba(16,38,74,0.055)]"
                          : "border-[#10264A]/8 shadow-[0_2px_7px_rgba(16,38,74,0.025)]"
                      }
                    `}
                  >

                    {/* =================================================
                        COMPACT DAY HEADER
                    ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        setOpenDay(isOpen ? null : day.day)
                      }
                      aria-expanded={isOpen}
                      className="
                        flex
                        min-h-[76px]
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-left
                        sm:min-h-[78px]
                        sm:px-5
                      "
                    >

                      <div className="min-w-0 flex-1">

                        {/* Route */}

                        <h3
                          className="
                            text-[12.5px]
                            font-semibold
                            leading-5
                            text-[#10264A]
                            sm:text-[13px]
                          "
                        >
                          {day.title}
                        </h3>

                        {/* Overnight */}

                        {day.stay && day.stay !== "-" && (
                          <div className="mt-1.5">
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1
                                rounded-full
                                bg-[#10264A]/[0.045]
                                px-2
                                py-[3px]
                                text-[8.5px]
                                font-medium
                                text-[#596579]
                              "
                            >
                              <Moon
                                size={9}
                                strokeWidth={2}
                                className="text-[#C89A3D]"
                              />

                              Overnight · {day.stay}
                            </span>
                          </div>
                        )}

                      </div>

                      {/* Chevron */}

                      <span
                        className={`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          transition-all
                          duration-200
                          ${
                            isOpen
                              ? "bg-[#C89A3D]/10 text-[#C89A3D]"
                              : "bg-[#10264A]/[0.035] text-[#667085]"
                          }
                        `}
                      >
                        <ChevronDown
                          size={14}
                          strokeWidth={2}
                          className={`
                            transition-transform
                            duration-200
                            ${isOpen ? "rotate-180" : ""}
                          `}
                        />
                      </span>

                    </button>

                    {/* =================================================
                        EXPANDED DAY DETAILS
                    ================================================= */}

                    {isOpen && (
                      <div
                        className="
                          border-t
                          border-[#10264A]/7
                          px-4
                          pb-4
                          pt-3
                          sm:px-5
                          sm:pb-4.5
                        "
                      >

                        {/* Description */}

                        {day.description && (
                          <p
                            className="
                              max-w-2xl
                              text-[11px]
                              leading-[1.65]
                              text-[#596579]
                              sm:text-[11.5px]
                            "
                          >
                            {day.description}
                          </p>
                        )}

                        {/* Places */}

                        {day.places && day.places.length > 0 && (
                          <div className="mt-3">

                            <div
                              className="
                                mb-1.5
                                flex
                                items-center
                                gap-1.5
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.16em]
                                text-[#C89A3D]
                              "
                            >
                              <MapPin
                                size={10}
                                strokeWidth={2}
                              />

                              Places Along the Way
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {day.places.map((place) => (
                                <span
                                  key={place}
                                  className="
                                    rounded-full
                                    border
                                    border-[#10264A]/8
                                    bg-[#F8F7F3]
                                    px-2
                                    py-1
                                    text-[9px]
                                    font-medium
                                    text-[#34435A]
                                  "
                                >
                                  {place}
                                </span>
                              ))}
                            </div>

                          </div>
                        )}

                      </div>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* =========================================================
            SMALL TRAVEL NOTE
        ========================================================= */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-[#C89A3D]/15
            bg-[#C89A3D]/[0.04]
            px-3
            py-2
            text-[9px]
            leading-4
            text-[#667085]
          "
        >
          <Navigation
            size={11}
            strokeWidth={1.8}
            className="shrink-0 text-[#C89A3D]"
          />

          <span>
            Daily timings may vary depending on road, weather and
            local conditions.
          </span>
        </div>

      </div>
    </section>
  );
}