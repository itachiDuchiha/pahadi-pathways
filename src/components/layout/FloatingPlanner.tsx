"use client";

import { ArrowRight, Compass } from "lucide-react";

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
        fixed
        bottom-6
        left-6
        z-40
        flex
        items-center
        gap-2
        rounded-full
        bg-[#10264A]
        px-3
        py-2.5
        text-white
        shadow-[0_8px_30px_rgba(16,38,74,0.25)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_35px_rgba(16,38,74,0.35)]
        active:scale-95
      "
    >
      {/* Icon */}

      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#C89A3D]
        "
      >
        <Compass
          size={18}
          strokeWidth={1.8}
          className="text-[#10264A]"
        />
      </span>

      {/* Text */}

      <span className="text-sm font-semibold tracking-wide">
        Plan My Trip
      </span>

      <ArrowRight
        size={15}
        className="mr-1 text-[#C89A3D] transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
}