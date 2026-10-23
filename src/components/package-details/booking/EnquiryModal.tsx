"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import type { Package } from "@/data/packages";
import { site, whatsappUrl } from "@/config/site";
import { useTodayIso } from "@/lib/hooks/useTodayIso";
import { formatCurrency } from "@/lib/pricing";
import type { BookingPrice } from "@/components/package-details/booking/useBookingState";

type Props = {
  pkg: Package;
  isEnquiryOpen: boolean;
  setIsEnquiryOpen: (open: boolean) => void;
  stay: string;
  meals: string;
  vehicle: string;
  adults: number;
  childAges: number[];
  price: BookingPrice;
};

export default function EnquiryModal({
  pkg,
  isEnquiryOpen,
  setIsEnquiryOpen,
  stay,
  meals,
  vehicle,
  adults,
  childAges: children,
  price,
}: Props) {
  const { packageCost, gst, estimatedTotal } = price;

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [enquiryError, setEnquiryError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // `undefined` on the server and on the initial client render, then
  // today's date once the client's external clock is read, so server and
  // client markup match (no hydration mismatch).
  const minTravelDate = useTodayIso();

  // Prevent the page behind the enquiry modal from scrolling.
  useEffect(() => {
    if (!isEnquiryOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isEnquiryOpen]);

  // Clear any previous error each time the modal is opened.
  const [wasEnquiryOpen, setWasEnquiryOpen] = useState(isEnquiryOpen);

  if (isEnquiryOpen !== wasEnquiryOpen) {
    setWasEnquiryOpen(isEnquiryOpen);

    if (isEnquiryOpen) {
      setEnquiryError("");
    }
  }

  const packageName =
    "title" in pkg && typeof pkg.title === "string"
      ? pkg.title
      : "Himachal Tour Package";

  const buildEnquiryMessage = () => [
    `Hello ${site.name}, I would like to enquire about this package:`,
    "",
    `Package: ${packageName}`,
    `Name: ${customerName.trim()}`,
    `Phone: ${customerPhone.trim()}`,
    ...(customerEmail.trim() ? [`Email: ${customerEmail.trim()}`] : []),
    ...(travelDate ? [`Preferred travel date: ${travelDate}`] : []),
    `Adults: ${adults}`,
    `Children: ${children.length}${children.length ? ` (ages: ${children.join(", ")})` : ""}`,
    `Stay: ${stay}`,
    `Meals: ${meals}`,
    `Vehicle: ${vehicle}`,
    `Estimated package cost: ${formatCurrency(packageCost)}`,
    `GST (5%): ${formatCurrency(gst)}`,
    `Estimated total: ${formatCurrency(estimatedTotal)}`,
    "",
    "Please confirm availability and final pricing. Thank you.",
  ].join("\n");

  const handleEnquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnquiryError("");
    setIsSubmitting(true);

    const website = String(
      new FormData(event.currentTarget).get("website") ?? ""
    );

    // Open a blank tab during the direct user action so the browser does not
    // block the WhatsApp tab after the email request finishes.
    const whatsappWindow = window.open("about:blank", "_blank");

    const message = buildEnquiryMessage();

    try {
      const response = await fetch("/api/package-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "package",
          slug: pkg.slug,
          name: customerName.trim(),
          phone: customerPhone.trim(),
          email: customerEmail.trim(),
          travelDate,
          adults,
          childAges: children,
          stay,
          meals,
          vehicle,
          website,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "We could not send your enquiry. Please try again.");
      }

      const whatsappLink = whatsappUrl(message);

      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappLink;
      } else {
        window.open(whatsappLink, "_self");
      }

      setIsEnquiryOpen(false);
    } catch (error) {
      if (whatsappWindow) whatsappWindow.close();
      setEnquiryError(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isEnquiryOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal((
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overscroll-contain bg-[#081526]/75 p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="package-enquiry-title"
          onClick={() => {
            if (!isSubmitting) {
              setIsEnquiryOpen(false);
            }
          }}
        >
          <div
            className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[#C89A3D]/40 bg-[#FBF8F0] shadow-2xl sm:max-h-[calc(100dvh-2rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#C89A3D]/25 bg-[#F7F0E0] px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B6412]">{site.name}</p>
                <h2 id="package-enquiry-title" className="mt-1 font-serif text-xl font-semibold text-[#10264A]">Request to Book</h2>
                <p className="mt-1 text-xs leading-5 text-[#526078]">Add your contact details. We’ll email your enquiry and open WhatsApp with the same details.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(false)}
                disabled={isSubmitting}
                aria-label="Close enquiry form"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9D1C3] bg-white text-2xl leading-none text-[#526078] transition hover:border-[#C89A3D] hover:bg-[#FBF8F0] disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEnquirySubmit} className="min-h-0 space-y-3.5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <div>
                <label htmlFor="package-customer-name" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#10264A]">Your name *</label>
                <input id="package-customer-name" type="text" autoComplete="name" required maxLength={100} value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Enter your name" className="w-full rounded-lg border border-[#D9D1C3] bg-white px-3.5 py-2.5 text-sm text-[#10264A] outline-none placeholder:text-gray-400 focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10" />
              </div>
              <div>
                <label htmlFor="package-customer-phone" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#10264A]">Mobile number *</label>
                <input id="package-customer-phone" type="tel" autoComplete="tel" required minLength={7} maxLength={20} value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="Enter your mobile number" className="w-full rounded-lg border border-[#D9D1C3] bg-white px-3.5 py-2.5 text-sm text-[#10264A] outline-none placeholder:text-gray-400 focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10" />
              </div>
              <div>
                <label htmlFor="package-customer-email" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#10264A]">Email address <span className="font-normal normal-case tracking-normal text-[#526078]">(optional)</span></label>
                <input id="package-customer-email" type="email" autoComplete="email" maxLength={254} value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-lg border border-[#D9D1C3] bg-white px-3.5 py-2.5 text-sm text-[#10264A] outline-none placeholder:text-gray-400 focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10" />
              </div>
              <div>
                <label htmlFor="package-travel-date" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#10264A]">Preferred travel date <span className="font-normal normal-case tracking-normal text-[#526078]">(optional)</span></label>
                <input id="package-travel-date" type="date" min={minTravelDate} value={travelDate} onChange={(event) => setTravelDate(event.target.value)} className="w-full rounded-lg border border-[#D9D1C3] bg-white px-3.5 py-2.5 text-sm text-[#10264A] outline-none focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10" />
              </div>

              {enquiryError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">{enquiryError}</p>}

              <button type="submit" disabled={isSubmitting} className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#C89A3D] px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#10264A] shadow-[0_6px_15px_rgba(200,154,61,0.25)] transition hover:bg-[#D5AA4F] disabled:cursor-not-allowed disabled:opacity-60">
                <MessageCircle size={14} />
                {isSubmitting ? "Sending Enquiry..." : "Send Enquiry & Continue to WhatsApp"}
              </button>
              <p className="text-center text-[10px] leading-4 text-[#526078]">Your enquiry is emailed first. WhatsApp then opens with the same message ready to send.</p>
              <p className="text-center text-[10px] leading-4 text-[#526078]">
                By submitting you agree to our{" "}
                <Link href="/privacy" className="underline hover:text-[#10264A]">
                  privacy policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
  ), document.body);
}
