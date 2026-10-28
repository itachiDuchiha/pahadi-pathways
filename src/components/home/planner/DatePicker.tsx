"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { monthNames, type HeroPlannerState } from "@/components/home/planner/useHeroPlanner";

type FieldProps = {
  planner: Pick<
    HeroPlannerState,
    | "isDateOpen"
    | "dateButtonRef"
    | "handleDateOpen"
    | "displayedDate"
  >;
};

type PickerProps = {
  planner: Pick<
    HeroPlannerState,
    | "startDate"
    | "today"
    | "calendarMonth"
    | "calendarPosition"
    | "calendarRef"
    | "isSameDate"
    | "isPastDate"
    | "calendarDays"
    | "goToPreviousMonth"
    | "goToNextMonth"
    | "handleDateSelect"
    | "isDateOpen"
  >;
};

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

/* Trigger shown inside the planner bar. */

export function DateField({
  planner,
}: FieldProps) {
  const {
    isDateOpen,
    dateButtonRef,
    handleDateOpen,
    displayedDate,
  } = planner;

  return (
          <button
            ref={dateButtonRef}
            type="button"
            onClick={handleDateOpen}
            className={`
              flex
              min-w-0
              flex-[1.25]
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
                isDateOpen
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
              <CalendarDays
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
                Start Date
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
                {displayedDate}
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
                  isDateOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>
  );
}

/* Calendar popup. */

export default function DatePicker({
  planner,
}: PickerProps) {
  const {
    startDate,
    today,
    calendarMonth,
    calendarPosition,
    calendarRef,
    isSameDate,
    isPastDate,
    calendarDays,
    goToPreviousMonth,
    goToNextMonth,
    handleDateSelect,
    isDateOpen,
  } = planner;

  if (!isDateOpen) {
    return null;
  }

  return (
        <div
          ref={calendarRef}
          style={calendarPosition}
          className="
            z-[60]
            w-[300px]
            rounded-2xl
            border
            border-gray-100
            bg-white
            px-4
            py-3.5
            shadow-[0_20px_50px_rgba(16,38,74,0.20)]
          "
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousMonth}
              disabled={
                calendarMonth.getFullYear() ===
                  today.getFullYear() &&
                calendarMonth.getMonth() ===
                  today.getMonth()
              }
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-[#10264A]
                hover:bg-[#F7F9FC]
                disabled:cursor-not-allowed
                disabled:text-gray-300
              "
            >
              <ChevronLeft size={17} />
            </button>

            <p className="text-[13px] font-bold text-[#10264A]">
              {monthNames[
                calendarMonth.getMonth()
              ]}{" "}
              {calendarMonth.getFullYear()}
            </p>

            <button
              type="button"
              onClick={goToNextMonth}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-[#10264A]
                hover:bg-[#F7F9FC]
              "
            >
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 text-center">
            {weekDays.map(
              // Positional: weekDays has duplicate single-letter labels (e.g. "S", "T"), so only the index is stable.
              (day, index) => (
                <span
                  key={index}
                  className="
                    text-[9px]
                    font-bold
                    text-gray-400
                  "
                >
                  {day}
                </span>
              )
            )}
          </div>

          <div
            className="
              mt-2
              grid
              grid-cols-7
              gap-y-1
              text-center
            "
          >
            {calendarDays.map(
              (date, index) => {
                if (!date) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="h-9"
                    />
                  );
                }

                const disabled =
                  isPastDate(date);

                const selected =
                  startDate &&
                  isSameDate(
                    date,
                    startDate
                  );

                const isToday =
                  isSameDate(
                    date,
                    today
                  );

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      handleDateSelect(
                        date
                      )
                    }
                    className={`
                      relative
                      mx-auto
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      text-[11px]
                      font-medium
                      transition-all
                      duration-150
                      ${
                        selected
                          ? "bg-[#C89A3D] text-[#10264A]"
                          : disabled
                          ? "cursor-not-allowed text-gray-300"
                          : "text-[#10264A] hover:bg-[#F7F9FC]"
                      }
                    `}
                  >
                    {date.getDate()}

                    {isToday &&
                      !selected && (
                        <span
                          className="
                            absolute
                            bottom-0.5
                            h-1
                            w-1
                            rounded-full
                            bg-[#C89A3D]
                          "
                        />
                      )}
                  </button>
                );
              }
            )}
          </div>
        </div>
  );
}
