"use client";

import { useState } from "react";

import Hero from "@/components/home/Hero";
import PopularPackages from "@/components/home/PopularPackages";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import FloatingPlanner from "@/components/layout/FloatingPlanner";

import Modal from "@/components/ui/Modal";
import TripPlannerForm from "@/components/forms/TripPlannerForm";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Hero onPlanTrip={() => setIsModalOpen(true)} />

      <PopularPackages />

      <FeaturedDestinations />

      <Testimonials />

      <WhyChooseUs />

      <CallToAction />

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Plan Your Himalayan Journey"
      >
        <TripPlannerForm />
      </Modal>

      {/* Floating Buttons */}

      <FloatingPlanner
        onOpen={() => setIsModalOpen(true)}
      />

      <FloatingWhatsApp />
    </>
  );
}