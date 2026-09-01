"use client";

import { ReactNode, useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({
  children,
}: SiteLayoutProps) {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  const openPlanner = () => {
    setIsPlannerOpen(true);
  };

  return (
    <>
      <Navbar onPlanTrip={openPlanner} />

      <main>{children}</main>

      <Footer />

      {/* Planner Modal will go here later */}
      {isPlannerOpen && (
        <div className="hidden" />
      )}
    </>
  );
}