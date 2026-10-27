import { ChevronDown } from "lucide-react";

import type { PriceOption } from "@/lib/cms/types";

type Props = {
  meals: string;
  setMeals: (value: string) => void;
  options: PriceOption[];
};

export default function MealSelector({
  meals,
  setMeals,
  options,
}: Props) {
  return (
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
              {options.map(
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
