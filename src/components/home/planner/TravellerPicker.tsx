"use client";

import {
  ChevronDown,
  Minus,
  Plus,
  Users,
} from "lucide-react";

import type { HeroPlannerState } from "@/components/home/planner/useHeroPlanner";

type FieldProps = {
  planner: Pick<
    HeroPlannerState,
    | "isTravelersOpen"
    | "children"
    | "travelerButtonRef"
    | "handleTravelersOpen"
    | "travelerLabel"
  >;
};

type PickerProps = {
  planner: Pick<
    HeroPlannerState,
    | "adults"
    | "children"
    | "isChildAgeOpen"
    | "setIsChildAgeOpen"
    | "travelerPosition"
    | "travelerPopupRef"
    | "decreaseAdults"
    | "increaseAdults"
    | "handleChildAgeSelect"
    | "removeChild"
    | "isTravelersOpen"
  >;
};

const childAges = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/* Trigger shown inside the planner bar. */

export function TravellerField({
  planner,
}: FieldProps) {
  const {
    isTravelersOpen,
    children,
    travelerButtonRef,
    handleTravelersOpen,
    travelerLabel,
  } = planner;

  return (
          <button
            ref={travelerButtonRef}
            type="button"
            onClick={handleTravelersOpen}
            className={`
              flex
              min-w-0
              flex-[1.12]
              items-center
              gap-2.5
              rounded-xl
              px-3.5
              py-2.5
              text-left
              transition-all
              duration-200
              hover:bg-[#F7F9FC]
              ${
                isTravelersOpen
                  ? "bg-[#F7F9FC]"
                  : ""
              }
            `}
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
              <Users
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
                Travelers
              </p>

              <p
                className="
                  mt-0.5
                  whitespace-nowrap
                  text-[14px]
                  font-medium
                  text-[#10264A]
                "
              >
                {travelerLabel}

                {children.length > 0 &&
                  `, ${children.length} ${
                    children.length === 1
                      ? "Child"
                      : "Children"
                  }`}
              </p>
            </div>

            <ChevronDown
              size={17}
              className={`
                shrink-0
                text-[#7F8998]
                transition-transform
                duration-200
                ${
                  isTravelersOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>
  );
}

/* Adults and children popup. */

export default function TravellerPicker({
  planner,
}: PickerProps) {
  const {
    adults,
    children,
    isChildAgeOpen,
    setIsChildAgeOpen,
    travelerPosition,
    travelerPopupRef,
    decreaseAdults,
    increaseAdults,
    handleChildAgeSelect,
    removeChild,
    isTravelersOpen,
  } = planner;

  if (!isTravelersOpen) {
    return null;
  }

  return (
        <div
          ref={travelerPopupRef}
          style={travelerPosition}
          className="
            z-[60]
            w-[300px]
            overflow-visible
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-[0_20px_50px_rgba(16,38,74,0.20)]
          "
        >
          {/* ADULTS */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-100
              px-5
              py-4
            "
          >
            <p className="text-[14px] font-semibold text-[#10264A]">
              Adults
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseAdults();
                }}
                disabled={adults <= 1}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  text-[#10264A]
                  hover:bg-[#F7F9FC]
                  disabled:cursor-not-allowed
                  disabled:text-gray-300
                "
              >
                <Minus size={15} />
              </button>

              <span className="w-5 text-center text-[14px] font-semibold text-[#10264A]">
                {adults}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseAdults();
                }}
                disabled={adults >= 10}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  text-[#10264A]
                  hover:bg-[#F7F9FC]
                  disabled:cursor-not-allowed
                  disabled:text-gray-300
                "
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* CHILDREN */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-100
              px-5
              py-4
            "
          >
            <p className="text-[14px] font-semibold text-[#10264A]">
              Children
            </p>

            <span
              className="
                flex
                h-7
                min-w-7
                items-center
                justify-center
                rounded-full
                bg-[#EEF4FF]
                px-2
                text-[12px]
                font-semibold
                text-[#10264A]
              "
            >
              {children.length}
            </span>
          </div>

          {/* SELECTED CHILDREN */}

          {children.length > 0 && (
            <div className="border-b border-gray-100 px-5 py-3">
              <div className="flex flex-wrap gap-2">
                {children.map(
                  (age, index) => (
                    <div
                      key={`${age}-${index}`}
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-lg
                        bg-[#F7F9FC]
                        px-2.5
                        py-1.5
                        text-[11px]
                        font-medium
                        text-[#10264A]
                      "
                    >
                      <span>
                        {age} years
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeChild(index)
                        }
                        className="
                          flex
                          h-4
                          w-4
                          items-center
                          justify-center
                          rounded-full
                          text-gray-400
                          hover:bg-white
                          hover:text-[#10264A]
                        "
                      >
                        ×
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* ADD CHILD */}

          <div className="relative px-4 py-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsChildAgeOpen(
                  (current) => !current
                );
              }}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
                text-left
                hover:bg-[#F7F9FC]
              "
            >
              <span className="text-[13px] font-medium text-[#10264A]">
                Add a Child
              </span>

              <ChevronDown
                size={16}
                className={`
                  text-gray-400
                  transition-transform
                  duration-200
                  ${
                    isChildAgeOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {/* CHILD AGE LIST */}

            {isChildAgeOpen && (
              <div
                className="
                  absolute
                  left-4
                  right-4
                  top-[calc(100%-4px)]
                  z-[80]
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  shadow-[0_15px_35px_rgba(16,38,74,0.18)]
                "
              >
                <div
                  className="
                    max-h-[192px]
                    overflow-y-auto
                    overscroll-contain
                    py-1
                  "
                >
                  {childAges.map(
                    (age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() =>
                          handleChildAgeSelect(
                            age
                          )
                        }
                        className="
                          flex
                          w-full
                          items-center
                          px-4
                          py-2.5
                          text-left
                          text-[13px]
                          font-medium
                          text-[#10264A]
                          hover:bg-[#F7F9FC]
                        "
                      >
                        {age} years
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
  );
}
