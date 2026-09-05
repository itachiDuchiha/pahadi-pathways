"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const destinations = [
  "Shimla",
  "Manali",
  "Spiti Valley",
  "Dharamshala",
  "Jibhi",
  "Kasol",
  "Tirthan Valley",
  "Kufri",
  "Chitkul",
  "Kinnaur",
  "Dalhousie",
  "McLeod Ganj",
  "Kasauli",
  "Manikaran",
  "Malana",
  "Narkanda",
];

const popularDestinations = [
  "Shimla",
  "Manali",
  "Spiti Valley",
  "Dharamshala",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const childAges = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function HeroPlanner() {
  /* =========================================================
     DESTINATION
  ========================================================= */

  const [destination, setDestination] = useState("");
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);

  /* =========================================================
     DATE
  ========================================================= */

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  /* =========================================================
     TRAVELERS
  ========================================================= */

  const [isTravelersOpen, setIsTravelersOpen] = useState(false);

  const [adults, setAdults] = useState(1);

  /*
    Each number represents one child's age.

    Example:
    [4, 7, 10]

    means:
    3 children:
    - 4 years
    - 7 years
    - 10 years
  */
  const [children, setChildren] = useState<number[]>([]);

  const [isChildAgeOpen, setIsChildAgeOpen] = useState(false);

  /* =========================================================
     CALENDAR POSITION
  ========================================================= */

  const [calendarPosition, setCalendarPosition] = useState({
    top: 0,
    left: 0,
  });

  /* =========================================================
     TRAVELER POPUP POSITION
  ========================================================= */

  const [travelerPosition, setTravelerPosition] = useState({
    top: 0,
    left: 0,
  });

  /* =========================================================
     REFS
  ========================================================= */

  const plannerRef = useRef<HTMLDivElement>(null);

  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const travelerButtonRef = useRef<HTMLButtonElement>(null);
  const travelerPopupRef = useRef<HTMLDivElement>(null);

  /* =========================================================
     FILTER DESTINATIONS
  ========================================================= */

  const filteredDestinations = destination.trim()
    ? destinations.filter((place) =>
        place.toLowerCase().includes(destination.toLowerCase())
      )
    : popularDestinations;

  /* =========================================================
     CALENDAR POSITION CALCULATION
  ========================================================= */

  const updateCalendarPosition = () => {
    if (!dateButtonRef.current) return;

    const buttonRect =
      dateButtonRef.current.getBoundingClientRect();

    const calendarWidth = 300;
    const gap = 8;
    const viewportPadding = 12;

    const calendarHeight =
      calendarRef.current?.getBoundingClientRect().height ?? 270;

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    const openUp =
      spaceBelow < calendarHeight + gap &&
      spaceAbove >= calendarHeight + gap;

    let top = openUp
      ? buttonRect.top - calendarHeight - gap
      : buttonRect.bottom + gap;

    top = Math.max(
      viewportPadding,
      Math.min(
        top,
        window.innerHeight -
          calendarHeight -
          viewportPadding
      )
    );

    let left = buttonRect.left;

    left = Math.max(
      viewportPadding,
      Math.min(
        left,
        window.innerWidth -
          calendarWidth -
          viewportPadding
      )
    );

    setCalendarPosition({
      top,
      left,
    });
  };

  /* =========================================================
     TRAVELER POPUP POSITION CALCULATION
  ========================================================= */

  const updateTravelerPosition = () => {
    if (!travelerButtonRef.current) return;

    const buttonRect =
      travelerButtonRef.current.getBoundingClientRect();

    const popupWidth = 300;
    const gap = 8;
    const viewportPadding = 12;

    /*
      Measure the REAL popup height.

      This is important because the popup changes
      when "Add a Child" is opened.
    */
    const popupHeight =
      travelerPopupRef.current?.getBoundingClientRect().height ??
      250;

    const spaceBelow =
      window.innerHeight - buttonRect.bottom;

    const spaceAbove = buttonRect.top;

    /*
      Open upward if below doesn't have enough room
      and above does.
    */
    const openUp =
      spaceBelow < popupHeight + gap &&
      spaceAbove >= popupHeight + gap;

    let top = openUp
      ? buttonRect.top - popupHeight - gap
      : buttonRect.bottom + gap;

    /*
      Keep popup inside viewport.
    */
    top = Math.max(
      viewportPadding,
      Math.min(
        top,
        window.innerHeight -
          popupHeight -
          viewportPadding
      )
    );

    /*
      Align with Travelers button.
    */
    let left = buttonRect.left;

    left = Math.max(
      viewportPadding,
      Math.min(
        left,
        window.innerWidth -
          popupWidth -
          viewportPadding
      )
    );

    setTravelerPosition({
      top,
      left,
    });
  };

  /* =========================================================
     OPEN DATE CALENDAR
  ========================================================= */

  const handleDateOpen = () => {
    setIsDestinationOpen(false);
    setIsTravelersOpen(false);
    setIsDateOpen((prev) => !prev);
  };

  /* =========================================================
     OPEN TRAVELERS
  ========================================================= */

  const handleTravelersOpen = () => {
    setIsDestinationOpen(false);
    setIsDateOpen(false);
    setIsTravelersOpen((prev) => !prev);
  };

  /* =========================================================
     UPDATE CALENDAR POSITION
  ========================================================= */

  useEffect(() => {
    if (!isDateOpen) return;

    requestAnimationFrame(() => {
      updateCalendarPosition();
    });

    const handlePositionUpdate = () => {
      updateCalendarPosition();
    };

    window.addEventListener(
      "resize",
      handlePositionUpdate
    );

    window.addEventListener(
      "scroll",
      handlePositionUpdate,
      true
    );

    return () => {
      window.removeEventListener(
        "resize",
        handlePositionUpdate
      );

      window.removeEventListener(
        "scroll",
        handlePositionUpdate,
        true
      );
    };
  }, [isDateOpen, calendarMonth]);

  /* =========================================================
     UPDATE TRAVELER POSITION
  ========================================================= */

  useEffect(() => {
    if (!isTravelersOpen) return;

    /*
      Wait until popup has rendered.
    */
    requestAnimationFrame(() => {
      updateTravelerPosition();
    });

    const handlePositionUpdate = () => {
      updateTravelerPosition();
    };

    window.addEventListener(
      "resize",
      handlePositionUpdate
    );

    window.addEventListener(
      "scroll",
      handlePositionUpdate,
      true
    );

    return () => {
      window.removeEventListener(
        "resize",
        handlePositionUpdate
      );

      window.removeEventListener(
        "scroll",
        handlePositionUpdate,
        true
      );
    };
  }, [
    isTravelersOpen,
    isChildAgeOpen,
    children.length,
  ]);

  /* =========================================================
     CLOSE WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        plannerRef.current &&
        !plannerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsDestinationOpen(false);
        setIsDateOpen(false);
        setIsTravelersOpen(false);
        setIsChildAgeOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================================
     DESTINATION SELECT
  ========================================================= */

  const handleDestinationSelect = (place: string) => {
    setDestination(place);
    setIsDestinationOpen(false);
  };

  /* =========================================================
     DATE HELPERS
  ========================================================= */

  const formatDate = (date: Date) => {
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const isSameDate = (
    date1: Date,
    date2: Date
  ) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isPastDate = (date: Date) => {
    const checkDate = new Date(date);

    checkDate.setHours(0, 0, 0, 0);

    return checkDate < today;
  };

  /* =========================================================
     GENERATE CALENDAR DAYS
  ========================================================= */

  const getCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(
      year,
      month,
      1
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push(
        new Date(year, month, day)
      );
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  /* =========================================================
     MONTH NAVIGATION
  ========================================================= */

  const goToPreviousMonth = () => {
    const previousMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() - 1,
      1
    );

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previousMonth >= currentMonth) {
      setCalendarMonth(previousMonth);
    }
  };

  const goToNextMonth = () => {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + 1,
        1
      )
    );
  };

  /* =========================================================
     SELECT DATE
  ========================================================= */

  const handleDateSelect = (date: Date) => {
    if (isPastDate(date)) return;

    setStartDate(date);
    setIsDateOpen(false);
  };

  /* =========================================================
     ADULT CONTROLS
  ========================================================= */

  const decreaseAdults = () => {
    setAdults((current) =>
      Math.max(1, current - 1)
    );
  };

  const increaseAdults = () => {
    setAdults((current) =>
      Math.min(10, current + 1)
    );
  };

  /* =========================================================
     CHILD AGE SELECT
  ========================================================= */

  const handleChildAgeSelect = (age: number) => {
    setChildren((current) => [
      ...current,
      age,
    ]);

    /*
      Close the age list after selecting
      one child.
    */
    setIsChildAgeOpen(false);
  };

  /* =========================================================
     REMOVE CHILD
  ========================================================= */

  const removeChild = (index: number) => {
    setChildren((current) =>
      current.filter(
        (_, childIndex) =>
          childIndex !== index
      )
    );
  };

  /* =========================================================
     DISPLAY DATE
  ========================================================= */

  const displayedDate = startDate
    ? formatDate(startDate)
    : "Select Date";

  /* =========================================================
     DISPLAY TRAVELERS
  ========================================================= */

  const travelerLabel = `${adults} ${
    adults === 1 ? "Adult" : "Adults"
  }`;

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div
        onClick={() => {
          setIsDestinationOpen(false);
          setIsDateOpen(false);
          setIsTravelersOpen(false);
          setIsChildAgeOpen(false);
        }}
        className={`
          fixed
          inset-0
          z-20
          bg-[#071426]/35
          backdrop-blur-[1px]
          transition-all
          duration-300
          ${
            isDestinationOpen ||
            isDateOpen ||
            isTravelersOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          PLANNER
      ===================================================== */}

      <section
        ref={plannerRef}
        className="
          relative
          z-30
          mb-2
          hidden
          md:block
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            rounded-[20px]
            border
            border-white/80
            bg-white
            px-4
            py-2
            shadow-[0_25px_65px_rgba(16,38,74,0.18)]
          "
        >
          {/* =================================================
              DESTINATION
          ================================================= */}

          <div className="relative flex-[2.15] min-w-0">
            <button
              type="button"
              onClick={() => {
                setIsDateOpen(false);
                setIsTravelersOpen(false);
                setIsDestinationOpen(true);
              }}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-5
                py-3
                text-left
                transition-all
                duration-300
                hover:bg-[#F7F9FC]
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
                  bg-[#EEF4FF]
                "
              >
                <MapPin
                  size={18}
                  strokeWidth={2.3}
                  className="text-[#10264A]"
                />
              </div>

              {/* TEXT / INPUT */}

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-[#7A7F87]
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

                    setIsDestinationOpen(true);
                    setIsDateOpen(false);
                    setIsTravelersOpen(false);
                  }}
                  onFocus={() => {
                    setIsDestinationOpen(true);
                    setIsDateOpen(false);
                    setIsTravelersOpen(false);
                  }}
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                  placeholder="Where would you like to go?"
                  className="
                    mt-0.5
                    w-full
                    min-w-0
                    bg-transparent
                    text-[14px]
                    font-medium
                    text-[#10264A]
                    outline-none
                    placeholder:text-[#9AA3B1]
                  "
                />
              </div>

              {/* CHEVRON */}

              <ChevronDown
                size={18}
                className={`
                  shrink-0
                  text-gray-400
                  transition-transform
                  duration-300
                  ${
                    isDestinationOpen
                      ? "rotate-180"
                      : "rotate-0"
                  }
                `}
              />
            </button>

            {/* =================================================
                DESTINATION DROPDOWN
            ================================================= */}

            {isDestinationOpen && (
              <div
                className="
                  absolute
                  left-0
                  top-[calc(100%+8px)]
                  z-50
                  w-full
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
                            "{destination.trim()}"
                          </span>{" "}
                          was found.
                        </p>
                      </div>

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
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#EEF4FF]
                          "
                        >
                          <MapPin
                            size={17}
                            strokeWidth={2}
                            className="text-[#C89A3D]"
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              text-[13px]
                              font-semibold
                              text-[#10264A]
                            "
                          >
                            Search "
                            {destination.trim()}
                            "
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-[11px]
                              text-gray-400
                            "
                          >
                            Use your entered
                            destination
                          </p>
                        </div>
                      </button>
                    </>
                  )}

                  {/* CUSTOM DESTINATION */}

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
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#EEF4FF]
                          "
                        >
                          <MapPin
                            size={17}
                            strokeWidth={2}
                            className="text-[#C89A3D]"
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              text-[13px]
                              font-semibold
                              text-[#10264A]
                            "
                          >
                            Search "
                            {destination.trim()}
                            "
                          </p>

                          <p
                            className="
                              mt-0.5
                              truncate
                              text-[11px]
                              text-gray-400
                            "
                          >
                            Use your entered
                            destination
                          </p>
                        </div>
                      </button>
                    )}
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="h-10 w-px bg-gray-200" />

          {/* =================================================
              START DATE
          ================================================= */}

          <button
            ref={dateButtonRef}
            type="button"
            onClick={handleDateOpen}
            className={`
              flex
              flex-[1.15]
              items-center
              gap-3
              rounded-xl
              px-5
              py-3
              text-left
              transition-all
              duration-300
              hover:bg-[#F7F9FC]
              ${
                isDateOpen
                  ? "bg-[#F7F9FC]"
                  : ""
              }
            `}
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
                bg-[#EEF4FF]
              "
            >
              <CalendarDays
                size={18}
                strokeWidth={2.3}
                className="text-[#10264A]"
              />
            </div>

            {/* TEXT */}

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#7A7F87]
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

            {/* CHEVRON */}

            <ChevronDown
              size={18}
              className={`
                shrink-0
                text-gray-400
                transition-transform
                duration-300
                ${
                  isDateOpen
                    ? "rotate-180"
                    : "rotate-0"
                }
              `}
            />
          </button>

          {/* =================================================
              CALENDAR
          ================================================= */}

          {isDateOpen && (
            <div
              ref={calendarRef}
              style={{
                position: "fixed",
                top: `${calendarPosition.top}px`,
                left: `${calendarPosition.left}px`,
              }}
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
              {/* MONTH HEADER */}

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
                    transition-colors
                    hover:bg-[#F7F9FC]
                    disabled:cursor-not-allowed
                    disabled:text-gray-300
                  "
                >
                  <ChevronLeft size={17} />
                </button>

                <p
                  className="
                    text-[13px]
                    font-bold
                    text-[#10264A]
                  "
                >
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
                    transition-colors
                    hover:bg-[#F7F9FC]
                  "
                >
                  <ChevronRight size={17} />
                </button>
              </div>

              {/* WEEK DAYS */}

              <div
                className="
                  mt-4
                  grid
                  grid-cols-7
                  text-center
                "
              >
                {weekDays.map(
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

              {/* CALENDAR DAYS */}

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
          )}

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="h-10 w-px bg-gray-200" />

          {/* =================================================
              TRAVELERS
          ================================================= */}

          <button
            ref={travelerButtonRef}
            type="button"
            onClick={handleTravelersOpen}
            className={`
              flex
              flex-[1.15]
              items-center
              gap-3
              rounded-xl
              px-5
              py-3
              text-left
              transition-all
              duration-300
              hover:bg-[#F7F9FC]
              ${
                isTravelersOpen
                  ? "bg-[#F7F9FC]"
                  : ""
              }
            `}
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
                bg-[#EEF4FF]
              "
            >
              <Users
                size={18}
                strokeWidth={2.3}
                className="text-[#10264A]"
              />
            </div>

            {/* TEXT */}

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#7A7F87]
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

            {/* CHEVRON */}

            <ChevronDown
              size={18}
              className={`
                shrink-0
                text-gray-400
                transition-transform
                duration-300
                ${
                  isTravelersOpen
                    ? "rotate-180"
                    : "rotate-0"
                }
              `}
            />
          </button>

          {/* =================================================
              TRAVELER POPUP
          ================================================= */}

          {isTravelersOpen && (
            <div
              ref={travelerPopupRef}
              style={{
                position: "fixed",
                top: `${travelerPosition.top}px`,
                left: `${travelerPosition.left}px`,
              }}
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
              {/* =================================================
                  ADULTS
              ================================================= */}

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
                <p
                  className="
                    text-[14px]
                    font-semibold
                    text-[#10264A]
                  "
                >
                  Adults
                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
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
                      transition-all
                      hover:bg-[#F7F9FC]
                      disabled:cursor-not-allowed
                      disabled:text-gray-300
                    "
                  >
                    <Minus size={15} />
                  </button>

                  <span
                    className="
                      w-5
                      text-center
                      text-[14px]
                      font-semibold
                      text-[#10264A]
                    "
                  >
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
                      transition-all
                      hover:bg-[#F7F9FC]
                      disabled:cursor-not-allowed
                      disabled:text-gray-300
                    "
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* =================================================
                  CHILDREN
              ================================================= */}

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
                <p
                  className="
                    text-[14px]
                    font-semibold
                    text-[#10264A]
                  "
                >
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

              {/* =================================================
                  SELECTED CHILDREN
              ================================================= */}

              {children.length > 0 && (
                <div
                  className="
                    border-b
                    border-gray-100
                    px-5
                    py-3
                  "
                >
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
                              removeChild(
                                index
                              )
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

              {/* =================================================
                  ADD CHILD
              ================================================= */}

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
                    transition-colors
                    hover:bg-[#F7F9FC]
                  "
                >
                  <span
                    className="
                      text-[13px]
                      font-medium
                      text-[#10264A]
                    "
                  >
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
                          : "rotate-0"
                      }
                    `}
                  />
                </button>

                {/* =================================================
                    CHILD AGE LIST

                    IMPORTANT:
                    - max height prevents giant popup
                    - overflow-y-auto makes ALL ages scrollable
                    - overflow-x-hidden prevents horizontal issues
                    - z-index keeps list above popup
                ================================================= */}

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
                              transition-colors
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
          )}

          {/* =================================================
              SEARCH
          ================================================= */}

          <button
            type="button"
            className="
              ml-3
              shrink-0
              rounded-xl
              bg-[#C89A3D]
              px-10
              py-3
              text-[14px]
              font-bold
              text-[#10264A]
              shadow-[0_8px_20px_rgba(200,154,61,0.25)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#D9B255]
              hover:shadow-[0_12px_25px_rgba(200,154,61,0.30)]
            "
          >
            Search
          </button>
        </div>
      </section>
    </>
  );
}