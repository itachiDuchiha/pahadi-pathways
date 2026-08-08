"use client";

import { Map } from "lucide-react";

type FloatingPlannerProps = {
  onOpen: () => void;
};

export default function FloatingPlanner({
  onOpen,
}: FloatingPlannerProps) {
  return (
    <button
      onClick={onOpen}
      aria-label="Plan a custom trip"
      className="
        fixed
        bottom-6
        left-6
        z-40
        flex
        items-center
        gap-2.5
        rounded-full
        bg-[#10264A]
        px-3
        py-2.5
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        active:scale-95
        md:left-6
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
        <Map
          size={17}
          strokeWidth={2}
          className="text-[#10264A]"
        />
      </span>

      {/* Text */}
      <span className="pr-1 text-sm font-semibold">
        Need a custom trip?
      </span>
    </button>
  );
}