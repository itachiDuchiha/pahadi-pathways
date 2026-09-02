"use client";

import { FormEvent, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
  Users,
} from "lucide-react";

type BookingFormProps = {
  packageTitle: string;
};

export default function BookingForm({
  packageTitle,
}: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /*
     * TEMPORARY:
     * We are only building the form UI for now.
     *
     * Later we will connect this to the actual enquiry
     * system/email/WhatsApp once the real contact details
     * are finalized.
     */

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2
            size={30}
            className="text-green-600"
          />
        </div>

        <h3 className="mt-5 text-2xl font-bold text-[#10264A]">
          Enquiry Received
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-600">
          Thank you for your interest in{" "}
          <span className="font-semibold text-[#10264A]">
            {packageTitle}
          </span>
          . Our travel team will get in touch with you shortly.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-[#C89A3D] transition-colors hover:text-[#10264A]"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* NAME + PHONE */}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* NAME */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#10264A]"
          >
            Your Name
          </label>

          <div className="relative">
            <User
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

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
                border-gray-200
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                text-[#10264A]
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-[#C89A3D]
                focus:ring-2
                focus:ring-[#C89A3D]/10
              "
            />
          </div>
        </div>

        {/* PHONE */}

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#10264A]"
          >
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Enter phone number"
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                text-[#10264A]
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-[#C89A3D]
                focus:ring-2
                focus:ring-[#C89A3D]/10
              "
            />
          </div>
        </div>
      </div>

      {/* EMAIL */}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#10264A]"
        >
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              py-3.5
              pl-11
              pr-4
              text-sm
              text-[#10264A]
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#C89A3D]
              focus:ring-2
              focus:ring-[#C89A3D]/10
            "
          />
        </div>
      </div>

      {/* DATE + TRAVELLERS */}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* DATE */}

        <div>
          <label
            htmlFor="travel-date"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#10264A]"
          >
            Preferred Travel Date
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="travel-date"
              name="travel-date"
              type="date"
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                text-[#10264A]
                outline-none
                transition
                focus:border-[#C89A3D]
                focus:ring-2
                focus:ring-[#C89A3D]/10
              "
            />
          </div>
        </div>

        {/* TRAVELLERS */}

        <div>
          <label
            htmlFor="travellers"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#10264A]"
          >
            Travellers
          </label>

          <div className="relative">
            <Users
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              id="travellers"
              name="travellers"
              defaultValue=""
              className="
                w-full
                appearance-none
                rounded-xl
                border
                border-gray-200
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                text-[#10264A]
                outline-none
                transition
                focus:border-[#C89A3D]
                focus:ring-2
                focus:ring-[#C89A3D]/10
              "
            >
              <option value="" disabled>
                Select travellers
              </option>

              <option value="1">1 Traveller</option>
              <option value="2">2 Travellers</option>
              <option value="3">3 Travellers</option>
              <option value="4">4 Travellers</option>
              <option value="5">5 Travellers</option>
              <option value="6">6 Travellers</option>
              <option value="7">7 Travellers</option>
              <option value="8">8 Travellers</option>
              <option value="9">9 Travellers</option>
              <option value="10+">10+ Travellers</option>
            </select>
          </div>
        </div>
      </div>

      {/* MESSAGE */}

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#10264A]"
        >
          Tell Us About Your Trip
        </label>

        <div className="relative">
          <MessageSquare
            size={17}
            className="absolute left-4 top-4 text-gray-400"
          />

          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Any special requirements, hotel preferences, customizations..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-gray-200
              bg-white
              py-3.5
              pl-11
              pr-4
              text-sm
              leading-6
              text-[#10264A]
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#C89A3D]
              focus:ring-2
              focus:ring-[#C89A3D]/10
            "
          />
        </div>
      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2.5
          rounded-xl
          bg-[#C89A3D]
          px-6
          py-4
          text-sm
          font-bold
          uppercase
          tracking-[0.08em]
          text-[#10264A]
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#D7AE57]
          hover:shadow-md
        "
      >
        Send Enquiry
        <Send size={17} />
      </button>

      <p className="text-center text-[11px] leading-5 text-gray-500">
        No payment is required to send an enquiry. Our team will
        confirm availability and pricing with you.
      </p>
    </form>
  );
}