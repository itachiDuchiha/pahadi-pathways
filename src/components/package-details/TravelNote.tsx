"use client";

import { useState } from "react";
import {
  ChevronDown,
  Hotel,
  Utensils,
  Route,
  CloudSun,
  Car,
  IdCard,
  Ticket,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

type InfoItem = {
  title: string;
  icon: React.ElementType;
  content: string;
};

export default function TravelNote({ pkg }: Props) {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const items: InfoItem[] = [
    {
      title: "Hotels & Accommodation",
      icon: Hotel,
      content:
        "Accommodation is arranged in the selected hotel category and meal plan discussed at the time of booking. Hotels are normally confirmed before the tour is finalized. If the selected property is unavailable, a similar-category property may be provided, subject to availability.",
    },
    {
      title: "Meals",
      icon: Utensils,
      content:
        "Meals are provided according to the meal plan selected for the package. Only meals specifically mentioned in the itinerary or package inclusions are covered. Any additional meals, beverages or personal food expenses are payable separately.",
    },
    {
      title: "Itinerary Changes",
      icon: Route,
      content:
        "The itinerary is planned around the expected travel time, road conditions and sightseeing schedule. The order or timing of visits may change when required due to weather, road conditions, local restrictions, delays or other circumstances. Unused sightseeing or services caused by delays on the traveller's part are not refundable.",
    },
    {
      title: "Travel Conditions",
      icon: CloudSun,
      content:
        "Mountain travel can be affected by weather, snowfall, landslides, road closures, traffic and local administrative restrictions. Travel times mentioned in the itinerary are approximate and may vary depending on actual road and weather conditions.",
    },
    {
      title: "Transportation",
      icon: Car,
      content:
        "Transportation is provided in the vehicle category selected for the tour and is arranged according to the group size and itinerary. The vehicle, driver and planned route are intended for the services mentioned in the package. Additional transfers, sightseeing or route changes outside the agreed itinerary may involve additional charges.",
    },
    {
      title: "Identity Documents",
      icon: IdCard,
      content:
        "Travellers should carry a valid photo identity document during the journey. Hotels and other service providers may require identification at check-in or whenever required by applicable rules.",
    },
    {
      title: "Entry Fees & Activities",
      icon: Ticket,
      content:
        "Monument, attraction, park, museum, activity and adventure-entry charges are not included unless specifically mentioned in the package inclusions. Such charges are payable separately by the traveller.",
    },
  ];

  return (
    <section
      id="things-to-know"
      className="border-b border-[#10264A]/[0.06] bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-7 sm:py-12 lg:px-8 lg:py-14">
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C89A3D]" />

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#C89A3D]
                "
              >
                Before You Travel
              </p>
            </div>

            <h2
              className="
                mt-2
                font-serif
                text-[28px]
                font-medium
                leading-tight
                text-[#10264A]
                sm:text-[31px]
                lg:text-[34px]
              "
            >
              Things to Know
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-[11px]
              leading-[1.7]
              text-[#536176]
              sm:text-right
              sm:text-[11.5px]
            "
          >
            A few important details to keep in mind when planning
            and travelling with The Himalayan Compass.
          </p>
        </div>

        {/* =========================================================
            INFORMATION PANEL
        ========================================================= */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#10264A]/[0.08]
            bg-white
            shadow-[0_10px_35px_rgba(16,38,74,0.045)]
          "
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openItem === index;

            return (
              <div
                key={item.title}
                className={
                  index !== items.length - 1
                    ? "border-b border-[#10264A]/[0.08]"
                    : ""
                }
              >
                {/* =================================================
                    ROW HEADER
                ================================================= */}

                <button
                  type="button"
                  onClick={() => setOpenItem(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    gap-4
                    px-5
                    py-4
                    text-left
                    transition-colors
                    duration-200
                    hover:bg-[#FAFAF7]
                    sm:px-6
                    sm:py-4.5
                  "
                >
                  {/* ICON */}

                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-200
                      ${
                        isOpen
                          ? "border-[#C89A3D]/30 bg-[#C89A3D]/10 text-[#C89A3D]"
                          : "border-[#10264A]/[0.09] bg-[#F8F8F5] text-[#5C6A7D]"
                      }
                    `}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </span>

                  {/* TITLE */}

                  <span className="min-w-0 flex-1">
                    <span
                      className={`
                        block
                        text-[13.5px]
                        font-semibold
                        leading-5
                        transition-colors
                        duration-200
                        sm:text-[14px]
                        ${
                          isOpen
                            ? "text-[#10264A]"
                            : "text-[#243754]"
                        }
                      `}
                    >
                      {item.title}
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-[#8B7450]
                      "
                    >
                      Important information
                    </span>
                  </span>

                  {/* CHEVRON */}

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
                          : "bg-[#10264A]/[0.04] text-[#647185]"
                      }
                    `}
                  >
                    <ChevronDown
                      size={15}
                      strokeWidth={1.9}
                      className={`
                        transition-transform
                        duration-200
                        ${isOpen ? "rotate-180" : ""}
                      `}
                    />
                  </span>
                </button>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                  className={`
                    grid
                    transition-[grid-template-rows]
                    duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div
                      className="
                        ml-[68px]
                        mr-5
                        pb-6
                        sm:mr-10
                        sm:pb-6
                      "
                    >
                      <div
                        className="
                          border-l-2
                          border-[#C89A3D]/25
                          pl-4
                          sm:pl-5
                        "
                      >
                        <p
                          className="
                            max-w-4xl
                            text-[12.5px]
                            leading-[1.75]
                            text-[#42526A]
                            sm:text-[13px]
                          "
                        >
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* =======================================================
              BOTTOM NOTE
          ======================================================= */}

          <div
            className="
              border-t
              border-[#10264A]/[0.08]
              bg-[#FAFAF7]
              px-5
              py-4
              sm:px-6
            "
          >
            <p
              className="
                text-[10px]
                leading-[1.6]
                text-[#647185]
              "
            >
              Please note that mountain travel is subject to local
              conditions. Specific arrangements may vary according
              to the final confirmed itinerary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}