"use client";

import { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Moon,
  Navigation,
  Route,
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
      <div className="px-5 py-9 sm:px-7 sm:py-10 md:px-10 md:py-12">

        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <div className="mb-8">

          <div className="flex items-start justify-between gap-6">

            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#C89A3D]" />

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
                  Complete Journey
                </p>
              </div>

              <h2
                className="
                  mt-2
                  font-serif
                  text-[29px]
                  font-medium
                  leading-tight
                  tracking-[-0.02em]
                  text-[#10264A]
                  sm:text-[32px]
                  md:text-[35px]
                "
              >
                Detailed Itinerary
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-[10.5px]
                  leading-[1.65]
                  text-[#667085]
                  sm:text-[11px]
                "
              >
                Follow the journey day by day, including overnight stays,
                major stops and the experiences along the route.
              </p>

            </div>

            {/* =====================================================
                DAY COUNT
            ===================================================== */}

            <div
              className="
                hidden
                shrink-0
                rounded-xl
                border
                border-[#10264A]/8
                bg-white
                px-4
                py-3
                text-right
                shadow-[0_3px_12px_rgba(16,38,74,0.035)]
                sm:block
              "
            >

              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#C89A3D]
                "
              >
                Journey
              </p>

              <p
                className="
                  mt-0.5
                  font-serif
                  text-xl
                  font-medium
                  text-[#10264A]
                "
              >
                {days.length} Days
              </p>

            </div>

          </div>

          <div className="mt-4 h-[3px] w-12 rounded-full bg-[#C89A3D]" />

        </div>

        {/* =========================================================
            TIMELINE
        ========================================================= */}

        <div className="relative">

          {/* =======================================================
              MAIN JOURNEY LINE
          ======================================================= */}

          <div
            className="
              absolute
              bottom-7
              left-[19px]
              top-7
              w-px
              bg-gradient-to-b
              from-[#C89A3D]/45
              via-[#C89A3D]/20
              to-[#C89A3D]/5
              sm:left-[23px]
            "
          />

          <div className="space-y-4">

            {days.map((day, index) => {

              const isOpen = openDay === day.day;

              const isLastDay = index === days.length - 1;

              return (
                <div
                  key={day.day}
                  className="
                    relative
                    pl-[49px]
                    sm:pl-[60px]
                  "
                >

                  {/* =================================================
                      DAY NODE
                  ================================================= */}

                  <div
                    className={`
                      absolute
                      left-0
                      top-5
                      z-20
                      flex
                      h-[40px]
                      w-[40px]
                      items-center
                      justify-center
                      rounded-full
                      border-[3px]
                      transition-all
                      duration-300
                      sm:h-[47px]
                      sm:w-[47px]
                      ${
                        isOpen
                          ? "border-[#C89A3D] bg-[#10264A] text-white shadow-[0_5px_18px_rgba(16,38,74,0.18)]"
                          : "border-[#C89A3D]/45 bg-[#F8F7F3] text-[#10264A]"
                      }
                    `}
                  >

                    <span
                      className="
                        text-[9px]
                        font-bold
                        tracking-[0.04em]
                        sm:text-[10px]
                      "
                    >
                      {String(day.day).padStart(2, "0")}
                    </span>

                  </div>

                  {/* =================================================
                      DAY CARD
                  ================================================= */}

                  <div
                    className={`
                      overflow-hidden
                      rounded-2xl
                      border
                      bg-white
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "border-[#C89A3D]/30 shadow-[0_10px_30px_rgba(16,38,74,0.075)]"
                          : "border-[#10264A]/8 shadow-[0_3px_12px_rgba(16,38,74,0.035)] hover:border-[#C89A3D]/20 hover:shadow-[0_6px_20px_rgba(16,38,74,0.055)]"
                      }
                    `}
                  >

                    {/* =================================================
                        DAY HEADER
                    ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        setOpenDay(isOpen ? null : day.day)
                      }
                      aria-expanded={isOpen}
                      className="
                        group
                        flex
                        min-h-[86px]
                        w-full
                        items-center
                        gap-4
                        px-4
                        py-4
                        text-left
                        sm:min-h-[92px]
                        sm:px-5
                        md:px-6
                      "
                    >

                      {/* =================================================
                          DAY LABEL
                      ================================================= */}

                      <div className="hidden shrink-0 sm:block">

                        <p
                          className="
                            text-[7px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[#C89A3D]
                          "
                        >
                          Day
                        </p>

                        <p
                          className="
                            mt-0.5
                            font-serif
                            text-xl
                            font-medium
                            leading-none
                            text-[#10264A]
                          "
                        >
                          {day.day}
                        </p>

                      </div>

                      {/* =================================================
                          MAIN ROUTE CONTENT
                      ================================================= */}

                      <div className="min-w-0 flex-1">

                        {/* Route label */}

                        <div className="flex items-center gap-2">

                          <Route
                            size={12}
                            strokeWidth={1.8}
                            className="shrink-0 text-[#C89A3D]"
                          />

                          <p
                            className="
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-[0.18em]
                              text-[#8A94A5]
                            "
                          >
                            Day {day.day} · Journey
                          </p>

                        </div>

                        {/* Route title */}

                        <h3
                          className="
                            mt-1
                            text-[13px]
                            font-semibold
                            leading-5
                            text-[#10264A]
                            transition-colors
                            duration-200
                            group-hover:text-[#173867]
                            sm:text-[14px]
                          "
                        >
                          {day.title}
                        </h3>

                        {/* Overnight */}

                        {day.stay && day.stay !== "-" && (
                          <div className="mt-2">

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-[#10264A]/7
                                bg-[#F8F7F3]
                                px-2.5
                                py-1
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

                      {/* =================================================
                          OPEN / CLOSE BUTTON
                      ================================================= */}

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          transition-all
                          duration-300
                          ${
                            isOpen
                              ? "border-[#C89A3D]/30 bg-[#C89A3D]/10 text-[#C89A3D]"
                              : "border-[#10264A]/7 bg-[#F8F7F3] text-[#667085] group-hover:border-[#C89A3D]/25 group-hover:text-[#C89A3D]"
                          }
                        `}
                      >

                        <ChevronDown
                          size={15}
                          strokeWidth={2}
                          className={`
                            transition-transform
                            duration-300
                            ${isOpen ? "rotate-180" : ""}
                          `}
                        />

                      </span>

                    </button>

                    {/* =================================================
                        EXPANDED CONTENT
                    ================================================= */}

                    {isOpen && (
                      <div
                        className="
                          border-t
                          border-[#10264A]/7
                          bg-[#FCFCFA]
                          px-4
                          pb-5
                          pt-4
                          sm:px-5
                          sm:pb-6
                          md:px-6
                        "
                      >

                        {/* =================================================
                            DESCRIPTION
                        ================================================= */}

                        {day.description && (
                          <div className="max-w-3xl">

                            <p
                              className="
                                text-[11px]
                                leading-[1.75]
                                text-[#596579]
                                sm:text-[11.5px]
                              "
                            >
                              {day.description}
                            </p>

                          </div>
                        )}

                        {/* =================================================
                            PLACES
                        ================================================= */}

                        {day.places && day.places.length > 0 && (
                          <div
                            className="
                              mt-5
                              rounded-xl
                              border
                              border-[#10264A]/7
                              bg-white
                              p-3.5
                              sm:p-4
                            "
                          >

                            {/* Places heading */}

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <div
                                className="
                                  flex
                                  h-6
                                  w-6
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-[#C89A3D]/10
                                "
                              >
                                <MapPin
                                  size={11}
                                  strokeWidth={2}
                                  className="text-[#C89A3D]"
                                />
                              </div>

                              <div>

                                <p
                                  className="
                                    text-[8px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#C89A3D]
                                  "
                                >
                                  Stops & Experiences
                                </p>

                              </div>

                            </div>

                            {/* Places */}

                            <div className="mt-3 flex flex-wrap gap-2">

                              {day.places.map((place) => (
                                <span
                                  key={place}
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-[#10264A]/8
                                    bg-[#F8F7F3]
                                    px-2.5
                                    py-1.5
                                    text-[9px]
                                    font-medium
                                    text-[#34435A]
                                    transition-colors
                                    duration-200
                                    hover:border-[#C89A3D]/35
                                    hover:bg-[#C89A3D]/5
                                  "
                                >
                                  <span
                                    className="
                                      h-1
                                      w-1
                                      rounded-full
                                      bg-[#C89A3D]
                                    "
                                  />

                                  {place}
                                </span>
                              ))}

                            </div>

                          </div>
                        )}

                        {/* =================================================
                            NIGHT STAY FOOTER
                        ================================================= */}

                        {day.stay && day.stay !== "-" && (
                          <div
                            className="
                              mt-4
                              flex
                              items-center
                              gap-2
                              text-[9px]
                              text-[#7A8494]
                            "
                          >

                            <Moon
                              size={11}
                              strokeWidth={1.8}
                              className="text-[#C89A3D]"
                            />

                            <span>
                              Overnight stay in{" "}
                              <span className="font-semibold text-[#34435A]">
                                {day.stay}
                              </span>
                            </span>

                          </div>
                        )}

                      </div>
                    )}

                  </div>

                  {/* =================================================
                      SMALL TIMELINE TERMINATOR
                  ================================================= */}

                  {isLastDay && (
                    <div
                      className="
                        absolute
                        bottom-[-9px]
                        left-[14px]
                        z-10
                        h-2.5
                        w-2.5
                        rounded-full
                        border-2
                        border-[#C89A3D]
                        bg-[#F8F7F3]
                        sm:left-[18px]
                      "
                    />
                  )}

                </div>
              );
            })}

          </div>
        </div>

        {/* =========================================================
            TRAVEL NOTE
        ========================================================= */}

        <div
          className="
            mt-7
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-[#C89A3D]/15
            bg-[#C89A3D]/[0.045]
            px-4
            py-3
            sm:items-center
          "
        >

          <div
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#C89A3D]/10
            "
          >
            <Navigation
              size={12}
              strokeWidth={1.8}
              className="text-[#C89A3D]"
            />
          </div>

          <div>

            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#C89A3D]
              "
            >
              Travel Note
            </p>

            <p
              className="
                mt-0.5
                text-[9px]
                leading-4
                text-[#667085]
                sm:text-[9.5px]
              "
            >
              Daily timings and sightseeing order may vary depending
              on road, weather and local conditions.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}