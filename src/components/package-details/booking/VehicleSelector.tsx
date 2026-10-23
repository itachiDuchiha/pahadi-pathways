import { ChevronDown } from "lucide-react";

import { formatCurrency, vehicleOptions } from "@/lib/pricing";
import type { BookingPrice } from "@/components/package-details/booking/useBookingState";

type Props = {
  vehicle: string;
  setVehicle: (value: string) => void;
  price: BookingPrice;
};

export default function VehicleSelector({
  vehicle,
  setVehicle,
  price,
}: Props) {
  const {
    hasVehicleRates,
    adultRate,
    vehicleUpgradePerDay,
    vehicleUpgradeTotal,
  } = price;

  return (
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
  );
}
