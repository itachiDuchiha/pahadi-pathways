"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import TripPlannerForm from "@/components/forms/TripPlannerForm";
import FloatingPlanner from "@/components/layout/FloatingPlanner";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function FloatingActions() {
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