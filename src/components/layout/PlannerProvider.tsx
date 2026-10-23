"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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
