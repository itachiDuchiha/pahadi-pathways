"use client";

import DatePicker, { DateField } from "@/components/home/planner/DatePicker";
import DestinationPicker, { DestinationField } from "@/components/home/planner/DestinationPicker";
import TravellerPicker, { TravellerField } from "@/components/home/planner/TravellerPicker";
import { useHeroPlanner } from "@/components/home/planner/useHeroPlanner";

export default function HeroPlanner() {
  const planner = useHeroPlanner();

  const {
    isDestinationOpen,
    isDateOpen,
    isTravelersOpen,
    plannerRef,
    handleSearch,
    closeAllPopups,
  } = planner;

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div
        onClick={closeAllPopups}
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
            w-[min(860px,calc(100vw-32px))]
            items-center
            rounded-[20px]
            border
            border-white/80
            bg-white
            px-3
            py-1.5
            shadow-[0_25px_65px_rgba(16,38,74,0.18)]
          "
        >

          {/* =================================================
              DESTINATION
          ================================================= */}

          <DestinationField planner={planner} />

          <div className="h-8 w-px shrink-0 bg-gray-200" />

          {/* =================================================
              DATE
          ================================================= */}

          <DateField planner={planner} />

          <div className="h-8 w-px shrink-0 bg-gray-200" />

          {/* =================================================
              TRAVELERS
          ================================================= */}

          <TravellerField planner={planner} />

          {/* =================================================
              SEARCH
          ================================================= */}

          <button
            type="button"
            onClick={handleSearch}
            className="
              ml-2.5
              shrink-0
              rounded-xl
              bg-[#C89A3D]
              px-9
              py-2.5
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

      {/* =====================================================
          DESTINATION DROPDOWN
      ===================================================== */}

      <DestinationPicker planner={planner} />

      {/* =====================================================
          CALENDAR
      ===================================================== */}

      <DatePicker planner={planner} />

      {/* =====================================================
          TRAVELER POPUP
      ===================================================== */}

      <TravellerPicker planner={planner} />
    </>
  );
}
