"use client";

import { useState } from "react";

import Hero from "@/components/home/Hero";
import PopularPackages from "@/components/home/PopularPackages";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

import Footer from "@/components/layout/Footer";

import Modal from "@/components/ui/Modal";
import TripPlannerForm from "@/components/forms/TripPlannerForm";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPlanner = () => {
    setIsModalOpen(true);
  };

  const closePlanner = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Hero onPlanTrip={openPlanner} />

      <PopularPackages />

      <FeaturedDestinations />

      <Testimonials />

      <WhyChooseUs />

      <CallToAction onOpen={openPlanner} />

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={closePlanner}
        title="Plan Your Himalayan Journey"
      >
        <TripPlannerForm />
      </Modal>
    </>
  );
}