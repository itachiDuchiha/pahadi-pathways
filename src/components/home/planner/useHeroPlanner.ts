import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const destinations = [
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
  "Kaza",
];

const popularDestinations = [
  "Shimla",
  "Manali",
  "Spiti Valley",
  "Dharamshala",
];

export const monthNames = [
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

/* =========================================================
   HERO PLANNER STATE

   Selections, popup visibility and positions, and the
   handlers shared by the planner bar and its popups.
========================================================= */

export function useHeroPlanner() {
  const router = useRouter();

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

  // Safe to compute on every render: it only drives the calendar popup,
  // which is gated behind `isDateOpen` (starts `false`) and never part of
  // the initial server-rendered markup, so there is no hydration mismatch.
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
  const [children, setChildren] = useState<number[]>([]);
  const [isChildAgeOpen, setIsChildAgeOpen] = useState(false);

  /* =========================================================
     DESTINATION POPUP POSITION
  ========================================================= */

  const [destinationPosition, setDestinationPosition] = useState({
    top: 0,
    left: 0,
  });

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

  const destinationButtonRef =
    useRef<HTMLButtonElement>(null);

  const destinationPopupRef =
    useRef<HTMLDivElement>(null);

  const dateButtonRef =
    useRef<HTMLButtonElement>(null);

  const calendarRef =
    useRef<HTMLDivElement>(null);

  const travelerButtonRef =
    useRef<HTMLButtonElement>(null);

  const travelerPopupRef =
    useRef<HTMLDivElement>(null);

  /* =========================================================
     FILTER DESTINATIONS
  ========================================================= */

  const filteredDestinations = destination.trim()
    ? destinations.filter((place) =>
        place
          .toLowerCase()
          .includes(destination.toLowerCase())
      )
    : popularDestinations;

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = () => {
    const cleanDestination = destination.trim();

    const params = new URLSearchParams();

    if (cleanDestination) {
      params.set("destination", cleanDestination);
    }

    if (startDate) {
      const year = startDate.getFullYear();
      const month = String(
        startDate.getMonth() + 1
      ).padStart(2, "0");
      const day = String(
        startDate.getDate()
      ).padStart(2, "0");

      params.set(
        "date",
        `${year}-${month}-${day}`
      );
    }

    params.set("adults", String(adults));

    if (children.length > 0) {
      params.set(
        "children",
        children.join(",")
      );
    }

    router.push(
      `/packages?${params.toString()}`
    );

    closeAllPopups();
  };

  /* =========================================================
     CLOSE ALL
  ========================================================= */

  const closeAllPopups = () => {
    setIsDestinationOpen(false);
    setIsDateOpen(false);
    setIsTravelersOpen(false);
    setIsChildAgeOpen(false);
  };

  /* =========================================================
     DESTINATION POSITION
  ========================================================= */

  const updateDestinationPosition = () => {
    if (!destinationButtonRef.current) return;

    const buttonRect =
      destinationButtonRef.current.getBoundingClientRect();

    const popupWidth =
      buttonRect.width;

    const gap = 8;
    const viewportPadding = 12;

    const popupHeight =
      destinationPopupRef.current?.getBoundingClientRect()
        .height ?? 300;

    const spaceBelow =
      window.innerHeight -
      buttonRect.bottom;

    const spaceAbove = buttonRect.top;

    /*
      Open upward when there isn't enough room below
      but there is enough room above.
    */
    const openUp =
      spaceBelow <
        popupHeight + gap &&
      spaceAbove >=
        popupHeight + gap;

    let top = openUp
      ? buttonRect.top -
        popupHeight -
        gap
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

    setDestinationPosition({
      top,
      left,
    });
  };

  /* =========================================================
     CALENDAR POSITION
  ========================================================= */

  const updateCalendarPosition = () => {
    if (!dateButtonRef.current) return;

    const buttonRect =
      dateButtonRef.current.getBoundingClientRect();

    const calendarWidth = 300;
    const gap = 8;
    const viewportPadding = 12;

    const calendarHeight =
      calendarRef.current?.getBoundingClientRect()
        .height ?? 270;

    const spaceBelow =
      window.innerHeight -
      buttonRect.bottom;

    const spaceAbove = buttonRect.top;

    const openUp =
      spaceBelow <
        calendarHeight + gap &&
      spaceAbove >=
        calendarHeight + gap;

    let top = openUp
      ? buttonRect.top -
        calendarHeight -
        gap
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
     TRAVELER POPUP POSITION
  ========================================================= */

  const updateTravelerPosition = () => {
    if (!travelerButtonRef.current) return;

    const buttonRect =
      travelerButtonRef.current.getBoundingClientRect();

    const popupWidth = 300;
    const gap = 8;
    const viewportPadding = 12;

    const popupHeight =
      travelerPopupRef.current?.getBoundingClientRect()
        .height ?? 250;

    const spaceBelow =
      window.innerHeight -
      buttonRect.bottom;

    const spaceAbove = buttonRect.top;

    const openUp =
      spaceBelow <
        popupHeight + gap &&
      spaceAbove >=
        popupHeight + gap;

    let top = openUp
      ? buttonRect.top -
        popupHeight -
        gap
      : buttonRect.bottom + gap;

    top = Math.max(
      viewportPadding,
      Math.min(
        top,
        window.innerHeight -
          popupHeight -
          viewportPadding
      )
    );

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
     OPEN DATE
  ========================================================= */

  const handleDateOpen = () => {
    setIsDestinationOpen(false);
    setIsTravelersOpen(false);
    setIsChildAgeOpen(false);
    setIsDateOpen((prev) => !prev);
  };

  /* =========================================================
     OPEN TRAVELERS
  ========================================================= */

  const handleTravelersOpen = () => {
    setIsDestinationOpen(false);
    setIsDateOpen(false);
    setIsChildAgeOpen(false);
    setIsTravelersOpen((prev) => !prev);
  };

  /* =========================================================
     DESTINATION POSITION EFFECT
  ========================================================= */

  useEffect(() => {
    if (!isDestinationOpen) return;

    requestAnimationFrame(() => {
      updateDestinationPosition();
    });

    const handlePositionUpdate = () => {
      updateDestinationPosition();
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
    isDestinationOpen,
    destination,
  ]);

  /* =========================================================
     CALENDAR POSITION EFFECT
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
  }, [
    isDateOpen,
    calendarMonth,
  ]);

  /* =========================================================
     TRAVELER POSITION EFFECT
  ========================================================= */

  useEffect(() => {
    if (!isTravelersOpen) return;

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
     CLOSE OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const target = event.target as Node;

      const clickedInsidePlanner =
        plannerRef.current?.contains(target);

      const clickedInsideDestinationPopup =
        destinationPopupRef.current?.contains(target);

      const clickedInsideCalendar =
        calendarRef.current?.contains(target);

      const clickedInsideTravelerPopup =
        travelerPopupRef.current?.contains(target);

      /*
        Popups are rendered outside the planner section,
        so they must also be treated as "inside".

        Without these checks, clicking any option inside
        a popup triggers closeAllPopups() immediately.
      */
      if (
        clickedInsidePlanner ||
        clickedInsideDestinationPopup ||
        clickedInsideCalendar ||
        clickedInsideTravelerPopup
      ) {
        return;
      }

      closeAllPopups();
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

  const handleDestinationSelect = (
    place: string
  ) => {
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
      date1.getFullYear() ===
        date2.getFullYear() &&
      date1.getMonth() ===
        date2.getMonth() &&
      date1.getDate() ===
        date2.getDate()
    );
  };

  const isPastDate = (date: Date) => {
    const checkDate = new Date(date);

    checkDate.setHours(0, 0, 0, 0);

    return checkDate < today;
  };

  /* =========================================================
     CALENDAR DAYS
  ========================================================= */

  const getCalendarDays = () => {
    const year =
      calendarMonth.getFullYear();

    const month =
      calendarMonth.getMonth();

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

    for (
      let i = 0;
      i < firstDay;
      i++
    ) {
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

  const calendarDays =
    getCalendarDays();

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

    if (
      previousMonth >= currentMonth
    ) {
      setCalendarMonth(
        previousMonth
      );
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

  const handleDateSelect = (
    date: Date
  ) => {
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
     CHILD AGE
  ========================================================= */

  const handleChildAgeSelect = (
    age: number
  ) => {
    setChildren((current) => [
      ...current,
      age,
    ]);

    setIsChildAgeOpen(false);
  };

  /* =========================================================
     REMOVE CHILD
  ========================================================= */

  const removeChild = (
    index: number
  ) => {
    setChildren((current) =>
      current.filter(
        (_, childIndex) =>
          childIndex !== index
      )
    );
  };

  /* =========================================================
     DISPLAY
  ========================================================= */

  const displayedDate = startDate
    ? formatDate(startDate)
    : "Select Date";

  const travelerLabel = `${adults} ${
    adults === 1
      ? "Adult"
      : "Adults"
  }`;

  return {
    destination,
    setDestination,
    isDestinationOpen,
    setIsDestinationOpen,
    isDateOpen,
    setIsDateOpen,
    startDate,
    today,
    calendarMonth,
    isTravelersOpen,
    setIsTravelersOpen,
    adults,
    children,
    isChildAgeOpen,
    setIsChildAgeOpen,
    destinationPosition,
    calendarPosition,
    travelerPosition,
    plannerRef,
    destinationButtonRef,
    destinationPopupRef,
    dateButtonRef,
    calendarRef,
    travelerButtonRef,
    travelerPopupRef,
    filteredDestinations,
    handleSearch,
    closeAllPopups,
    handleDateOpen,
    handleTravelersOpen,
    handleDestinationSelect,
    isSameDate,
    isPastDate,
    calendarDays,
    goToPreviousMonth,
    goToNextMonth,
    handleDateSelect,
    decreaseAdults,
    increaseAdults,
    handleChildAgeSelect,
    removeChild,
    displayedDate,
    travelerLabel,
  };
}

export type HeroPlannerState = ReturnType<typeof useHeroPlanner>;
