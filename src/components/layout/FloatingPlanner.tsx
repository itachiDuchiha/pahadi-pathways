"use client";

import { ArrowRight } from "lucide-react";

type FloatingPlannerProps = {
  onOpen: () => void;
};

export default function FloatingPlanner({
  onOpen,
}: FloatingPlannerProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Plan my trip"
      className="
        group
        fixed
        bottom-6
        left-14
        z-40
        h-[64px]
        w-[64px]
        overflow-visible
        rounded-full
        outline-none
        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:w-[275px]
        focus-visible:w-[275px]
      "
    >
      {/* Light blue attention pulse */}
      <span
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-0
          h-[64px]
          w-[64px]
          rounded-full
          bg-[#B8D8F5]
          opacity-70
          animate-ping
        "
      />

      {/* Expanding panel */}
      <span
        className="
          absolute
          left-[30px]
          top-1/2
          z-10
          flex
          h-[58px]
          w-[235px]
          -translate-y-1/2
          translate-x-[-18px]
          items-center
          rounded-r-full
          border
          border-[#C89A3D]
          bg-[#F7F0DF]
          pl-[50px]
          pr-3
          opacity-0
          shadow-[0_8px_30px_rgba(16,38,74,0.16)]
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:translate-x-0
          group-hover:opacity-100
          group-focus-visible:translate-x-0
          group-focus-visible:opacity-100
        "
      >
        <span className="flex min-w-0 flex-1 flex-col items-start">
          <span
            className="
              whitespace-nowrap
              text-[12px]
              font-extrabold
              uppercase
              tracking-[0.16em]
              text-[#10264A]
            "
          >
            Plan My Trip
          </span>

          <span
            className="
              mt-0.5
              whitespace-nowrap
              text-[6px]
              font-semibold
              uppercase
              tracking-[0.13em]
              text-[#6D604B]
            "
          >
            Your mountains. Our expertise.
          </span>
        </span>

        {/* Divider */}
        <span
          className="
            mx-2
            h-7
            w-px
            shrink-0
            bg-[#C89A3D]/40
          "
        />

        {/* Arrow */}
        <span
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#C89A3D]
            text-[#10264A]
            shadow-[0_3px_10px_rgba(200,154,61,0.25)]
            transition-transform
            duration-500
            group-hover:translate-x-0.5
          "
        >
          <ArrowRight
            size={16}
            strokeWidth={2}
          />
        </span>
      </span>

      {/* Golden Himalayan Compass Seal */}
      <span
        className="
          absolute
          left-0
          top-0
          z-20
          flex
          h-[64px]
          w-[64px]
          items-center
          justify-center
          rounded-full
          border-[2px]
          border-[#D7A945]
          bg-[radial-gradient(circle_at_35%_30%,#F8D982_0%,#E9BC5B_48%,#C89532_100%)]
          shadow-[0_5px_20px_rgba(16,38,74,0.25),0_0_0_3px_rgba(255,255,255,0.65)_inset]
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-[1.03]
          group-hover:shadow-[0_7px_25px_rgba(16,38,74,0.25),0_0_0_3px_rgba(255,255,255,0.65)_inset]
        "
      >
        {/* Inner ring */}
        <span
          className="
            absolute
            inset-[5px]
            rounded-full
            border
            border-[#10264A]/80
          "
        />

        {/* Himalayan mountain mark */}
        <svg
          viewBox="0 0 100 100"
          className="relative h-[38px] w-[38px] text-[#10264A]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 67L39 39L49 51L61 32L84 67"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M29 67L45 49L57 67"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M39 39L35 47L39 45L43 49"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M61 32L56 41L61 38L67 46"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M15 69H86"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M50 15V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M50 80V85"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M15 50H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M80 50H85"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Tiny compass star */}
        <span
          className="
            absolute
            bottom-[7px]
            text-[6px]
            font-bold
            text-[#10264A]
          "
        >
          ✦
        </span>
      </span>

      {/* Subtle outer ring */}
      <span
        className="
          pointer-events-none
          absolute
          -inset-1
          z-30
          rounded-full
          border
          border-[#C89A3D]/25
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />
    </button>
  );
}