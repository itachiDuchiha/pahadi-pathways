"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
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
import { telUrl, whatsappUrl } from "@/config/site";
import {
  COMPLIMENTARY_CHILD_MAX_AGE,
  computePackagePrice,
  formatCurrency,
  mealOptions,
  packagePricingContext,
  stayOptions,
  vehicleOptions,
} from "@/lib/pricing";

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

  const [stay, setStay] = useState("Deluxe");

  const [meals, setMeals] = useState(
    "Breakfast + Dinner (MAP)"
  );

  const [vehicle, setVehicle] = useState(
    "Sedan"
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

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [enquiryError, setEnquiryError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent the page behind the enquiry modal from scrolling.
  useEffect(() => {
    if (!isEnquiryOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isEnquiryOpen]);

  /* =======================================================
     PRICING

     Shared with the package enquiry API so the server
     recomputes exactly what the visitor sees.
  ======================================================= */

  const pricingContext = packagePricingContext(pkg);
  const tourDays = pricingContext.tourDays;

  const {
    packageCost,
    gst,
    estimatedTotal,
    hasVehicleRates,
    adultRate,
    extraAdultPrice,
    childRate,
    childPrice,
    paidChildren,
    complimentaryChildren,
    stayPrice,
    mealPrice,
    vehicleUpgradePerDay,
    vehicleUpgradeTotal,
  } = computePackagePrice({
    ...pricingContext,
    stay,
    meals,
    vehicle,
    adults,
    childAges: children,
  });

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
    if (age < COMPLIMENTARY_CHILD_MAX_AGE) {
      return "Complimentary · No extra bed";
    }

    return `25% adult rate · ${formatCurrency(childRate)}`;
  };

  const packageName =
    "title" in pkg && typeof pkg.title === "string"
      ? pkg.title
      : "Himachal Tour Package";

  const buildEnquiryMessage = () => [
    "Hello The Himalayan Compass, I would like to enquire about this package:",
    "",
    `Package: ${packageName}`,
    `Name: ${customerName.trim()}`,
    `Phone: ${customerPhone.trim()}`,
    ...(customerEmail.trim() ? [`Email: ${customerEmail.trim()}`] : []),
    ...(travelDate ? [`Preferred travel date: ${travelDate}`] : []),
    `Adults: ${adults}`,
    `Children: ${children.length}${children.length ? ` (ages: ${children.join(", ")})` : ""}`,
    `Stay: ${stay}`,
    `Meals: ${meals}`,
    `Vehicle: ${vehicle}`,
    `Estimated package cost: ${formatCurrency(packageCost)}`,
    `GST (5%): ${formatCurrency(gst)}`,
    `Estimated total: ${formatCurrency(estimatedTotal)}`,
    "",
    "Please confirm availability and final pricing. Thank you.",
  ].join("\n");

  const handleEnquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnquiryError("");
    setIsSubmitting(true);

    const website = String(
      new FormData(event.currentTarget).get("website") ?? ""
    );

    // Open a blank tab during the direct user action so the browser does not
    // block the WhatsApp tab after the email request finishes.
    const whatsappWindow = window.open("about:blank", "_blank");

    const message = buildEnquiryMessage();

    try {
      const response = await fetch("/api/package-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "package",
          slug: pkg.slug,
          name: customerName.trim(),
          phone: customerPhone.trim(),
          email: customerEmail.trim(),
          travelDate,
          adults,
          childAges: children,
          stay,
          meals,
          vehicle,
          website,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "We could not send your enquiry. Please try again.");
      }

      const whatsappLink = whatsappUrl(message);

      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappLink;
      } else {
        window.open(whatsappLink, "_self");
      }

      setIsEnquiryOpen(false);
    } catch (error) {
      if (whatsappWindow) whatsappWindow.close();
      setEnquiryError(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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

            {hasVehicleRates ? (
              <span className="rounded-full bg-[#F4E5C3] px-2 py-[2px] text-[8px] font-bold text-[#8B6412]">
                {formatCurrency(adultRate)}/adult
              </span>
            ) : vehicleUpgradeTotal > 0 && (
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
                +{formatCurrency(vehicleUpgradePerDay)}/day
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
                  text-[10px]
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
                  text-[11px]
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
                text-[10px]
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
                  text-[12px]
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
                  text-[12px]
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
                    text-[10px]
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
                    text-[10px]
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
                      text-[11px]
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
                  text-[10px]
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
                            text-[11px]
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
                            text-[9.5px]
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
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#34445E]
                "
              >
                Price Summary
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
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
                text-[9px]
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
              space-y-2.5
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
                  text-[12px]
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
                  text-[12px]
                  font-bold
                  text-[#10264A]
                "
              >
                {formatCurrency(
                  adultRate +
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
                    text-[12px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Children · paid
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-[12px]
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
                    text-[12px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Children · complimentary
                </span>

                <span
                  className="
                    text-[12px]
                    font-bold
                    text-[#7A5B19]
                  "
                >
                  Included
                </span>
              </div>
            )}

            {/* Vehicle */}

            {!hasVehicleRates && vehicleUpgradeTotal > 0 && (
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
                    text-[12px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Vehicle upgrade · {tourDays} days
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-[12px]
                    font-bold
                    text-[#8B6412]
                  "
                >
                  +
                  {formatCurrency(vehicleUpgradeTotal)}
                </span>
              </div>
            )}

            {/* Stay adjustment */}

            {stayPrice !== 0 && (
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
                    text-[12px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Stay upgrade
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-[12px]
                    font-bold
                    text-[#8B6412]
                  "
                >
                  {stayPrice >
                  0
                    ? "+"
                    : ""}
                  {formatCurrency(
                    stayPrice
                  )}
                </span>
              </div>
            )}

            {/* Meal adjustment */}

            {mealPrice !== 0 && (
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
                    text-[12px]
                    font-medium
                    text-[#46536A]
                  "
                >
                  Meal adjustment
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-[12px]
                    font-bold
                    text-[#8B6412]
                  "
                >
                  {mealPrice >
                  0
                    ? "+"
                    : ""}
                  {formatCurrency(
                    mealPrice
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
                  text-[12px]
                  font-bold
                  text-[#34445E]
                "
              >
                Package Cost
              </span>

              <span
                className="
                  whitespace-nowrap
                  text-[13px]
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
                    text-[12px]
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
                    text-[9px]
                    font-bold
                    text-[#526078]
                  "
                >
                  5%
                </span>
              </div>

              <span
                className="
                  text-[12px]
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
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-[#7A5B19]
                  "
                >
                  Estimated Total
                </p>

                <p
                  className="
                    mt-0.5
                    text-[9px]
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
                  text-[24px]
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
          onClick={() => {
            setEnquiryError("");
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

      {isEnquiryOpen && typeof document !== "undefined" && createPortal((
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overscroll-contain bg-[#081526]/75 p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="package-enquiry-title"
          onClick={() => {
            if (!isSubmitting) {
              setIsEnquiryOpen(false);
            }
          }}
        >
          <div
            className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[#C89A3D]/40 bg-[#FBF8F0] shadow-2xl sm:max-h-[calc(100dvh-2rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#C89A3D]/25 bg-[#F7F0E0] px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B6412]">The Himalayan Compass</p>
                <h2 id="package-enquiry-title" className="mt-1 font-serif text-xl font-semibold text-[#10264A]">Request to Book</h2>
                <p className="mt-1 text-xs leading-5 text-[#526078]">Add your contact details. We’ll email your enquiry and open WhatsApp with the same details.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(false)}
                disabled={isSubmitting}
                aria-label="Close enquiry form"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9D1C3] bg-white text-2xl leading-none text-[#526078] transition hover:border-[#C89A3D] hover:bg-[#FBF8F0] disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEnquirySubmit} className="min-h-0 space-y-3.5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <div>
                <label htmlFor="package-customer-name" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#10264A]">Your name *</label>
                <input id="package-customer-name" type="text" autoComplete="name" required maxLength={100} value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Enter your name" className="w-full rounded-lg border border-[#D9D1C3] bg-white px-3.5 py-2.5 text-sm text-[#10264A] outline-none placeholder:text-gray-400 focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10" />
              </div>
              <div>
                <label htmlFor="package-customer-phone" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#10264A]">Mobile number *</label>
                <input id="package-customer-phone" type="tel" autoComplete="tel" required minLength={7} maxLength={20} value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="Enter your mobile number" className="w-full rounded-lg border border-[#D9D1C3] bg-white px-3.5 py-2.5 text-sm text-[#10264A] outline-none placeholder:text-gray-400 focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10" />
              </div>
              <div>
                <label htmlFor="package-customer-email" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#10264A]">Email address <span className="font-normal normal-case tracking-normal text-[#526078]">(optional)</span></label>
                <input id="package-customer-email" type="email" autoComplete="email" maxLength={254} value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-lg border border-[#D9D1C3] bg-white px-3.5 py-2.5 text-sm text-[#10264A] outline-none placeholder:text-gray-400 focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10" />
              </div>
              <div>
                <label htmlFor="package-travel-date" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#10264A]">Preferred travel date <span className="font-normal normal-case tracking-normal text-[#526078]">(optional)</span></label>
                <input id="package-travel-date" type="date" min={new Date().toISOString().split("T")[0]} value={travelDate} onChange={(event) => setTravelDate(event.target.value)} className="w-full rounded-lg border border-[#D9D1C3] bg-white px-3.5 py-2.5 text-sm text-[#10264A] outline-none focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10" />
              </div>

              {enquiryError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">{enquiryError}</p>}

              <button type="submit" disabled={isSubmitting} className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#C89A3D] px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#10264A] shadow-[0_6px_15px_rgba(200,154,61,0.25)] transition hover:bg-[#D5AA4F] disabled:cursor-not-allowed disabled:opacity-60">
                <MessageCircle size={14} />
                {isSubmitting ? "Sending Enquiry..." : "Send Enquiry & Continue to WhatsApp"}
              </button>
              <p className="text-center text-[10px] leading-4 text-[#526078]">Your enquiry is emailed first. WhatsApp then opens with the same message ready to send.</p>
            </form>
          </div>
        </div>
      ), document.body)}

    </aside>
  );
}