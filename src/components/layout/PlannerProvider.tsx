"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import Modal from "@/components/ui/Modal";
import TripPlannerForm from "@/components/forms/TripPlannerForm";

type PlannerContextValue = {
  openPlanner: () => void;
  closePlanner: () => void;
};

const PlannerContext = createContext<PlannerContextValue | null>(null);

type PlannerProviderProps = {
  children: ReactNode;
};

export default function PlannerProvider({ children }: PlannerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openPlanner = useCallback(() => setIsOpen(true), []);
  const closePlanner = useCallback(() => setIsOpen(false), []);

  const pathname = usePathname();

  const [lastPathname, setLastPathname] = useState(pathname);

  // The provider lives in the root layout and survives client navigation,
  // so close the planner whenever the route changes. This adjusts state
  // during render (no effect) and only ever closes; on mount the pathnames
  // match, so nothing happens.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  const value = useMemo(
    () => ({ openPlanner, closePlanner }),
    [openPlanner, closePlanner]
  );

  return (
    <PlannerContext.Provider value={value}>
      {children}

      <Modal
        isOpen={isOpen}
        onClose={closePlanner}
        title="Plan Your Himalayan Journey"
      >
        <TripPlannerForm />
      </Modal>
    </PlannerContext.Provider>
  );
}

export function usePlanner(): PlannerContextValue {
  const context = useContext(PlannerContext);

  if (!context) {
    throw new Error("usePlanner must be used within a PlannerProvider");
  }

  return context;
}
