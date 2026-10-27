import { useState } from "react";

import type { Package, PricingTables } from "@/lib/cms/types";
import {
  computePackagePrice,
  packagePricingContext,
} from "@/lib/pricing";

export type BookingPrice = ReturnType<typeof computePackagePrice>;

/* =========================================================
   BOOKING STATE

   Holds the visitor's selections and derives the price
   from them.
========================================================= */

export function useBookingState(pkg: Package, tables: PricingTables) {
  /* =======================================================
     STATE
  ======================================================= */

  const [stay, setStay] = useState(tables.stayOptions[0].label);

  const [meals, setMeals] = useState(
    tables.mealOptions[0].label
  );

  const [vehicle, setVehicle] = useState(
    tables.vehicleOptions[0].label
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

  /* =======================================================
     PRICING

     Shared with the package enquiry API so the server
     recomputes exactly what the visitor sees.
  ======================================================= */

  const pricingContext = packagePricingContext(pkg);
  const tourDays = pricingContext.tourDays;

  const price = computePackagePrice(
    {
      package: pricingContext,
      stay,
      meals,
      vehicle,
      adults,
      childAges: children,
    },
    tables
  );

  return {
    stay,
    setStay,
    meals,
    setMeals,
    vehicle,
    setVehicle,
    adults,
    setAdults,
    childAges: children,
    setChildAges: setChildren,
    tourDays,
    price,
  };
}
