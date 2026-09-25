"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  Minus,
  Plus,
  MessageCircle,
  Phone,
  Users,
  Check,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

/* =========================================================
   TYPES
========================================================= */

type StayOption = {
  label: string;
  price: number;
};

type MealOption = {
  label: string;
  price: number;
};

type VehicleOption = {
  label: string;
  price: number;
};

/* =========================================================
   OPTIONS

   Keep these simple and easy to modify later.
========================================================= */

const stayOptions: StayOption[] = [
  {
    label: "Deluxe",
    price: 0,
  },
  {
    label: "Premium",
    price: 2500,
  },
  {
    label: "Luxury",
    price: 5000,
  },
];

const mealOptions: MealOption[] = [
  {
    label: "Breakfast + Dinner (MAP)",
    price: 0,
  },
  {
    label: "Breakfast Only (CP)",
    price: -2500,
  },
  {
    label: "Breakfast + Lunch + Dinner (AP)",
    price: 3500,
  },
];

const vehicleOptions: VehicleOption[] = [
  {
    label: "Sedan",
    price: 0,
  },
  {
    label: "Ertiga / Rumion or similar",
    price: 1000,
  },
  {
    label: "Innova Crysta or similar",
    price: 2000,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function formatCurrency(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function PackageBookingPanel({
  pkg,
}: Props) {
  /* =======================================================
     BASIC PACKAGE PRICE

     Package price is treated as the price for 2 adults.
  ======================================================= */

  const basePackagePrice = Number(pkg.price) || 0;

  const adultRate = Math.round(
    basePackagePrice / 2
  );

  /* =======================================================
     STATE
  ======================================================= */

  const [stay, setStay] = useState("Deluxe");

  const [meals, setMeals] = useState(
    "Breakfast + Dinner (MAP)"
  );

  const [vehicle, setVehicle] = useState(
    "Ertiga / Rumion or similar"
  );

  const [adults, setAdults] = useState(2);

  /*
    Each child is represented by their age.

    Example:

    [4, 7, 9]

    means:

    Child 1 = 4 years
    Child 2 = 7 years
    Child 3 = 9 years
  */

  const [children, setChildren] = useState<number[]>(
    []
  );

  const [isChildAgeOpen, setIsChildAgeOpen] =
    useState(false);

  /* =======================================================
     SELECTED OPTIONS
  ======================================================= */

  const selectedStay = useMemo(
    () =>
      stayOptions.find(
        (option) => option.label === stay
      ) ?? stayOptions[0],
    [stay]
  );

  const selectedMeal = useMemo(
    () =>
      mealOptions.find(
        (option) => option.label === meals
      ) ?? mealOptions[0],
    [meals]
  );

  const selectedVehicle = useMemo(
    () =>
      vehicleOptions.find(
        (option) => option.label === vehicle
      ) ?? vehicleOptions[0],
    [vehicle]
  );

  /* =======================================================
     CHILD PRICING

     Under 5:
       Complimentary
       No extra bed

     5–10:
       25% of adult rate
  ======================================================= */

  const complimentaryChildren = children.filter(
    (age) => age < 5
  );

  const paidChildren = children.filter(
    (age) => age >= 5
  );

  const childPrice = paidChildren.length * Math.round(
    adultRate * 0.25
  );

  /* =======================================================
     EXTRA ADULT PRICING

     Base package already covers 2 adults.

     Every adult above 2 is charged at the
     calculated adult rate.
  ======================================================= */

  const extraAdults = Math.max(
    0,
    adults - 2
  );

  const extraAdultPrice =
    extraAdults * adultRate;

  /* =======================================================
     PACKAGE CALCULATION
  ======================================================= */

  const packageAdjustment =
    extraAdultPrice +
    childPrice +
    selectedStay.price +
    selectedMeal.price;

  const packageCostBeforeVehicle =
    basePackagePrice +
    packageAdjustment;

  const packageCost =
    packageCostBeforeVehicle +
    selectedVehicle.price;

  /* =======================================================
     GST

     Current package uses 5% GST.
  ======================================================= */

  const gst = Math.round(
    packageCost * 0.05
  );

  const estimatedTotal =
    packageCost + gst;

  /* =======================================================
     TRAVELLER COUNT
  ======================================================= */

  const totalTravellers =
    adults + children.length;

  /* =======================================================
     ADULT CONTROLS
  ======================================================= */

  const decreaseAdults = () => {
    setAdults((current) =>
      Math.max(1, current - 1)
    );
  };

  const increaseAdults = () => {
    setAdults((current) =>
      Math.min(10, current + 1)
    );
  };

  /* =======================================================
     CHILD CONTROLS
  ======================================================= */

  const addChild = (age: number) => {
    if (children.length >= 6) {
      return;
    }

    setChildren((current) => [
      ...current,
      age,
    ]);

    setIsChildAgeOpen(false);
  };

  const removeChild = (index: number) => {
    setChildren((current) =>
      current.filter(
        (_, childIndex) =>
          childIndex !== index
      )
    );
  };

  /* =======================================================
     AGE LABEL
  ======================================================= */

  const getChildPricingLabel = (
    age: number
  ) => {
    if (age < 5) {
      return "Complimentary · No extra bed";
    }

    return `25% adult rate · ${formatCurrency(
      Math.round(adultRate * 0.25)
    )}`;
  };

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

        <div>
          <label
            htmlFor="booking-stay"
            className="
              mb-1.5
              block
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#526078]
            "
          >
            Stay
          </label>

          <div className="relative">
            <select
              id="booking-stay"
              value={stay}
              onChange={(event) =>
                setStay(event.target.value)
              }
              className="
                h-10
                w-full
                appearance-none
                rounded-[10px]
                border
                border-[#C8BFAF]
                bg-[#FFFDF8]
                px-3
                pr-9
                text-[12px]
                font-medium
                text-[#10264A]
                outline-none
                transition
                focus:border-[#C89A3D]
                focus:ring-2
                focus:ring-[#C89A3D]/15
              "
            >
              {stayOptions.map(
                (option) => (
                  <option
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>

            <ChevronDown
              size={14}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[#46536A]
              "
            />
          </div>
        </div>

        {/* =================================================
            MEALS
        ================================================= */}

        <div>
          <label
            htmlFor="booking-meals"
            className="
              mb-1.5
              block
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#526078]
            "
          >
            Meals
          </label>

          <div className="relative">
            <select
              id="booking-meals"
              value={meals}
              onChange={(event) =>
                setMeals(event.target.value)
              }
              className="
                h-10
                w-full
                appearance-none
                rounded-[10px]
                border
                border-[#C8BFAF]
                bg-[#FFFDF8]
                px-3
                pr-9
                text-[12px]
                font-medium
                text-[#10264A]
                outline-none
                transition
                focus:border-[#C89A3D]
                focus:ring-2
                focus:ring-[#C89A3D]/15
              "
            >
              {mealOptions.map(
                (option) => (
                  <option
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>

            <ChevronDown
              size={14}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[#46536A]
              "
            />
          </div>
        </div>

        {/* =================================================
            VEHICLE
        ================================================= */}

        <div>
          <div
            className="
              mb-1.5
              flex
              items-center
              justify-between
              gap-2
            "
          >
            <label
              htmlFor="booking-vehicle"
              className="
                block
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#526078]
              "
            >
              Vehicle
            </label>

            {selectedVehicle.price > 0 && (
              <span
                className="
                  rounded-full
                  bg-[#F4E5C3]
                  px-2
                  py-[2px]
                  text-[8px]
                  font-bold
                  text-[#8B6412]
                "
              >
                +{formatCurrency(
                  selectedVehicle.price
                )}
              </span>
            )}
          </div>

          <div className="relative">
            <select
              id="booking-vehicle"
              value={vehicle}
              onChange={(event) =>
                setVehicle(event.target.value)
              }
              className="
                h-10
                w-full
                appearance-none
                rounded-[10px]
                border
                border-[#C8BFAF]
                bg-[#FFFDF8]
                px-3
                pr-9
                text-[12px]
                font-medium
                text-[#10264A]
                outline-none
                transition
                focus:border-[#C89A3D]
                focus:ring-2
                focus:ring-[#C89A3D]/15
              "
            >
              {vehicleOptions.map(
                (option) => (
                  <option
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>

            <ChevronDown
              size={14}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[#46536A]
              "
            />
          </div>
        </div>

        {/* =================================================
            TRAVELLERS
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-[12px]
            border
            border-[#C8BFAF]
            bg-[#FFFDF8]
          "
        >

          {/* Traveller heading */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#D9D1C3]
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
                  tracking-[0.18em]
                  text-[#34445E]
                "
              >
                Travellers
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  font-medium
                  text-[#526078]
                "
              >
                Who is travelling?
              </p>
            </div>

            <span
              className="
                rounded-full
                border
                border-[#C8BFAF]
                bg-[#F8F3E8]
                px-2
                py-1
                text-[9px]
                font-semibold
                text-[#34445E]
              "
            >
              {totalTravellers}{" "}
              {totalTravellers === 1
                ? "Traveller"
                : "Travellers"}
            </span>

          </div>

          {/* =================================================
              ADULTS
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              border-b
              border-[#E1DBD1]
              px-3
              py-2.5
            "
          >

            <div>
              <p
                className="
                  text-[12px]
                  font-semibold
                  text-[#10264A]
                "
              >
                Adults
              </p>
            </div>

            <div
              className="
                flex
                h-8
                items-center
                rounded-full
                border
                border-[#D3C9B9]
                bg-white
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
                  text-[#46536A]
                  transition
                  hover:bg-[#F7F0E0]
                  disabled:cursor-not-allowed
                  disabled:text-[#B7B2AA]
                "
              >
                <Minus size={12} />
              </button>

              <span
                className="
                  min-w-[26px]
                  text-center
                  text-[11px]
                  font-bold
                  text-[#10264A]
                "
              >
                {adults}
              </span>

              <button
                type="button"
                onClick={increaseAdults}
                disabled={adults >= 10}
                aria-label="Increase adults"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  text-[#9A6D0F]
                  transition
                  hover:bg-[#F7F0E0]
                  disabled:cursor-not-allowed
                  disabled:text-[#B7B2AA]
                "
              >
                <Plus size={12} />
              </button>

            </div>
          </div>

          {/* =================================================
              CHILDREN
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              px-3
              py-2.5
            "
          >

            <div>
              <p
                className="
                  text-[12px]
                  font-semibold
                  text-[#10264A]
                "
              >
                Children
              </p>
            </div>

            <div
              className="
                flex
                h-8
                items-center
                rounded-full
                border
                border-[#D3C9B9]
                bg-white
              "
            >

              <button
                type="button"
                onClick={() => {
                  if (children.length > 0) {
                    removeChild(
                      children.length - 1
                    );
                  }
                }}
                disabled={
                  children.length === 0
                }
                aria-label="Remove child"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  text-[#46536A]
                  transition
                  hover:bg-[#F7F0E0]
                  disabled:cursor-not-allowed
                  disabled:text-[#B7B2AA]
                "
              >
                <Minus size={12} />
              </button>

              <span
                className="
                  min-w-[26px]
                  text-center
                  text-[11px]
                  font-bold
                  text-[#10264A]
                "
              >
                {children.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setIsChildAgeOpen(
                    (current) => !current
                  )
                }
                disabled={
                  children.length >= 6
                }
                aria-label="Add child"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  text-[#9A6D0F]
                  transition
                  hover:bg-[#F7F0E0]
                  disabled:cursor-not-allowed
                  disabled:text-[#B7B2AA]
                "
              >
                <Plus size={12} />
              </button>

            </div>
          </div>

          {/* =================================================
              CHILD AGE SELECTOR
          ================================================= */}

          {isChildAgeOpen && (
            <div
              className="
                border-t
                border-[#E1DBD1]
                bg-[#FAF7EF]
                px-3
                py-2.5
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
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[#526078]
                  "
                >
                  Select child age
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setIsChildAgeOpen(
                      false
                    )
                  }
                  className="
                    text-[9px]
                    font-semibold
                    text-[#8B6412]
                    hover:underline
                  "
                >
                  Close
                </button>
              </div>

              <div
                className="
                  grid
                  grid-cols-5
                  gap-1.5
                "
              >
                {Array.from(
                  { length: 10 },
                  (_, index) => index + 1
                ).map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() =>
                      addChild(age)
                    }
                    className="
                      rounded-[7px]
                      border
                      border-[#D3C9B9]
                      bg-white
                      py-1.5
                      text-[10px]
                      font-semibold
                      text-[#10264A]
                      transition
                      hover:border-[#C89A3D]
                      hover:bg-[#F7F0E0]
                    "
                  >
                    {age}
                  </button>
                ))}
              </div>

              <p
                className="
                  mt-2
                  text-[9px]
                  leading-4
                  text-[#526078]
                "
              >
                Under 5: complimentary
                without an extra bed.
                Ages 5–10: 25% of adult
                rate.
              </p>

            </div>
          )}

          {/* =================================================
              SELECTED CHILDREN
          ================================================= */}

          {children.length > 0 && (
            <div
              className="
                border-t
                border-[#E1DBD1]
                bg-[#FCFAF5]
                px-3
                py-2.5
              "
            >

              <div
                className="
                  space-y-1.5
                "
              >
                {children.map(
                  (age, index) => (
                    <div
                      key={`${age}-${index}`}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-2
                        rounded-[8px]
                        border
                        border-[#E2D9C8]
                        bg-white
                        px-2.5
                        py-1.5
                      "
                    >

                      <div>
                        <p
                          className="
                            text-[10px]
                            font-semibold
                            text-[#10264A]
                          "
                        >
                          Child {index + 1}
                          {" · "}
                          {age} years
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-[8.5px]
                            font-medium
                            text-[#526078]
                          "
                        >
                          {getChildPricingLabel(
                            age
                          )}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeChild(index)
                        }
                        aria-label={`Remove child ${
                          index + 1
                        }`}
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-[#7A5B19]
                          transition
                          hover:bg-[#F7F0E0]
                        "
                      >
                        <Minus
                          size={11}
                        />
                      </button>

                    </div>
                  )
                )}
              </div>

            </div>
          )}

        </div>

        {/* =================================================
            PRICE SUMMARY
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-[13px]
            border
            border-[#C89A3D]/35
            bg-[#F7F0E0]
            shadow-[0_4px_14px_rgba(16,38,74,0.05)]
          "
        >

          {/* Price header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#DCCBA8]
              px-3.5
              py-2.5
            "
          >

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-[#34445E]
                "
              >
                Price Summary
              </p>

              <p
                className="
                  mt-0.5
                  text-[9px]
                  font-medium
                  text-[#526078]
                "
              >
                Estimated trip cost
              </p>
            </div>

            <span
              className="
                rounded-full
                bg-white
                px-2
                py-1
                text-[8px]
                font-bold
                text-[#34445E]
                shadow-sm
              "
            >
              {totalTravellers}{" "}
              {totalTravellers === 1
                ? "Traveller"
                : "Travellers"}
            </span>

          </div>

          {/* Price lines */}

          <div
            className="
              space-y-2
              px-3.5
              py-3
            "
          >

            {/* Package */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <span
                className="
                  text-[10px]
                  font-medium
                  text-[#46536A]
                "
              >
                Package
                {adults > 2 &&
                  ` · ${adults} adults`}
              </span>

              <span
                className="
                  whitespace-nowrap
                  text-[10px]
                  font-bold
                  text-[#10264A]
                "
              >
                {formatCurrency(
                  basePackagePrice +
                    extraAdultPrice
                )}
              </span>
            </div>

            {/* Extra children */}

            {paidChildren.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Children · paid
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-[10px]
                    font-bold
                    text-[#10264A]
                  "
                >
                  +
                  {formatCurrency(
                    childPrice
                  )}
                </span>
              </div>
            )}

            {/* Complimentary children */}

            {complimentaryChildren.length >
              0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Children · complimentary
                </span>

                <span
                  className="
                    text-[10px]
                    font-bold
                    text-[#7A5B19]
                  "
                >
                  Included
                </span>
              </div>
            )}

            {/* Vehicle */}

            {selectedVehicle.price > 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Vehicle upgrade
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-[10px]
                    font-bold
                    text-[#8B6412]
                  "
                >
                  +
                  {formatCurrency(
                    selectedVehicle.price
                  )}
                </span>
              </div>
            )}

            {/* Stay adjustment */}

            {selectedStay.price !== 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Stay upgrade
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-[10px]
                    font-bold
                    text-[#8B6412]
                  "
                >
                  {selectedStay.price >
                  0
                    ? "+"
                    : ""}
                  {formatCurrency(
                    selectedStay.price
                  )}
                </span>
              </div>
            )}

            {/* Meal adjustment */}

            {selectedMeal.price !== 0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Meal adjustment
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-[10px]
                    font-bold
                    text-[#8B6412]
                  "
                >
                  {selectedMeal.price >
                  0
                    ? "+"
                    : ""}
                  {formatCurrency(
                    selectedMeal.price
                  )}
                </span>
              </div>
            )}

            {/* Divider */}

            <div
              className="
                border-t
                border-dashed
                border-[#CDBE9F]
              "
            />

            {/* Package Cost */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  text-[#34445E]
                "
              >
                Package Cost
              </span>

              <span
                className="
                  whitespace-nowrap
                  text-[11px]
                  font-extrabold
                  text-[#10264A]
                "
              >
                {formatCurrency(
                  packageCost
                )}
              </span>
            </div>

            {/* GST */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >
                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[#526078]
                  "
                >
                  GST
                </span>

                <span
                  className="
                    rounded-full
                    bg-white
                    px-1.5
                    py-0.5
                    text-[7px]
                    font-bold
                    text-[#526078]
                  "
                >
                  5%
                </span>
              </div>

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-[#46536A]
                "
              >
                {formatCurrency(gst)}
              </span>

            </div>

          </div>

          {/* =================================================
              ESTIMATED TOTAL
          ================================================= */}

          <div
            className="
              mx-3
              mb-3
              rounded-[10px]
              border
              border-[#C89A3D]/45
              bg-[#F0E2C2]
              px-3
              py-2.5
              shadow-[0_4px_10px_rgba(16,38,74,0.06)]
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
                    tracking-[0.16em]
                    text-[#7A5B19]
                  "
                >
                  Estimated Total
                </p>

                <p
                  className="
                    mt-0.5
                    text-[7.5px]
                    font-medium
                    text-[#526078]
                  "
                >
                  Inclusive of GST
                </p>
              </div>

              <p
                className="
                  whitespace-nowrap
                  text-[20px]
                  font-extrabold
                  tracking-tight
                  text-[#10264A]
                "
              >
                {formatCurrency(
                  estimatedTotal
                )}
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            REQUEST TO BOOK
        ================================================= */}

        <button
          type="button"
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
              href="tel:+919876543210"
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
              href="https://wa.me/919876543210"
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

    </aside>
  );
}