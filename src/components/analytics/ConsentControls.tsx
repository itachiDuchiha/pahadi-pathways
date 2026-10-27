"use client";

import { useConsent } from "./ConsentProvider";

const LABELS = {
  accepted: "You have accepted analytics cookies.",
  declined: "You have declined analytics cookies.",
  none: "You have not made a choice yet, so no analytics scripts run.",
} as const;

const BUTTON =
  "rounded-full border px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors disabled:cursor-default disabled:opacity-50";

/** "Change your choice" on the privacy page. */
export default function ConsentControls() {
  const { consent, accept, decline } = useConsent();

  return (
    <div className="mt-4 rounded-2xl border border-[#10264A]/10 bg-[#F8F7F3] p-5">
      <p className="font-serif text-[15px] leading-7 text-[#10264A]">{LABELS[consent ?? "none"]}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={accept}
          disabled={consent === "accepted"}
          className={`${BUTTON} border-[#C89A3D] bg-[#C89A3D] text-[#10264A] hover:bg-[#D7AE57]`}
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={decline}
          disabled={consent === "declined"}
          className={`${BUTTON} border-[#10264A]/20 bg-white text-[#10264A] hover:border-[#C89A3D]`}
        >
          Decline analytics
        </button>
      </div>
    </div>
  );
}
