"use client";

export default function TermsConditions() {
  return (
    <div className="py-10 sm:py-12">
      <div className="rounded-2xl border border-[#10264A]/12 bg-white shadow-[0_8px_28px_rgba(16,38,74,0.06)] overflow-hidden">

        {/* HEADER */}
        <div className="border-b border-[#10264A]/10 bg-[#FAFAF8] px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
                Important Information
              </p>

              <h2 className="mt-1 font-serif text-2xl font-medium text-[#10264A] sm:text-[28px]">
                Terms & Conditions
              </h2>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-7 sm:px-8 sm:py-8">

          {/* PRICING */}
          <div>
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Pricing
            </h3>

            <p className="mt-2 text-[14px] leading-7 text-[#52627A]">
              Prices are valid until 15 October 2026. Prices may vary
              depending on the season, availability, and applicable rate
              changes.
            </p>
          </div>

          {/* BOOKING & PAYMENT */}
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
            </ul>
          </div>

          {/* ACCOMMODATION */}
          <div className="mt-7">
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Accommodation
            </h3>

            <ul className="mt-2 space-y-2 text-[14px] leading-7 text-[#52627A]">
              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />
                <span>
                  Standard check-in and check-out time at all properties is
                  12:00 PM (Noon).
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />
                <span>
                  All mentioned rates are per person based on twin-sharing
                  accommodation.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />
                <span>
                  Room hold will be valid for 72 hours only.
                </span>
              </li>
            </ul>
          </div>

          {/* ELIGIBILITY */}
          <div className="mt-7">
            <h3 className="text-[15px] font-bold text-[#10264A]">
              Eligibility & Amendments
            </h3>

            <ul className="mt-2 space-y-2 text-[14px] leading-7 text-[#52627A]">
              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />
                <span>
                  The above rates are strictly applicable to resident Indian
                  citizens only.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDBE73]" />
                <span>
                  Any amendment or cancellation made before 15 days of
                  tour commencement will incur communication charges of
                  ₹500 per person.
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}