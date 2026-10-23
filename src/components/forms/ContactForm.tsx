"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "");

    try {
      const response = await fetch("/api/trip-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "contact",
          name,
          phone,
          email,
          message,
          website,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ??
            "We couldn't send your message. Please try again."
        );
      }

      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="
          mt-7
          flex
          flex-col
          items-center
          rounded-xl
          border
          border-[#10264A]/15
          bg-[#FAFAF8]
          px-6
          py-10
          text-center
        "
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C89A3D]/10">
          <CheckCircle2 size={24} className="text-[#C89A3D]" />
        </div>

        <h4 className="mt-4 text-base font-semibold text-[#10264A]">
          Message sent.
        </h4>

        <p className="mt-2 max-w-sm text-sm leading-6 text-[#6B7685]">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setErrorMessage("");
          }}
          className="mt-5 text-sm font-semibold text-[#10264A] underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {/* Name */}

      <div>

        <label
          htmlFor="name"
          className="
            mb-2
            block
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#10264A]
          "
        >
          Your Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter your name"
          className="
            w-full
            rounded-xl
            border
            border-[#10264A]/15
            bg-[#FAFAF8]
            px-4
            py-3.5
            text-sm
            text-[#10264A]
            outline-none
            transition-all
            placeholder:text-[#9AA2AC]
            focus:border-[#C89A3D]
            focus:bg-white
            focus:ring-2
            focus:ring-[#C89A3D]/10
          "
        />

      </div>


      {/* Email */}

      <div>

        <label
          htmlFor="email"
          className="
            mb-2
            block
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#10264A]
          "
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="
            w-full
            rounded-xl
            border
            border-[#10264A]/15
            bg-[#FAFAF8]
            px-4
            py-3.5
            text-sm
            text-[#10264A]
            outline-none
            transition-all
            placeholder:text-[#9AA2AC]
            focus:border-[#C89A3D]
            focus:bg-white
            focus:ring-2
            focus:ring-[#C89A3D]/10
          "
        />

      </div>


      {/* Phone */}

      <div>

        <label
          htmlFor="phone"
          className="
            mb-2
            block
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#10264A]
          "
        >
          Phone
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="+91"
          className="
            w-full
            rounded-xl
            border
            border-[#10264A]/15
            bg-[#FAFAF8]
            px-4
            py-3.5
            text-sm
            text-[#10264A]
            outline-none
            transition-all
            placeholder:text-[#9AA2AC]
            focus:border-[#C89A3D]
            focus:bg-white
            focus:ring-2
            focus:ring-[#C89A3D]/10
          "
        />

      </div>


      {/* Message */}

      <div>

        <label
          htmlFor="message"
          className="
            mb-2
            block
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#10264A]
          "
        >
          Your Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us where you'd like to go..."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-[#10264A]/15
            bg-[#FAFAF8]
            px-4
            py-3.5
            text-sm
            leading-6
            text-[#10264A]
            outline-none
            transition-all
            placeholder:text-[#9AA2AC]
            focus:border-[#C89A3D]
            focus:bg-white
            focus:ring-2
            focus:ring-[#C89A3D]/10
          "
        />

      </div>


      {/* Error message */}

      {errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700"
        >
          {errorMessage}
        </div>
      )}


      {/* Submit */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          group
          inline-flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-full
          bg-[#10264A]
          px-6
          py-3.5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-white
          shadow-[0_8px_22px_rgba(16,38,74,0.16)]
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#17345F]
          hover:shadow-[0_12px_28px_rgba(16,38,74,0.20)]
          disabled:cursor-not-allowed
          disabled:opacity-70
          disabled:hover:translate-y-0
        "
      >
        {isSubmitting ? "Sending Message..." : "Send Message"}

        {!isSubmitting && (
          <ArrowRight
            size={15}
            strokeWidth={1.9}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        )}

      </button>

      <p className="text-center text-xs leading-5 text-[#6B7685]">
        By submitting you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-[#10264A]">
          privacy policy
        </Link>
        .
      </p>

    </form>
  );
}
