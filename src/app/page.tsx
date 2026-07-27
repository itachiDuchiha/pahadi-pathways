"use client";

import { useState } from "react";

import Hero from "@/components/home/Hero";
import HeroPlanner from "@/components/home/HeroPlanner";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularPackages from "@/components/home/PopularPackages";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

import Footer from "@/components/layout/Footer";

import Modal from "@/components/ui/Modal";
import TripPlannerForm from "@/components/forms/TripPlannerForm";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main>
        <Hero onPlanTrip={() => setIsModalOpen(true)} />

        <HeroPlanner />

        <FeaturedDestinations />

        <WhyChooseUs />

        <PopularPackages />

        <Testimonials />

        <CallToAction />
      </main>

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Plan Your Himachal Journey"
      >
        <TripPlannerForm />
      </Modal>
    </>
  );
}