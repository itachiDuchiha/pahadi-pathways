"use client";

import Link from "next/link";

import { shouldShowConsentBanner } from "@/lib/consent";

import { useConsent } from "./ConsentProvider";

type Props = { text: string; enabled: boolean };

/**
 * Asks once, only while analytics is configured and no choice is stored.
 * Not part of the server render: it appears after hydration, once the
 * stored choice is known, so a returning visitor never sees it flash.
 * Fixed to the bottom of the viewport, so the page itself never shifts.
 */
export default function ConsentBanner({ text, enabled }: Props) {
  const { consent, accept, decline } = useConsent();

  if (!shouldShowConsentBanner(consent, enabled)) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Analytics cookies"
      className="fixed inset-x-0 bottom-0 z-[10000] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-[22px] border border-[#C89A3D]/30 bg-[#10264A] p-5 text-white shadow-[0_15px_45px_rgba(16,38,74,0.25)] sm:flex-row sm:items-center sm:gap-6">
        <p className="flex-1 text-[14px] leading-6 text-white/85">
          {text}{" "}
          <Link href="/privacy" className="font-semibold text-[#D9B255] underline hover:text-white">
            Privacy Policy
          </Link>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={decline}
            className="rounded-full border border-white/30 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:border-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-[#C89A3D] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#10264A] transition-colors hover:bg-[#D7AE57]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
