"use client";

import { useState } from "react";

import SiteLayout from "@/components/layout/SiteLayout";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationSection from "@/components/destinations/DestinationSection";

import Modal from "@/components/ui/Modal";
import TripPlannerForm from "@/components/forms/TripPlannerForm";

import {
  featuredJourneys,
  alongTheWay,
  hiddenHimachal,
  cultureAndSoul,
} from "@/data/destinations";

export default function DestinationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPlanner = () => {
    setIsModalOpen(true);
  };

  const closePlanner = () => {
    setIsModalOpen(false);
  };

  return (
    <SiteLayout>
      {/* ================= HERO ================= */}

      <DestinationsHero />

      {/* ================= FEATURED JOURNEYS ================= */}

      <div id="destinations" className="scroll-mt-[96px]">
        <DestinationSection
          title="Featured Journeys"
          subtitle="Our Most Loved Destinations"
          destinations={featuredJourneys}
        />
      </div>

      {/* ================= ALONG THE WAY ================= */}

      <DestinationSection
        title="Along the Way"
        subtitle="Perfect Stops Between Destinations"
        destinations={alongTheWay}
      />

      {/* ================= HIDDEN HIMACHAL ================= */}

      <DestinationSection
        title="Hidden Himachal"
        subtitle="Quiet Corners of the Himalayas"
        destinations={hiddenHimachal}
      />

      {/* ================= CULTURE & SOUL ================= */}

      <DestinationSection
        title="Culture & Soul"
        subtitle="Monasteries, Temples & Traditions"
        destinations={cultureAndSoul}
      />

      {/* ================= PLAN YOUR JOURNEY CTA ================= */}

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            shadow-[0_20px_60px_rgba(16,38,74,0.18)]
          "
          style={{
            backgroundImage:
              "url('/images/destinations/destination-manali.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* ================= BACKGROUND OVERLAY ================= */}

          {/* Main dark overlay */}
          <div className="absolute inset-0 bg-[#081526]/30" />

          {/* Gradient overlay for text readability */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#081526]/50
              via-[#10264A]/20
              to-[#081526]/40
            "
          />

          {/* ================= GOLDEN ATMOSPHERIC GLOW ================= */}

          <div
            className="
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-[#C89A3D]/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -left-24
              h-72
              w-72
              rounded-full
              bg-[#C89A3D]/5
              blur-3xl
            "
          />

          {/* ================= CTA CONTENT ================= */}

          <div
            className="
              relative
              px-6
              py-14
              text-center
              text-white
              md:px-16
              md:py-20
            "
          >

            {/* Small heading */}

            <p
              className="
                flex
                items-center
                justify-center
                gap-3
                text-[11px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#D4AF37]
              "
            >
              <span className="h-px w-10 bg-[#C89A3D]" />

              Your Himalayan Journey

              <span className="h-px w-10 bg-[#C89A3D]" />
            </p>

            {/* Main heading */}

            <h2
              className="
                mx-auto
                mt-5
                max-w-3xl
                font-serif
                text-4xl
                font-medium
                leading-tight
                md:text-5xl
              "
            >
              Your Trip. Your Pace.

              <span className="block text-[#D4AF37]">
                Your Mountains.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-[15px]
                leading-7
                text-gray-100
                md:text-base
              "
            >
              Tell us where you want to go, how you like to travel and what
              you want to experience. We&apos;ll help shape it into a journey
              that fits you.
            </p>

            {/* ================= PLAN BUTTON ================= */}

            <button
              type="button"
              onClick={openPlanner}
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#C89A3D]
                px-8
                py-4
                font-semibold
                text-[#10264A]
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D7AE57]
                hover:shadow-xl
                focus:outline-none
                focus:ring-2
                focus:ring-[#D4AF37]
                focus:ring-offset-2
                focus:ring-offset-[#10264A]
              "
            >
              <span>Plan My Journey</span>

              <span
                className="
                  text-lg
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </button>

            {/* Supporting text */}

            <p
              className="
                mt-4
                text-xs
                tracking-wide
                text-gray-200
              "
            >
              Tell us your dates, interests &amp; budget
            </p>

          </div>
        </div>

      </section>

      {/* ================= TRIP PLANNER MODAL ================= */}

      <Modal
        isOpen={isModalOpen}
        onClose={closePlanner}
        title="Plan Your Himalayan Journey"
      >
        <TripPlannerForm />
      </Modal>

    </SiteLayout>
  );
}