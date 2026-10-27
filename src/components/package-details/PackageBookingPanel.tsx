"use client";

import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Users,
  Check,
} from "lucide-react";

import type { Package } from "@/lib/cms/types";
import { telUrl, whatsappUrl } from "@/config/site";
import EnquiryModal from "@/components/package-details/booking/EnquiryModal";
import MealSelector from "@/components/package-details/booking/MealSelector";
import PriceSummary from "@/components/package-details/booking/PriceSummary";
import StaySelector from "@/components/package-details/booking/StaySelector";
import TravellerPicker from "@/components/package-details/booking/TravellerPicker";
import VehicleSelector from "@/components/package-details/booking/VehicleSelector";
import { useBookingState } from "@/components/package-details/booking/useBookingState";

type Props = {
  pkg: Package;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function PackageBookingPanel({
  pkg,
}: Props) {
  /* =======================================================
     STATE
  ======================================================= */

  const {
    stay,
    setStay,
    meals,
    setMeals,
    vehicle,
    setVehicle,
    adults,
    setAdults,
    childAges,
    setChildAges,
    tourDays,
    price,
  } = useBookingState(pkg);

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  /* =======================================================
     TRAVELLER COUNT
  ======================================================= */

  const totalTravellers =
    adults + childAges.length;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <aside
      className="
        relative
        w-full
        overflow-hidden
        rounded-[18px]
        border
        border-[#C89A3D]/35
        bg-[#FBF8F0]
        shadow-[0_12px_35px_rgba(16,38,74,0.10)]
      "
    >

      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          border-b
          border-[#C89A3D]/25
          bg-[#F7F0E0]
          px-5
          py-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <div>
            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#A47716]
              "
            >
              Your Trip
            </p>

            <h2
              className="
                mt-0.5
                font-serif
                text-[21px]
                font-semibold
                leading-tight
                text-[#10264A]
              "
            >
              Plan Your Stay
            </h2>
          </div>

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#C89A3D]/30
              bg-white
              text-[#10264A]
            "
          >
            <Users
              size={16}
              strokeWidth={2}
            />
          </div>

        </div>
      </div>

      {/* ===================================================
          MAIN CONTROLS
      =================================================== */}

      <div
        className="
          space-y-3
          px-4
          py-4
        "
      >

        {/* =================================================
            STAY
        ================================================= */}

        <StaySelector
          stay={stay}
          setStay={setStay}
        />

        {/* =================================================
            MEALS
        ================================================= */}

        <MealSelector
          meals={meals}
          setMeals={setMeals}
        />

        {/* =================================================
            VEHICLE
        ================================================= */}

        <VehicleSelector
          vehicle={vehicle}
          setVehicle={setVehicle}
          price={price}
        />

        {/* =================================================
            TRAVELLERS
        ================================================= */}

        <TravellerPicker
          adults={adults}
          setAdults={setAdults}
          childAges={childAges}
          setChildAges={setChildAges}
          totalTravellers={totalTravellers}
          childRate={price.childRate}
        />

        {/* =================================================
            PRICE SUMMARY
        ================================================= */}

        <PriceSummary
          price={price}
          adults={adults}
          totalTravellers={totalTravellers}
          tourDays={tourDays}
        />

        {/* =================================================
            REQUEST TO BOOK
        ================================================= */}

        <button
          type="button"
          onClick={() => {
            setIsEnquiryOpen(true);
          }}
          className="
            flex
            h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-[10px]
            bg-[#C89A3D]
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-[#10264A]
            shadow-[0_6px_15px_rgba(200,154,61,0.25)]
            transition-all
            duration-200
            hover:-translate-y-[1px]
            hover:bg-[#D5AA4F]
            hover:shadow-[0_8px_18px_rgba(200,154,61,0.30)]
            active:translate-y-0
          "
        >
          <MessageCircle
            size={14}
            strokeWidth={2.2}
          />

          Request to Book
        </button>

        {/* =================================================
            NOTE
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-1.5
            pt-0.5
          "
        >
          <Check
            size={11}
            strokeWidth={2.5}
            className="text-[#8B6412]"
          />

          <span
            className="
              text-[8px]
              font-medium
              text-[#526078]
            "
          >
            No payment required to enquire
          </span>
        </div>

        {/* =================================================
            CONTACT OPTIONS
        ================================================= */}

        <div
          className="
            border-t
            border-[#D9D1C3]
            pt-2.5
          "
        >

          <div
            className="
              flex
              items-center
              justify-center
              gap-5
            "
          >

            <a
              href={telUrl()}
              className="
                inline-flex
                items-center
                gap-1.5
                text-[9px]
                font-semibold
                text-[#34445E]
                transition
                hover:text-[#10264A]
              "
            >
              <Phone
                size={12}
                strokeWidth={2}
              />

              Call Us
            </a>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-1.5
                text-[9px]
                font-semibold
                text-[#168A4A]
                transition
                hover:text-[#0F6D39]
              "
            >
              <MessageCircle
                size={12}
                strokeWidth={2}
              />

              WhatsApp
            </a>

          </div>

        </div>

      </div>

      <EnquiryModal
        pkg={pkg}
        isEnquiryOpen={isEnquiryOpen}
        setIsEnquiryOpen={setIsEnquiryOpen}
        stay={stay}
        meals={meals}
        vehicle={vehicle}
        adults={adults}
        childAges={childAges}
        price={price}
      />

    </aside>
  );
}
