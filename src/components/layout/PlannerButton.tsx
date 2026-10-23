"use client";

import type { ReactNode } from "react";

import { usePlanner } from "./PlannerProvider";

type PlannerButtonProps = {
  className?: string;
  children: ReactNode;
};

export default function PlannerButton({
  className,
  children,
}: PlannerButtonProps) {
  const { openPlanner } = usePlanner();

  return (
    <button type="button" onClick={openPlanner} className={className}>
      {children}
    </button>
  );
}
