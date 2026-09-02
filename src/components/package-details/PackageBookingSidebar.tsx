"use client";

import { useMemo, useState } from "react";
import {
  Car,
  ChevronDown,
  Hotel,
  PhoneCall,
  Plus,
  Utensils,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function PackageBookingSidebar({ pkg }: Props) {
  const [accommodation, setAccommodation] = useState("Deluxe");
  const [mealPlan, setMealPlan] = useState("MAP");
  const [vehicle, setVehicle] = useState("SUV");
  const [travellers, setTravellers] = useState(2);

  /*
   * Package price is treated as the base per-person price.
   *
   * We remove currency symbols/commas so the calculator
   * can work with values such as:
   * ₹31,999
   * ₹31999
   */
  const basePrice = useMemo(() => {
    const numericPrice = Number(
      String(pkg.price).replace(/[^\d.]/g, "")
    );

    return Number.isFinite(numericPrice)
      ? numericPrice
      : 0;
  }, [pkg.price]);

  /*
   * These are package-level adjustments.
   *
   * Keep them modest for now. Once we have your real hotel,
   * meal and vehicle pricing, these can be connected to
   * actual package data.
   */
  const accommodationExtra =
    accommodation === "Standard"
      ? 0
      : accommodation === "Deluxe"
        ? 0
        : 2500;

  const mealExtra =
    mealPlan === "Room Only"
      ? -1200
      : mealPlan === "CP"
        ? 0
        : mealPlan === "MAP"
          ? 1200
          : 2200;

  const vehicleExtra =
    vehicle === "Sedan"
      ? -1500
      : vehicle === "SUV"
        ? 0
        : 5400;

  const pricePerPerson = Math.max(
    0,
    basePrice +
      accommodationExtra +
      mealExtra +
      vehicleExtra
  );

  const subtotal = pricePerPerson * travellers;

  const gst = subtotal * 0.05;

  const total = subtotal + gst;

  const formatPrice = (amount: number) => {
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

  return (
    <aside className="sticky top-[184px] z-30 w-full">
      <div className="overflow-hidden rounded-2xl border border-[#10264A]/10 bg-white shadow-[0_10px_35px_rgba(16,38,74,0.10)]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="bg-[#10264A] px-5 py-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#C89A3D]">
            Plan Your Trip
          </p>

          <h2 className="mt-1 font-serif text-[23px] font-semibold leading-tight text-white">
            Customize Your Journey
          </h2>

          <p className="mt-2 text-[11px] leading-5 text-white/70">
            Select your preferred stay, meals and vehicle.
          </p>
        </div>

        {/* =====================================================
            OPTIONS
        ===================================================== */}

        <div className="space-y-5 p-5">

          {/* ACCOMMODATION */}

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Hotel
                size={15}
                strokeWidth={1.8}
                className="text-[#C89A3D]"
              />

              <label
                htmlFor="accommodation"
                className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#10264A]"
              >
                Accommodation
              </label>
            </div>

            <div className="relative">
              <select
                id="accommodation"
                value={accommodation}
                onChange={(event) =>
                  setAccommodation(event.target.value)
                }
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm font-medium text-[#10264A] outline-none transition focus:border-[#C89A3D] focus:ring-1 focus:ring-[#C89A3D]/30"
              >
                <option value="Standard">
                  Standard
                </option>

                <option value="Deluxe">
                  Deluxe
                </option>

                <option value="Premium">
                  Premium
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* MEAL PLAN */}

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Utensils
                size={15}
                strokeWidth={1.8}
                className="text-[#C89A3D]"
              />

              <label
                htmlFor="meal-plan"
                className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#10264A]"
              >
                Meal Plan
              </label>
            </div>

            <div className="relative">
              <select
                id="meal-plan"
                value={mealPlan}
                onChange={(event) =>
                  setMealPlan(event.target.value)
                }
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm font-medium text-[#10264A] outline-none transition focus:border-[#C89A3D] focus:ring-1 focus:ring-[#C89A3D]/30"
              >
                <option value="Room Only">
                  Room Only
                </option>

                <option value="CP">
                  CP — Breakfast
                </option>

                <option value="MAP">
                  MAP — Breakfast + Dinner
                </option>

                <option value="AP">
                  AP — Breakfast + Lunch + Dinner
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* VEHICLE */}

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Car
                size={15}
                strokeWidth={1.8}
                className="text-[#C89A3D]"
              />

              <label
                htmlFor="vehicle"
                className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#10264A]"
              >
                Vehicle
              </label>
            </div>

            <div className="relative">
              <select
                id="vehicle"
                value={vehicle}
                onChange={(event) =>
                  setVehicle(event.target.value)
                }
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm font-medium text-[#10264A] outline-none transition focus:border-[#C89A3D] focus:ring-1 focus:ring-[#C89A3D]/30"
              >
                <option value="Sedan">
                  Sedan — Aura / Similar
                </option>

                <option value="SUV">
                  SUV — Ertiga / Similar
                </option>

                <option value="Premium">
                  Premium SUV — Innova Crysta / Similar
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* TRAVELLERS */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="travellers"
                className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#10264A]"
              >
                Travellers
              </label>

              <span className="text-xs font-semibold text-gray-500">
                Adults
              </span>
            </div>

            <div className="relative">
              <select
                id="travellers"
                value={travellers}
                onChange={(event) =>
                  setTravellers(Number(event.target.value))
                }
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm font-medium text-[#10264A] outline-none transition focus:border-[#C89A3D] focus:ring-1 focus:ring-[#C89A3D]/30"
              >
                <option value={1}>1 Traveller</option>
                <option value={2}>2 Travellers</option>
                <option value={3}>3 Travellers</option>
                <option value={4}>4 Travellers</option>
                <option value={5}>5 Travellers</option>
                <option value={6}>6 Travellers</option>
                <option value={7}>7 Travellers</option>
                <option value={8}>8 Travellers</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* =================================================
              OPTIONAL ADD-ON
          ================================================= */}

          <div className="rounded-xl border border-[#10264A]/10 bg-[#F8F8F6] p-3.5">

            <div className="flex items-center justify-between gap-3">

              <div className="flex min-w-0 items-start gap-3">

                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C89A3D]/15">
                  <Plus
                    size={14}
                    className="text-[#C89A3D]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C89A3D]">
                    Optional Add-on
                  </p>

                  <p className="mt-1 text-xs font-semibold leading-5 text-[#10264A]">
                    Extra sightseeing / activities
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-gray-500">
                    Discuss additional experiences with our team.
                  </p>
                </div>

              </div>

              <span className="shrink-0 text-[10px] font-semibold text-gray-400">
                Optional
              </span>

            </div>

          </div>

          {/* =================================================
              PRICE BREAKUP
          ================================================= */}

          <div className="border-t border-gray-200 pt-5">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#10264A]">
                Price Breakup
              </h3>

              <span className="text-[10px] text-gray-400">
                {travellers}{" "}
                {travellers === 1
                  ? "traveller"
                  : "travellers"}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">

              <div className="flex items-center justify-between text-gray-500">
                <span>Adult Cost</span>

                <span className="font-medium text-[#10264A]">
                  {formatPrice(pricePerPerson)} × {travellers}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#10264A]">
                  Subtotal
                </span>

                <span className="font-semibold text-[#10264A]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-500">
                <span>GST (5%)</span>

                <span>
                  {formatPrice(gst)}
                </span>
              </div>

            </div>

            {/* TOTAL */}

            <div className="mt-4 rounded-xl bg-[#F7F3E9] p-4">

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500">
                Estimated Total
              </p>

              <div className="mt-1 flex items-end justify-between gap-3">

                <span className="text-xs text-gray-500">
                  Total Amount
                </span>

                <span className="text-2xl font-bold text-[#10264A]">
                  {formatPrice(total)}
                </span>

              </div>

            </div>

          </div>

          {/* =================================================
              REQUEST CALLBACK
          ================================================= */}

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C89A3D] px-4 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#10264A] shadow-md transition-all duration-300 hover:bg-[#d7aa50] hover:shadow-lg"
          >
            <PhoneCall size={16} />

            Request Callback
          </button>

          <p className="text-center text-[9px] leading-4 text-gray-400">
            No payment is required at this stage.
            <br />
            Our travel expert will contact you to confirm details.
          </p>

        </div>
      </div>
    </aside>
  );
}