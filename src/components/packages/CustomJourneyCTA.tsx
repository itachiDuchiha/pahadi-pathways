"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import TripPlannerForm from "@/components/forms/TripPlannerForm";

export default function CustomJourneyCTA() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  return (
    <>
      {/* =====================================================
          CUSTOM JOURNEY CTA
      ===================================================== */}

      <section
        className="
          mx-auto
          max-w-6xl
          px-6
          pb-16
          md:pb-20
        "
      >

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            px-7
            py-14
            text-center
            text-white
            shadow-[0_18px_45px_rgba(16,38,74,0.12)]
            sm:px-10
            md:px-16
            md:py-16
          "
        >

          {/* =================================================
              BACKGROUND IMAGE

              Same premium packages hero image.
          ================================================= */}

          <img
            src="/images/hero/packages-hero.png"
            alt=""
            aria-hidden="true"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          />

          {/* =================================================
              LIGHT NAVY OVERLAY

              Kept intentionally lighter so the
              mountain image remains visible.
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-[#10264A]/55
            "
          />

          {/* =================================================
              SUBTLE LEFT-TO-RIGHT DEPTH
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#071A2C]/65
              via-[#10264A]/35
              to-[#10264A]/45
            "
          />

          {/* =================================================
              SUBTLE GOLD ATMOSPHERE
          ================================================= */}

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
              h-64
              w-64
              rounded-full
              bg-white/5
              blur-3xl
            "
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="relative z-10">

            <p
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#D4AF37]
              "
            >
              Travel Your Way
            </p>

            <h2
              className="
                mx-auto
                mt-3
                max-w-2xl
                font-serif
                text-3xl
                font-medium
                leading-tight
                md:text-4xl
              "
            >
              Want Something More Personal?
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-white/90
                sm:text-base
              "
            >
              Every traveler is different. Tell us
              what you're looking for and we'll help
              create a Himalayan journey around you.
            </p>

            {/* =================================================
                PLAN MY JOURNEY
            ================================================= */}

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="
                mt-7
                rounded-full
                bg-[#C89A3D]
                px-7
                py-3.5
                text-sm
                font-bold
                text-[#10264A]
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D7AE57]
                hover:shadow-xl
                active:scale-95
              "
            >
              Plan My Journey
            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          EXISTING TRIP PLANNER
      ===================================================== */}

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