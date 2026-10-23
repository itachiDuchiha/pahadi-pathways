import { formatCurrency } from "@/lib/pricing";
import type { BookingPrice } from "@/components/package-details/booking/useBookingState";

type Props = {
  price: BookingPrice;
  adults: number;
  totalTravellers: number;
  tourDays: number;
};

export default function PriceSummary({
  price,
  adults,
  totalTravellers,
  tourDays,
}: Props) {
  const {
    packageCost,
    gst,
    estimatedTotal,
    hasVehicleRates,
    adultRate,
    extraAdultPrice,
    childPrice,
    paidChildren,
    complimentaryChildren,
    stayPrice,
    mealPrice,
    vehicleUpgradeTotal,
  } = price;

  return (
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
  );
}
