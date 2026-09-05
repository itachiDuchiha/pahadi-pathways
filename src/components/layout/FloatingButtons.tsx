"use client";

import { useState } from "react";

import FloatingPlanner from "@/components/layout/FloatingPlanner";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

import Modal from "@/components/ui/Modal";
import TripPlannerForm from "@/components/forms/TripPlannerForm";

export default function FloatingButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FloatingPlanner
        onOpen={() => setIsModalOpen(true)}
      />

      <FloatingWhatsApp />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Plan Your Himalayan Journey"
      >
        <TripPlannerForm />
      </Modal>
    </>
  );
}