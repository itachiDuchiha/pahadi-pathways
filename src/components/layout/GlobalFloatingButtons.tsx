"use client";

import FloatingPlanner from "./FloatingPlanner";

export default function GlobalFloatingButtons() {
  const handleOpenPlanner = () => {
    console.log("Trip planner opened");
  };

  return (
    <FloatingPlanner onOpen={handleOpenPlanner} />
  );
}