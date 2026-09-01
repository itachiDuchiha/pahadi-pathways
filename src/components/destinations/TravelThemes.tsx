"use client";

import {
  Mountain,
  House,
  Landmark,
  Snowflake,
  Footprints,
  MoonStar,
} from "lucide-react";

const travelThemes = [
  {
    icon: Mountain,
    title: "Mountains & Valleys",
    description:
      "Dramatic peaks, deep valleys and unforgettable Himalayan landscapes.",
  },
  {
    icon: House,
    title: "Villages & Slow Travel",
    description:
      "Quiet villages, local life and peaceful stays away from the crowds.",
  },
  {
    icon: Landmark,
    title: "Culture & Monasteries",
    description:
      "Ancient temples, monasteries and centuries-old Himalayan traditions.",
  },
  {
    icon: Snowflake,
    title: "Snow & Winter",
    description:
      "Snow-covered landscapes and magical Himalayan winter escapes.",
  },
  {
    icon: Footprints,
    title: "Adventure & Trekking",
    description:
      "Mountain trails, high-altitude adventures and active escapes.",
  },
  {
    icon: MoonStar,
    title: "Offbeat & Stargazing",
    description:
      "Remote corners, clear skies and quieter Himalayan experiences.",
  },
];

export default function TravelThemes() {
  const scrollToDestinations = () => {
    const destinationSection =
      document.getElementById("destinations");

    if (destinationSection) {
      destinationSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="bg-[#F7F3E9] py-9 md:py-11">
      <div className="mx-auto max-w-6xl px-6">
        {/* ================= SECTION INTRO ================= */}

        <div className="mx-auto mb-6 max-w-3xl text-center md:mb-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C89A3D]">
            Find Your Kind of Journey
          </p>

          <h2 className="mt-2.5 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
            Explore By Travel Style
          </h2>

          <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-gray-600 md:text-base md:leading-7">
            Start with the kind of experience you want and discover
            destinations that match the journey you have in mind.
          </p>
        </div>

        {/* ================= TRAVEL THEME CARDS ================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {travelThemes.map((theme) => {
            const Icon = theme.icon;

            return (
              <div
                key={theme.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-[#10264A]/10
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#C89A3D]/40
                  hover:shadow-lg
                "
              >
                {/* ICON + TITLE */}

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#10264A]
                      text-white
                      transition-all
                      duration-300
                      group-hover:bg-[#C89A3D]
                      group-hover:text-[#10264A]
                    "
                  >
                    <Icon size={19} strokeWidth={1.7} />
                  </div>

                  <h3
                    className="
                      text-base
                      font-bold
                      text-[#10264A]
                      transition-colors
                      duration-300
                      group-hover:text-[#C89A3D]
                    "
                  >
                    {theme.title}
                  </h3>
                </div>

                {/* DESCRIPTION */}

                <p className="mt-3.5 text-sm leading-6 text-gray-600">
                  {theme.description}
                </p>

                {/* EXPLORE */}

                <button
                  type="button"
                  onClick={scrollToDestinations}
                  className="
                    mt-3
                    inline-flex
                    items-center
                    text-sm
                    font-semibold
                    text-[#10264A]
                    transition-colors
                    duration-300
                    hover:text-[#C89A3D]
                  "
                >
                  Explore

                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}