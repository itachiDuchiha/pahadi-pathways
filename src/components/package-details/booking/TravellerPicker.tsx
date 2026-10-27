"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { Minus, Plus } from "lucide-react";

import { formatCurrency } from "@/lib/pricing";

type Props = {
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  childAges: number[];
  setChildAges: Dispatch<SetStateAction<number[]>>;
  totalTravellers: number;
  childRate: number;
  /** Children younger than this travel free. */
  childFreeUnderAge: number;
  /** Paying children's share of the adult rate, in percent. */
  childPercentOfAdult: number;
};

export default function TravellerPicker({
  adults,
  setAdults,
  childAges: children,
  setChildAges: setChildren,
  totalTravellers,
  childRate,
  childFreeUnderAge,
  childPercentOfAdult,
}: Props) {
  const [isChildAgeOpen, setIsChildAgeOpen] =
    useState(false);

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
    if (age < childFreeUnderAge) {
      return "Complimentary · No extra bed";
    }

    return `${childPercentOfAdult}% adult rate · ${formatCurrency(childRate)}`;
  };

  return (
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
                {`Under ${childFreeUnderAge}: complimentary without an extra bed. Ages ${childFreeUnderAge}–10: ${childPercentOfAdult}% of adult rate.`}
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
  );
}
