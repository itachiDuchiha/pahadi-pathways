"use client";

export default function CancellationPolicy() {
  return (
    <div className="pb-12 sm:pb-16">
      <div className="overflow-hidden rounded-2xl border border-[#10264A]/12 bg-white shadow-[0_8px_28px_rgba(16,38,74,0.06)]">

        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="border-b border-[#10264A]/10 bg-[#FAFAF8] px-6 py-5 sm:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
              Booking Information
            </p>

            <h2 className="mt-1 font-serif text-2xl font-medium text-[#10264A] sm:text-[28px]">
              Cancellation Policy
            </h2>

            <p className="mt-2 max-w-2xl text-[12px] leading-5 text-[#657286]">
              Cancellation charges and refund eligibility are based on the
              time remaining before the scheduled departure date.
            </p>
          </div>
        </div>

        {/* =========================================================
            CONTENT
        ========================================================= */}

        <div className="px-6 py-7 sm:px-8 sm:py-8">

          {/* =======================================================
              CANCELLATION SCHEDULE
          ======================================================= */}

          <div className="space-y-3">

            {/* 15 DAYS OR MORE */}

            <div className="rounded-xl border border-[#10264A]/[0.07] bg-[#FAFAF8] px-5 py-4">
              <div className="flex items-start gap-4">

                <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C89A3D]" />

                <div>
                  <p className="text-[14px] font-bold text-[#10264A]">
                    15 days or more before departure
                  </p>

                  <p className="mt-1 text-[13px] leading-6 text-[#52627A]">
                    100% refund of the tour cost.
                  </p>
                </div>

              </div>
            </div>

            {/* 14 TO 7 DAYS */}

            <div className="rounded-xl border border-[#10264A]/[0.07] bg-[#FAFAF8] px-5 py-4">
              <div className="flex items-start gap-4">

                <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C89A3D]" />

                <div>
                  <p className="text-[14px] font-bold text-[#10264A]">
                    14 to 7 days before departure
                  </p>

                  <p className="mt-1 text-[13px] leading-6 text-[#52627A]">
                    75% refund of the tour cost.
                  </p>
                </div>

              </div>
            </div>

            {/* 6 DAYS OR LESS */}

            <div className="rounded-xl border border-[#10264A]/[0.07] bg-[#FAFAF8] px-5 py-4">
              <div className="flex items-start gap-4">

                <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C89A3D]" />

                <div>
                  <p className="text-[14px] font-bold text-[#10264A]">
                    6 days or less / No-show
                  </p>

                  <p className="mt-1 text-[13px] leading-6 text-[#52627A]">
                    100% cancellation charges will apply and no refund will
                    be provided.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* =======================================================
              IMPORTANT NOTE
          ======================================================= */}

          <div className="mt-8 rounded-xl border border-[#C89A3D]/20 bg-[#FBF8F0] px-5 py-4 sm:px-6">

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#10264A]">
              Weather & Force Majeure
            </p>

            <p className="mt-2 text-[13px] leading-6 text-[#52627A]">
              In the event of road closures, severe weather, natural
              disruptions, government restrictions or other circumstances
              beyond reasonable control that result in changes to or
              curtailment of the trip, additional costs arising from extra
              accommodation, meals, transportation or other necessary
              arrangements will be borne by the traveller.
            </p>

          </div>

          {/* =======================================================
              FINAL NOTE
          ======================================================= */}

          <div className="mt-6 border-t border-[#10264A]/[0.07] pt-5">

            <p className="text-[11px] leading-5 text-[#7A8492]">
              Cancellation timelines are calculated with reference to the
              scheduled departure date of the confirmed tour.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}