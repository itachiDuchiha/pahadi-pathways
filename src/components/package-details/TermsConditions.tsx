"use client";

export default function TermsConditions() {
  return (
    <div className="py-10 sm:py-12">
      <div className="overflow-hidden rounded-2xl border border-[#10264A]/12 bg-white shadow-[0_8px_28px_rgba(16,38,74,0.06)]">

        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="border-b border-[#10264A]/10 bg-[#FAFAF8] px-6 py-5 sm:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
              Important Information
            </p>

            <h2 className="mt-1 font-serif text-2xl font-medium text-[#10264A] sm:text-[28px]">
              Terms & Conditions
            </h2>

            <p className="mt-2 max-w-2xl text-[12px] leading-5 text-[#657286]">
              Please review the following terms before confirming your tour
              with The Himalayan Compass.
            </p>
          </div>
        </div>

        {/* =========================================================
            CONTENT
        ========================================================= */}

        <div className="px-6 py-7 sm:px-8 sm:py-8">

          {/* =======================================================
              PRICING
          ======================================================= */}

          <div>
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Pricing
            </h3>

            <p className="mt-2 text-[14px] leading-7 text-[#52627A]">
              Package prices are subject to change and are confirmed at the
              time of booking. Rates may vary based on seasonality,
              accommodation and vehicle availability, fuel costs, local
              operating conditions, and other applicable rate changes.
            </p>
          </div>

          {/* =======================================================
              BOOKING & PAYMENT
          ======================================================= */}

          <div className="mt-7">
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Booking & Payment
            </h3>

            <ul className="mt-2 space-y-2 text-[14px] leading-7 text-[#52627A]">

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  50% advance is required at the time of booking confirmation.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  The remaining 50% must be paid at least 15 days before
                  the tour starts.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Booking confirmation is subject to receipt of the required
                  advance payment and confirmation of the agreed
                  accommodation, vehicle and itinerary.
                </span>
              </li>

            </ul>
          </div>

          {/* =======================================================
              ACCOMMODATION
          ======================================================= */}

          <div className="mt-7">
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Accommodation
            </h3>

            <ul className="mt-2 space-y-2 text-[14px] leading-7 text-[#52627A]">

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Accommodation is arranged in the selected hotel or a
                  similar-category property, subject to availability at the
                  time of booking.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  The applicable meal plan will be based on the option selected
                  and confirmed at the time of booking.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Standard hotel check-in and check-out times apply unless
                  otherwise confirmed by the property.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Specific room types, views, early check-in, late check-out
                  and other hotel requests are subject to availability and
                  hotel policy.
                </span>
              </li>

            </ul>
          </div>

          {/* =======================================================
              TRANSPORTATION
          ======================================================= */}

          <div className="mt-7">
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Transportation
            </h3>

            <ul className="mt-2 space-y-2 text-[14px] leading-7 text-[#52627A]">

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Transportation for the planned itinerary is provided in the
                  selected vehicle category arranged by The Himalayan Compass.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Fuel, applicable tolls and planned parking charges are
                  included as specified under the package inclusions.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Any additional transfers, route changes or sightseeing
                  outside the confirmed itinerary may be subject to
                  additional charges.
                </span>
              </li>

            </ul>
          </div>

          {/* =======================================================
              ITINERARY & MOUNTAIN TRAVEL
          ======================================================= */}

          <div className="mt-7">
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Itinerary & Mountain Travel
            </h3>

            <ul className="mt-2 space-y-2 text-[14px] leading-7 text-[#52627A]">

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Travel times and sightseeing schedules are approximate and
                  may change depending on road conditions, weather, traffic,
                  local restrictions and other circumstances.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  The order of sightseeing may be changed when necessary for
                  the safety, convenience or operational requirements of the
                  tour.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Weather conditions, snowfall, landslides, road closures,
                  traffic restrictions or local administrative decisions may
                  require changes to the planned itinerary.
                </span>
              </li>

            </ul>
          </div>

          {/* =======================================================
              AMENDMENTS
          ======================================================= */}

          <div className="mt-7">
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Amendments
            </h3>

            <ul className="mt-2 space-y-2 text-[14px] leading-7 text-[#52627A]">

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Any changes requested by the traveller after booking
                  confirmation may be subject to availability and applicable
                  additional charges.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />

                <span>
                  Changes to hotels, vehicle category, meal plan or itinerary
                  may result in a revised package price.
                </span>
              </li>

            </ul>
          </div>

          {/* =======================================================
              CANCELLATION
          ======================================================= */}

          <div className="mt-7">
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Cancellation
            </h3>

            <p className="mt-2 text-[14px] leading-7 text-[#52627A]">
              Cancellation charges and refund eligibility will be governed by
              the cancellation policy applicable to the confirmed booking.
              Please refer to the Cancellation Policy section for details.
            </p>
          </div>

          {/* =======================================================
              IMPORTANT NOTE
          ======================================================= */}

          <div className="mt-8 rounded-xl border border-[#C89A3D]/20 bg-[#FBF8F0] px-5 py-4">

            <p className="text-[12px] leading-6 text-[#52627A]">
              <span className="font-semibold text-[#10264A]">
                Important:
              </span>{" "}
              The final arrangements, pricing and services applicable to your
              tour will be based on the itinerary, accommodation, vehicle,
              meal plan and other services confirmed at the time of booking.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}