"use client";

import { useMemo, useState } from "react";
import {
  Car,
  Check,
  ChevronDown,
  MessageCircle,
  Phone,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function PackageBookingPanel({ pkg }: Props) {
  const [accommodation, setAccommodation] = useState("Deluxe");
  const [mealPlan, setMealPlan] = useState("MAP");
  const [vehicle, setVehicle] = useState("Ertiga / Similar");
  const [travellers, setTravellers] = useState(2);
  const [callbackOpen, setCallbackOpen] = useState(false);

  /*
   * Package price is currently coming from the package data.
   * We keep the displayed package price untouched and calculate
   * optional upgrades separately.
   */
  const basePrice = useMemo(() => {
    const numericPrice = Number(
      String(pkg.price).replace(/[^\d.]/g, "")
    );

    return Number.isFinite(numericPrice) ? numericPrice : 0;
  }, [pkg.price]);

  const vehicleUpgrade =
    vehicle === "Innova Crysta / Similar" ? 10800 : 0;

  const mealUpgrade =
    mealPlan === "CP" ? -1500 : 0;

  const totalPackageCost = Math.max(
    0,
    basePrice + vehicleUpgrade + mealUpgrade
  );

  const gst = totalPackageCost * 0.05;
  const totalAmount = totalPackageCost + gst;

  const formatPrice = (amount: number) =>
    `₹${Math.round(amount).toLocaleString("en-IN")}`;

  return (
    <>
      {/* =========================================================
          BOOKING / PRICE PANEL
      ========================================================= */}

      <aside
        className="
          sticky
          top-[105px]
          z-30
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-[#10264A]/10
          bg-white
          shadow-[0_10px_35px_rgba(16,38,74,0.10)]
        "
      >
        {/* =====================================================
            PANEL HEADER
        ===================================================== */}

        <div
          className="
            border-b
            border-[#10264A]/8
            bg-[#F5F7FA]
            px-5
            py-5
          "
        >
          <h3
            className="
              font-serif
              text-2xl
              font-bold
              leading-tight
              text-[#10264A]
            "
          >
            Customize Your Tour
          </h3>

          <div className="mt-2 h-[3px] w-12 rounded-full bg-[#C89A3D]" />

          <p
            className="
              mt-2.5
              text-xs
              leading-5
              text-[#5F6B7A]
            "
          >
            Choose your options to see the estimated cost.
          </p>
        </div>

        {/* =====================================================
            OPTIONS
        ===================================================== */}

        <div className="space-y-4 px-5 py-5">

          {/* ===================================================
              STAY
          =================================================== */}

          <div>
            <label
              htmlFor="accommodation"
              className="
                mb-1.5
                block
                text-sm
                font-bold
                text-[#10264A]
              "
            >
              Stay
            </label>

            <div className="relative">
              <select
                id="accommodation"
                value={accommodation}
                onChange={(e) =>
                  setAccommodation(e.target.value)
                }
                className="
                  w-full
                  appearance-none
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2.5
                  pr-9
                  text-sm
                  font-medium
                  text-[#10264A]
                  outline-none
                  transition
                  focus:border-[#C89A3D]
                  focus:ring-1
                  focus:ring-[#C89A3D]
                "
              >
                <option value="Deluxe">
                  Deluxe
                </option>

                <option value="Premium">
                  Premium
                </option>

                <option value="Luxury">
                  Luxury
                </option>
              </select>

              <ChevronDown
                size={16}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />
            </div>
          </div>

          {/* ===================================================
              MEALS
          =================================================== */}

          <div>
            <label
              htmlFor="meal-plan"
              className="
                mb-1.5
                block
                text-sm
                font-bold
                text-[#10264A]
              "
            >
              Meals
            </label>

            <div className="relative">
              <select
                id="meal-plan"
                value={mealPlan}
                onChange={(e) =>
                  setMealPlan(e.target.value)
                }
                className="
                  w-full
                  appearance-none
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2.5
                  pr-9
                  text-sm
                  font-medium
                  text-[#10264A]
                  outline-none
                  transition
                  focus:border-[#C89A3D]
                  focus:ring-1
                  focus:ring-[#C89A3D]
                "
              >
                <option value="MAP">
                  Breakfast + Dinner (MAP)
                </option>

                <option value="CP">
                  Breakfast Only (CP)
                </option>

                <option value="AP">
                  Breakfast + Lunch + Dinner (AP)
                </option>
              </select>

              <ChevronDown
                size={16}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />
            </div>
          </div>

          {/* ===================================================
              VEHICLE
          =================================================== */}

          <div>
            <label
              htmlFor="vehicle"
              className="
                mb-1.5
                block
                text-sm
                font-bold
                text-[#10264A]
              "
            >
              Vehicle
            </label>

            <div className="relative">
              <select
                id="vehicle"
                value={vehicle}
                onChange={(e) =>
                  setVehicle(e.target.value)
                }
                className="
                  w-full
                  appearance-none
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2.5
                  pr-9
                  text-sm
                  font-medium
                  text-[#10264A]
                  outline-none
                  transition
                  focus:border-[#C89A3D]
                  focus:ring-1
                  focus:ring-[#C89A3D]
                "
              >
                <option value="Ertiga / Similar">
                  Ertiga / Similar — Sedan / SUV
                </option>

                <option value="Innova Crysta / Similar">
                  Innova Crysta / Similar
                </option>
              </select>

              <ChevronDown
                size={16}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />
            </div>
          </div>

          {/* ===================================================
              TRAVELLERS
          =================================================== */}

          <div>
            <label
              htmlFor="travellers"
              className="
                mb-1.5
                block
                text-sm
                font-bold
                text-[#10264A]
              "
            >
              Travellers
            </label>

            <div className="relative">
              <select
                id="travellers"
                value={travellers}
                onChange={(e) =>
                  setTravellers(Number(e.target.value))
                }
                className="
                  w-full
                  appearance-none
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2.5
                  pr-9
                  text-sm
                  font-medium
                  text-[#10264A]
                  outline-none
                  transition
                  focus:border-[#C89A3D]
                  focus:ring-1
                  focus:ring-[#C89A3D]
                "
              >
                <option value={1}>
                  1 Traveller
                </option>

                <option value={2}>
                  2 Travellers
                </option>

                <option value={3}>
                  3 Travellers
                </option>

                <option value={4}>
                  4 Travellers
                </option>

                <option value={5}>
                  5 Travellers
                </option>

                <option value={6}>
                  6 Travellers
                </option>
              </select>

              <ChevronDown
                size={16}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />
            </div>
          </div>

          {/* =================================================
              VEHICLE UPGRADE
          ================================================= */}

          <div className="border-t border-gray-100 pt-4">

            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#10264A]">
                Add Ons
              </h4>

              <Car
                size={17}
                className="text-[#C89A3D]"
              />
            </div>

            <div
              className="
                rounded-lg
                border
                border-gray-200
                bg-[#FAFAF8]
                p-3
              "
            >
              <div className="flex items-center justify-between gap-3">

                <div>
                  <p className="text-xs font-semibold text-[#10264A]">
                    Vehicle Upgrade
                  </p>

                  <p className="mt-0.5 text-[11px] leading-4 text-gray-500">
                    Ertiga / Similar → Innova Crysta / Similar
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#10264A]">
                    + ₹10,800
                  </p>
                </div>

                {vehicle === "Innova Crysta / Similar" ? (
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                      rounded-md
                      bg-green-50
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-green-700
                    "
                  >
                    <Check size={12} />
                    ADDED
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setVehicle("Innova Crysta / Similar")
                    }
                    className="
                      shrink-0
                      rounded-md
                      bg-[#C89A3D]
                      px-3
                      py-1.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-white
                      transition
                      hover:bg-[#B58932]
                    "
                  >
                    ADD
                  </button>
                )}

              </div>
            </div>
          </div>

          {/* =================================================
              PRICE SUMMARY
          ================================================= */}

          <div className="border-t border-gray-100 pt-4">

            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#10264A]">
                Price Summary
              </h4>

              <span className="text-[10px] text-gray-400">
                {travellers}{" "}
                {travellers === 1
                  ? "Traveller"
                  : "Travellers"}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">

              {/* PACKAGE */}

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">
                  Package
                </span>

                <span className="font-medium text-[#10264A]">
                  {formatPrice(basePrice)}
                </span>
              </div>

              {/* VEHICLE UPGRADE */}

              {vehicleUpgrade > 0 && (
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">
                    Vehicle Upgrade
                  </span>

                  <span className="font-medium text-[#10264A]">
                    + {formatPrice(vehicleUpgrade)}
                  </span>
                </div>
              )}

              {/* MEAL ADJUSTMENT */}

              {mealUpgrade < 0 && (
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">
                    Meal Plan Adjustment
                  </span>

                  <span className="font-medium text-green-600">
                    - {formatPrice(Math.abs(mealUpgrade))}
                  </span>
                </div>
              )}

              {/* TOTAL PACKAGE COST */}

              <div className="border-t border-gray-100 pt-2.5">

                <div className="flex justify-between gap-3">
                  <span className="font-semibold text-[#10264A]">
                    Total Package Cost
                  </span>

                  <span className="font-bold text-[#10264A]">
                    {formatPrice(totalPackageCost)}
                  </span>
                </div>

              </div>

              {/* GST */}

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">
                  GST (5%)
                </span>

                <span className="font-medium text-gray-600">
                  {formatPrice(gst)}
                </span>
              </div>

              {/* FINAL TOTAL */}

              <div className="mt-2 rounded-lg bg-[#F7F8FA] p-3">

                <div className="flex items-end justify-between gap-3">

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-gray-500
                      "
                    >
                      Total Amount
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      Estimated final cost
                    </p>
                  </div>

                  <p className="text-xl font-bold text-[#10264A]">
                    {formatPrice(totalAmount)}
                  </p>

                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              CALLBACK BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => setCallbackOpen(true)}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#C89A3D]
              px-4
              py-3
              text-xs
              font-bold
              uppercase
              tracking-[0.12em]
              text-white
              shadow-sm
              transition
              hover:bg-[#B58932]
            "
          >
            <Phone size={16} />
            Request Callback
          </button>

          {/* =================================================
              CONTACT LINKS
          ================================================= */}

          <div className="flex items-center justify-center gap-5 pb-1">

            <a
              href="tel:+919999999999"
              className="
                inline-flex
                items-center
                gap-1.5
                text-[11px]
                font-semibold
                text-[#10264A]
                transition
                hover:text-[#C89A3D]
              "
            >
              <Phone size={14} />
              Call Us
            </a>

            <a
              href="https://wa.me/919999999999"
              className="
                inline-flex
                items-center
                gap-1.5
                text-[11px]
                font-semibold
                text-[#25D366]
                transition
                hover:text-[#1DA851]
              "
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>

          </div>

        </div>
      </aside>

      {/* =========================================================
          CALLBACK POPUP
      ========================================================= */}

      {callbackOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/50
            px-4
            backdrop-blur-sm
          "
          onClick={() => setCallbackOpen(false)}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#C89A3D]
                  "
                >
                  Request Callback
                </p>

                <h3
                  className="
                    mt-1
                    font-serif
                    text-2xl
                    font-bold
                    text-[#10264A]
                  "
                >
                  We&apos;ll Get Back to You
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Share your details and our travel team
                  will contact you shortly.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setCallbackOpen(false)
                }
                className="
                  text-xl
                  text-gray-400
                  transition
                  hover:text-[#10264A]
                "
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setCallbackOpen(false);
              }}
            >

              {/* NAME */}

              <div>
                <label
                  className="
                    mb-1.5
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#10264A]
                  "
                >
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    transition
                    focus:border-[#C89A3D]
                    focus:ring-1
                    focus:ring-[#C89A3D]
                  "
                />
              </div>

              {/* PHONE */}

              <div>
                <label
                  className="
                    mb-1.5
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#10264A]
                  "
                >
                  Phone / WhatsApp
                </label>

                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    transition
                    focus:border-[#C89A3D]
                    focus:ring-1
                    focus:ring-[#C89A3D]
                  "
                />
              </div>

              {/* MESSAGE */}

              <div>
                <label
                  className="
                    mb-1.5
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#10264A]
                  "
                >
                  Message
                </label>

                <textarea
                  rows={3}
                  placeholder="Any requirements or questions?"
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    transition
                    focus:border-[#C89A3D]
                    focus:ring-1
                    focus:ring-[#C89A3D]
                  "
                />
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#10264A]
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#18355F]
                "
              >
                Request Callback
                <Phone size={16} />
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}