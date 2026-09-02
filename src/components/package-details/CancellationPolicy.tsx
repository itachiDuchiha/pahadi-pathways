"use client";

export default function CancellationPolicy() {
  return (
    <div className="pb-12 sm:pb-16">
      <div className="rounded-2xl border border-[#10264A]/12 bg-white shadow-[0_8px_28px_rgba(16,38,74,0.06)] overflow-hidden">

        {/* HEADER */}
        <div className="border-b border-[#10264A]/10 bg-[#FAFAF8] px-6 py-5 sm:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
              Booking Information
            </p>

            <h2 className="mt-1 font-serif text-2xl font-medium text-[#10264A] sm:text-[28px]">
              Cancellation Policy
            </h2>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-7 sm:px-8 sm:py-8">

          <div className="space-y-5">

            {/* 15 DAYS OR MORE */}
            <div className="flex gap-4">
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#DDBE73]" />

              <p className="text-[14px] leading-7 text-[#52627A]">
                <span className="font-bold text-[#10264A]">
                  15 days or more before departure:
                </span>{" "}
                100% refund of the tour cost.
              </p>
            </div>

            {/* 14 TO 7 DAYS */}
            <div className="flex gap-4">
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#DDBE73]" />

              <p className="text-[14px] leading-7 text-[#52627A]">
                <span className="font-bold text-[#10264A]">
                  14 to 7 days before departure:
                </span>{" "}
                75% refund of the tour cost.
              </p>
            </div>

            {/* 6 DAYS OR LESS */}
            <div className="flex gap-4">
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#DDBE73]" />

              <p className="text-[14px] leading-7 text-[#52627A]">
                <span className="font-bold text-[#10264A]">
                  6 days or less / No Show:
                </span>{" "}
                100% cancellation charges will apply.
              </p>
            </div>

          </div>

          {/* IMPORTANT NOTE */}
          <div className="mt-8 rounded-xl border border-[#DDBE73]/40 bg-[#FBF8EF] px-5 py-5 sm:px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#10264A]">
              Important Note
            </p>

            <p className="mt-2 text-[14px] leading-7 text-[#52627A]">
              In case of road closures or trip curtailment due to weather
              or force majeure, additional costs for extra nights, meals,
              or transport will be borne by the traveler.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}