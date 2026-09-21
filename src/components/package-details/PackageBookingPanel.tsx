"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Info,
  MessageCircle,
  Minus,
  Phone,
  Plus,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

type Child = {
  id: number;
  age: number;
};

export default function PackageBookingPanel({ pkg }: Props) {
  const [accommodation, setAccommodation] = useState("Deluxe");
  const [mealPlan, setMealPlan] = useState("MAP");

  const [vehicle, setVehicle] = useState(
    "Ertiga / Rumion or similar"
  );

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState<Child[]>([]);

  // Child details stay collapsed until the user clicks the small arrow.
  const [childrenDetailsOpen, setChildrenDetailsOpen] =
    useState(false);

  const [callbackOpen, setCallbackOpen] = useState(false);

  /* =========================================================
     BASE PACKAGE PRICE
  ========================================================= */

  const basePrice = useMemo(() => {
    const numericPrice = Number(
      String(pkg.price).replace(/[^\d.]/g, "")
    );

    return Number.isFinite(numericPrice)
      ? numericPrice
      : 0;
  }, [pkg.price]);

  /* =========================================================
     VEHICLE PRICING

     Sedan = Included
     Ertiga / Rumion = +₹1,000
     Innova Crysta = +₹2,000
  ========================================================= */

  const vehicleUpgrade =
    vehicle === "Ertiga / Rumion or similar"
      ? 1000
      : vehicle === "Innova Crysta or similar"
        ? 2000
        : 0;

  /* =========================================================
     MEAL PLAN
  ========================================================= */

  const mealUpgrade = 0;

  const totalPackageCost = Math.max(
    0,
    basePrice + vehicleUpgrade + mealUpgrade
  );

  const gst = totalPackageCost * 0.05;
  const totalAmount = totalPackageCost + gst;

  const formatPrice = (amount: number) =>
    `₹${Math.round(amount).toLocaleString("en-IN")}`;

  /* =========================================================
     ADULT CONTROLS
  ========================================================= */

  const increaseAdults = () => {
    setAdults((current) => Math.min(current + 1, 12));
  };

  const decreaseAdults = () => {
    setAdults((current) => Math.max(current - 1, 1));
  };

  /* =========================================================
     CHILD CONTROLS
  ========================================================= */

  const increaseChildren = () => {
    if (children.length >= 6) return;

    const nextId =
      children.length === 0
        ? 1
        : Math.max(...children.map((child) => child.id)) + 1;

    setChildren((current) => [
      ...current,
      {
        id: nextId,
        age: 5,
      },
    ]);

    // IMPORTANT:
    // Do NOT automatically open the child details.
    // User can open them using the small arrow.
  };

  const decreaseChildren = () => {
    setChildren((current) => {
      const updated = current.slice(0, -1);

      if (updated.length === 0) {
        setChildrenDetailsOpen(false);
      }

      return updated;
    });
  };

  const updateChildAge = (id: number, age: number) => {
    setChildren((current) =>
      current.map((child) =>
        child.id === id
          ? {
              ...child,
              age,
            }
          : child
      )
    );
  };

  const hasComplimentaryChild = children.some(
    (child) => child.age <= 5
  );

  const totalTravellers = adults + children.length;

  return (
    <>
      {/* =========================================================
          MAIN BOOKING PANEL
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
          shadow-[0_8px_30px_rgba(16,38,74,0.08)]
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            border-b
            border-[#10264A]/8
            bg-[#F5F7FA]
            px-5
            py-4
          "
        >
          <h3
            className="
              font-serif
              text-[23px]
              font-bold
              leading-tight
              text-[#10264A]
            "
          >
            Customize Your Tour
          </h3>

          <div className="mt-2 h-[3px] w-11 rounded-full bg-[#C89A3D]" />
        </div>

        {/* =====================================================
            OPTIONS
        ===================================================== */}

        <div className="space-y-3.5 px-5 py-4">

          {/* ===================================================
              STAY
          =================================================== */}

          <div>
            <label
              htmlFor="accommodation"
              className="
                mb-1
                block
                text-[12px]
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
                  h-[42px]
                  w-full
                  appearance-none
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  pr-9
                  text-[13px]
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
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-[#10264A]
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
                mb-1
                block
                text-[12px]
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
                  h-[42px]
                  w-full
                  appearance-none
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  pr-9
                  text-[13px]
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
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-[#10264A]
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
                mb-1
                block
                text-[12px]
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
                  h-[42px]
                  w-full
                  appearance-none
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  pr-9
                  text-[13px]
                  font-medium
                  text-[#10264A]
                  outline-none
                  transition
                  focus:border-[#C89A3D]
                  focus:ring-1
                  focus:ring-[#C89A3D]
                "
              >
                <option value="Sedan — Aura / Etios / Dzire or similar">
                  Sedan — Aura / Etios / Dzire or similar
                </option>

                <option value="Ertiga / Rumion or similar">
                  Ertiga / Rumion or similar
                </option>

                <option value="Innova Crysta or similar">
                  Innova Crysta or similar
                </option>
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-[#10264A]
                "
              />
            </div>
          </div>

          {/* ===================================================
              TRAVELLERS
          =================================================== */}

          <div>
            <div
              className="
                mb-1
                flex
                items-center
                justify-between
              "
            >
              <p
                className="
                  text-[12px]
                  font-bold
                  text-[#10264A]
                "
              >
                Travellers
              </p>

              <span
                className="
                  rounded-full
                  bg-[#F5F7FA]
                  px-2
                  py-1
                  text-[10px]
                  font-semibold
                  text-[#10264A]
                "
              >
                {totalTravellers}
              </span>
            </div>

            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-[#10264A]/10
                bg-white
              "
            >
              {/* =================================================
                  ADULTS ROW
              ================================================= */}

              <div
                className="
                  flex
                  min-h-[58px]
                  items-center
                  justify-between
                  px-3
                "
              >
                <div>
                  <p
                    className="
                      text-[13px]
                      font-bold
                      text-[#10264A]
                    "
                  >
                    Adults
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-gray-400
                    "
                  >
                    Age 11+
                  </p>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <button
                    type="button"
                    onClick={decreaseAdults}
                    disabled={adults <= 1}
                    aria-label="Decrease adults"
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-gray-200
                      bg-white
                      text-[#10264A]
                      transition
                      hover:border-[#C89A3D]
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <Minus size={13} />
                  </button>

                  <span
                    className="
                      min-w-[18px]
                      text-center
                      text-[13px]
                      font-bold
                      text-[#10264A]
                    "
                  >
                    {adults}
                  </span>

                  <button
                    type="button"
                    onClick={increaseAdults}
                    disabled={adults >= 12}
                    aria-label="Increase adults"
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#C89A3D]
                      bg-white
                      text-[#10264A]
                      transition
                      hover:bg-[#C89A3D]/10
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* =================================================
                  CHILDREN HEADER
              ================================================= */}

              <div
                className="
                  border-t
                  border-gray-100
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setChildrenDetailsOpen(
                      (current) => !current
                    )
                  }
                  className="
                    flex
                    min-h-[58px]
                    w-full
                    items-center
                    justify-between
                    px-3
                    text-left
                    transition
                    hover:bg-[#FAFAF8]
                  "
                >
                  <div>
                    <p
                      className="
                        text-[13px]
                        font-bold
                        text-[#10264A]
                      "
                    >
                      Children
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        text-gray-400
                      "
                    >
                      Age 1–10
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        flex
                        h-7
                        min-w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-[#F5F7FA]
                        px-2
                        text-[11px]
                        font-bold
                        text-[#10264A]
                      "
                    >
                      {children.length}
                    </span>

                    {/* Small info icon — only useful when
                        children have been selected */}
                    {children.length > 0 && (
                      <span
                        title="View child details"
                        className="
                          flex
                          h-6
                          w-6
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#C89A3D]/30
                          text-[#C89A3D]
                        "
                      >
                        <Info size={12} />
                      </span>
                    )}

                    <ChevronDown
                      size={15}
                      className={`
                        text-[#10264A]
                        transition-transform
                        ${
                          childrenDetailsOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </div>
                </button>
              </div>

              {/* =================================================
                  HIDDEN CHILD DETAILS

                  This section is NOT shown until the user
                  clicks the small arrow/info area.
              ================================================= */}

              {childrenDetailsOpen && (
                <div
                  className="
                    border-t
                    border-gray-100
                    bg-[#FAFAF8]
                    px-3
                    py-3
                  "
                >
                  {/* NUMBER OF CHILDREN */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        text-[11px]
                        font-medium
                        text-gray-500
                      "
                    >
                      Number of children
                    </span>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <button
                        type="button"
                        onClick={decreaseChildren}
                        disabled={children.length === 0}
                        aria-label="Decrease children"
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-gray-200
                          bg-white
                          text-[#10264A]
                          disabled:opacity-40
                        "
                      >
                        <Minus size={13} />
                      </button>

                      <span
                        className="
                          min-w-[18px]
                          text-center
                          text-[12px]
                          font-bold
                          text-[#10264A]
                        "
                      >
                        {children.length}
                      </span>

                      <button
                        type="button"
                        onClick={increaseChildren}
                        disabled={children.length >= 6}
                        aria-label="Increase children"
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#C89A3D]
                          bg-white
                          text-[#10264A]
                          disabled:opacity-40
                        "
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  {/* CHILD ROWS */}

                  {children.length > 0 && (
                    <div className="mt-2.5 space-y-2">
                      {children.map((child, index) => (
                        <div
                          key={child.id}
                          className="
                            flex
                            items-center
                            justify-between
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            py-2
                          "
                        >
                          <div>
                            <p
                              className="
                                text-[11px]
                                font-bold
                                text-[#10264A]
                              "
                            >
                              Child {index + 1}
                            </p>

                            {child.age <= 5 && (
                              <p
                                className="
                                  mt-0.5
                                  text-[9px]
                                  font-semibold
                                  text-green-600
                                "
                              >
                                Complimentary
                              </p>
                            )}
                          </div>

                          <div className="relative">
                            <select
                              value={child.age}
                              onChange={(e) =>
                                updateChildAge(
                                  child.id,
                                  Number(e.target.value)
                                )
                              }
                              className="
                                h-8
                                appearance-none
                                rounded-md
                                border
                                border-gray-200
                                bg-white
                                px-2.5
                                pr-7
                                text-[11px]
                                font-medium
                                text-[#10264A]
                                outline-none
                                focus:border-[#C89A3D]
                              "
                            >
                              {Array.from(
                                { length: 10 },
                                (_, index) => index + 1
                              ).map((age) => (
                                <option
                                  key={age}
                                  value={age}
                                >
                                  {age}{" "}
                                  {age === 1
                                    ? "year"
                                    : "years"}
                                </option>
                              ))}
                            </select>

                            <ChevronDown
                              size={12}
                              className="
                                pointer-events-none
                                absolute
                                right-2
                                top-1/2
                                -translate-y-1/2
                                text-gray-500
                              "
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* COMPLIMENTARY NOTE */}

                  {hasComplimentaryChild && (
                    <div
                      className="
                        mt-2.5
                        flex
                        items-start
                        gap-1.5
                        rounded-lg
                        border
                        border-green-100
                        bg-green-50
                        px-2.5
                        py-2
                      "
                    >
                      <Check
                        size={12}
                        className="
                          mt-0.5
                          shrink-0
                          text-green-600
                        "
                      />

                      <p
                        className="
                          text-[9px]
                          leading-4
                          text-green-700
                        "
                      >
                        One child aged 5 or below is
                        complimentary. No change in
                        package price.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              PRICE SUMMARY
          ================================================= */}

          <div
            className="
              border-t
              border-gray-100
              pt-3
            "
          >
            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >
              <h4
                className="
                  text-[13px]
                  font-bold
                  text-[#10264A]
                "
              >
                Price Summary
              </h4>

              <span
                className="
                  text-[10px]
                  text-gray-400
                "
              >
                {totalTravellers}{" "}
                {totalTravellers === 1
                  ? "Traveller"
                  : "Travellers"}
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              {/* PACKAGE */}

              <div
                className="
                  flex
                  justify-between
                  gap-3
                "
              >
                <span className="text-gray-500">
                  Package
                </span>

                <span
                  className="
                    font-medium
                    text-[#10264A]
                  "
                >
                  {formatPrice(basePrice)}
                </span>
              </div>

              {/* VEHICLE UPGRADE */}

              {vehicleUpgrade > 0 && (
                <div
                  className="
                    flex
                    justify-between
                    gap-3
                  "
                >
                  <span className="text-gray-500">
                    Vehicle Upgrade
                  </span>

                  <span
                    className="
                      font-medium
                      text-[#10264A]
                    "
                  >
                    + {formatPrice(vehicleUpgrade)}
                  </span>
                </div>
              )}

              {/* TOTAL PACKAGE */}

              <div
                className="
                  flex
                  justify-between
                  gap-3
                  border-t
                  border-gray-100
                  pt-2
                "
              >
                <span
                  className="
                    font-bold
                    text-[#10264A]
                  "
                >
                  Total Package Cost
                </span>

                <span
                  className="
                    font-bold
                    text-[#10264A]
                  "
                >
                  {formatPrice(totalPackageCost)}
                </span>
              </div>

              {/* GST */}

              <div
                className="
                  flex
                  justify-between
                  gap-3
                "
              >
                <span className="text-gray-500">
                  GST (5%)
                </span>

                <span className="text-gray-600">
                  {formatPrice(gst)}
                </span>
              </div>

              {/* FINAL AMOUNT */}

              <div
                className="
                  mt-2
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  bg-[#F5F7FA]
                  px-3
                  py-2.5
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-gray-500
                    "
                  >
                    Total Amount
                  </p>
                </div>

                <p
                  className="
                    text-[18px]
                    font-bold
                    text-[#10264A]
                  "
                >
                  {formatPrice(totalAmount)}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              CALLBACK
          ================================================= */}

          <button
            type="button"
            onClick={() => setCallbackOpen(true)}
            className="
              flex
              h-[40px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#C89A3D]
              text-[11px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-white
              shadow-sm
              transition
              hover:bg-[#B58932]
            "
          >
            <Phone size={14} />
            Request Callback
          </button>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-5
              pb-0.5
            "
          >
            <a
              href="tel:+919999999999"
              className="
                inline-flex
                items-center
                gap-1.5
                text-[10px]
                font-semibold
                text-[#10264A]
                hover:text-[#C89A3D]
              "
            >
              <Phone size={13} />
              Call Us
            </a>

            <a
              href="https://wa.me/919999999999"
              className="
                inline-flex
                items-center
                gap-1.5
                text-[10px]
                font-semibold
                text-[#25D366]
              "
            >
              <MessageCircle size={13} />
              WhatsApp
            </a>
          </div>
        </div>
      </aside>

      {/* =========================================================
          CALLBACK MODAL
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
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
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

                <p
                  className="
                    mt-2
                    text-xs
                    leading-5
                    text-gray-500
                  "
                >
                  Share your details and our travel
                  team will contact you shortly.
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
              className="mt-5 space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                setCallbackOpen(false);
              }}
            >
              <div>
                <label
                  className="
                    mb-1
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
                    focus:border-[#C89A3D]
                  "
                />
              </div>

              <div>
                <label
                  className="
                    mb-1
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
                    focus:border-[#C89A3D]
                  "
                />
              </div>

              <div>
                <label
                  className="
                    mb-1
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
                    focus:border-[#C89A3D]
                  "
                />
              </div>

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
                <Phone size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}