"use client";

import {
  ChevronDown,
  MapPin,
} from "lucide-react";

import { destinations, type HeroPlannerState } from "@/components/home/planner/useHeroPlanner";

type FieldProps = {
  planner: Pick<
    HeroPlannerState,
    | "destination"
    | "setDestination"
    | "isDestinationOpen"
    | "setIsDestinationOpen"
    | "setIsDateOpen"
    | "setIsTravelersOpen"
    | "setIsChildAgeOpen"
    | "destinationButtonRef"
  >;
};

type PickerProps = {
  planner: Pick<
    HeroPlannerState,
    | "destination"
    | "destinationPosition"
    | "destinationPopupRef"
    | "filteredDestinations"
    | "handleDestinationSelect"
    | "isDestinationOpen"
  >;
};

/* Trigger shown inside the planner bar. */

export function DestinationField({
  planner,
}: FieldProps) {
  const {
    destination,
    setDestination,
    isDestinationOpen,
    setIsDestinationOpen,
    setIsDateOpen,
    setIsTravelersOpen,
    setIsChildAgeOpen,
    destinationButtonRef,
  } = planner;

  return (
          <div className="relative min-w-0 flex-[1.9]">
            <button
              ref={destinationButtonRef}
              type="button"
              onClick={() => {
                setIsDateOpen(false);
                setIsTravelersOpen(false);
                setIsChildAgeOpen(false);
                setIsDestinationOpen(true);
              }}
              className="
                flex
                w-full
                items-center
                gap-2.5
                rounded-xl
                px-3
                py-2.5
                text-left
                transition-all
                duration-200
                hover:bg-[#F7F9FC]
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#EEF4FF]
                "
              >
                <MapPin
                  size={17}
                  strokeWidth={2.3}
                  className="text-[#10264A]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-[#10264A]
                  "
                >
                  Destination
                </p>

                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(
                      e.target.value
                    );

                    setIsDestinationOpen(
                      true
                    );

                    setIsDateOpen(false);
                    setIsTravelersOpen(
                      false
                    );
                  }}
                  onFocus={() => {
                    setIsDestinationOpen(
                      true
                    );

                    setIsDateOpen(false);
                    setIsTravelersOpen(
                      false
                    );
                  }}
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                  placeholder="Where would you like to go?"
                  className="
                    mt-0.5
                    w-full
                    min-w-0
                    truncate
                    bg-transparent
                    text-[14px]
                    font-medium
                    text-[#10264A]
                    outline-none
                    placeholder:text-[#7F8998]
                  "
                />
              </div>

              <ChevronDown
                size={17}
                className={`
                  shrink-0
                  text-[#7F8998]
                  transition-transform
                  duration-200
                  ${
                    isDestinationOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>
          </div>
  );
}

/* Dropdown of matching destinations. */

export default function DestinationPicker({
  planner,
}: PickerProps) {
  const {
    destination,
    destinationPosition,
    destinationPopupRef,
    filteredDestinations,
    handleDestinationSelect,
    isDestinationOpen,
  } = planner;

  if (!isDestinationOpen) {
    return null;
  }

  return (
        <div
          ref={destinationPopupRef}
          style={destinationPosition}
          className="
            z-[60]
            w-[calc(100vw-24px)]
            max-w-[390px]
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-[0_20px_50px_rgba(16,38,74,0.20)]
          "
        >
          <div className="max-h-[300px] overflow-y-auto py-2">

            {filteredDestinations.length > 0 ? (
              filteredDestinations.map(
                (place) => (
                  <button
                    key={place}
                    type="button"
                    onClick={() =>
                      handleDestinationSelect(
                        place
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-5
                      py-3
                      text-left
                      transition-colors
                      duration-200
                      hover:bg-[#F7F9FC]
                    "
                  >
                    <MapPin
                      size={16}
                      strokeWidth={2}
                      className="
                        shrink-0
                        text-[#C89A3D]
                      "
                    />

                    <span
                      className="
                        text-[14px]
                        font-medium
                        text-[#10264A]
                      "
                    >
                      {place}
                    </span>
                  </button>
                )
              )
            ) : (
              <>
                <div className="px-5 py-4">
                  <p
                    className="
                      text-[13px]
                      font-medium
                      leading-5
                      text-[#10264A]
                    "
                  >
                    No destination matching{" "}
                    <span className="font-semibold">
                      &quot;{destination.trim()}&quot;
                    </span>{" "}
                    was found.
                  </p>
                </div>

                {destination.trim() && (
                  <button
                    type="button"
                    onClick={() =>
                      handleDestinationSelect(
                        destination.trim()
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      border-t
                      border-gray-100
                      px-5
                      py-3.5
                      text-left
                      transition-colors
                      duration-200
                      hover:bg-[#F7F9FC]
                    "
                  >
                    <MapPin
                      size={17}
                      strokeWidth={2}
                      className="text-[#C89A3D]"
                    />

                    <div>
                      <p
                        className="
                          text-[13px]
                          font-semibold
                          text-[#10264A]
                        "
                      >
                        Search &quot;{destination.trim()}&quot;
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[11px]
                          text-gray-400
                        "
                      >
                        Search our journeys for this
                        destination
                      </p>
                    </div>
                  </button>
                )}
              </>
            )}

            {destination.trim() &&
              filteredDestinations.length > 0 &&
              !destinations.some(
                (place) =>
                  place.toLowerCase() ===
                  destination
                    .trim()
                    .toLowerCase()
              ) && (
                <button
                  type="button"
                  onClick={() =>
                    handleDestinationSelect(
                      destination.trim()
                    )
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    border-t
                    border-gray-100
                    px-5
                    py-3.5
                    text-left
                    transition-colors
                    duration-200
                    hover:bg-[#F7F9FC]
                  "
                >
                  <MapPin
                    size={17}
                    strokeWidth={2}
                    className="text-[#C89A3D]"
                  />

                  <div>
                    <p
                      className="
                        text-[13px]
                        font-semibold
                        text-[#10264A]
                      "
                    >
                      Search &quot;{destination.trim()}&quot;
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[11px]
                        text-gray-400
                      "
                    >
                      Search our available journeys
                    </p>
                  </div>
                </button>
              )}
          </div>
        </div>
  );
}
