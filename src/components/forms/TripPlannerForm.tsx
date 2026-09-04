"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";

export default function TripPlannerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [budget, setBudget] = useState(40000);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const formatBudget = (value: number) => {
    if (value >= 100000) return "₹1L+";
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  if (submitted) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#F4F7FB] px-6 py-8">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C89A3D]/10">
            <CheckCircle2 size={30} className="text-[#C89A3D]" />
          </div>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
            Request Received
          </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-[#10264A]">
            Your journey starts here.
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#52657D]">
            Thank you for sharing your travel plans. Our Himalayan
            travel expert will get in touch with you shortly.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm font-semibold text-[#10264A] underline underline-offset-4"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid overflow-hidden bg-white lg:grid-cols-[32%_68%]">

      {/* =====================================================
          LEFT — HIMALAYAN IMAGE
      ===================================================== */}

      <div className="relative hidden min-h-[560px] overflow-hidden lg:block">

        {/* Main Himalayan image */}
        <div
          className="absolute inset-0 bg-[#10264A] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/himachal-home.png')",
          }}
        />

        {/* Very subtle cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07172d]/15 via-transparent to-[#07172d]/75" />

        {/* Slight warm golden atmosphere */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#C89A3D]/10 blur-3xl" />

        {/* Bottom shadow */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Decorative details */}
        <div className="absolute left-10 top-14 h-1 w-1 rounded-full bg-white/70" />

        <div className="absolute left-20 top-28 h-1.5 w-1.5 rounded-full bg-[#C89A3D]" />

        <div className="absolute right-14 top-20 h-1 w-1 rounded-full bg-white/60" />

        <div className="absolute right-24 top-36 h-1 w-1 rounded-full bg-white/50" />

        {/* LEFT CONTENT */}

        <div className="relative z-10 flex h-full flex-col px-7">

          {/* Main copy sits lower on image */}
          <div className="mt-auto pb-24">

            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E1B75A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              THE HIMALAYAN COMPASS
            </p>

            <h2 className="mt-3 max-w-[250px] text-[28px] font-semibold leading-[1.08] text-white drop-shadow-[0_3px_5px_rgba(0,0,0,0.85)]">
              Your mountains.
              <br />
              <span className="text-[#F0C96A]">
                Your story.
              </span>
            </h2>

            <p className="mt-3 max-w-[220px] text-[13px] font-medium leading-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Tell us what you have in mind and let our local experts
              shape the journey around you.
            </p>

          </div>

          {/* BOTTOM BADGE */}

          <div className="absolute inset-x-7 bottom-6">

            <div className="mb-4 h-px w-full bg-[#C89A3D]/50" />

            <div className="flex items-center gap-2.5">

              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C89A3D]/70 bg-black/20 backdrop-blur-sm">
                <span className="text-xs text-[#E1B75A]">
                  ✦
                </span>
              </div>

              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Crafted in the Himalayas
              </span>

            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RIGHT — FORM
      ===================================================== */}

      <div className="bg-[#F4F7FB] px-6 py-5 sm:px-7 lg:px-8 lg:py-5">

        {/* HEADER */}

        <div className="mb-3">

          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B8862D]">
            PLAN MY TRIP
          </p>

          <h2 className="mt-1 text-[23px] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#10264A]">
            Tell us about your journey
          </h2>

          <p className="mt-1 text-[11px] font-medium leading-4 text-[#52657D]">
            A few details are all we need to get started.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-2.5"
        >

          {/* NAME + PHONE */}

          <div className="grid gap-3 sm:grid-cols-2">

            <div>
              <label
                htmlFor="planner-name"
                className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#17365F]"
              >
                Name *
              </label>

              <div className="relative">
                <User
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8190A5]"
                />

                <input
                  id="planner-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="h-10 w-full rounded-lg border border-[#D2DCE8] bg-white pl-9 pr-3 text-xs font-medium text-[#10264A] outline-none transition placeholder:text-[#8190A5] focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="planner-phone"
                className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#17365F]"
              >
                Phone *
              </label>

              <div className="relative">
                <Phone
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8190A5]"
                />

                <input
                  id="planner-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone number"
                  className="h-10 w-full rounded-lg border border-[#D2DCE8] bg-white pl-9 pr-3 text-xs font-medium text-[#10264A] outline-none transition placeholder:text-[#8190A5] focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10"
                />
              </div>
            </div>

          </div>

          {/* EMAIL + DATE */}

          <div className="grid gap-3 sm:grid-cols-2">

            <div>
              <label
                htmlFor="planner-email"
                className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#17365F]"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8190A5]"
                />

                <input
                  id="planner-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 w-full rounded-lg border border-[#D2DCE8] bg-white pl-9 pr-3 text-xs font-medium text-[#10264A] outline-none transition placeholder:text-[#8190A5] focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="planner-date"
                className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#17365F]"
              >
                Travel Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8190A5]"
                />

                <input
                  id="planner-date"
                  name="travel-date"
                  type="date"
                  className="h-10 w-full rounded-lg border border-[#D2DCE8] bg-white pl-9 pr-3 text-xs font-medium text-[#10264A] outline-none transition focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10"
                />
              </div>
            </div>

          </div>

          {/* DESTINATION */}

          <div>

            <label
              htmlFor="planner-destination"
              className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#17365F]"
            >
              Where would you like to go?
            </label>

            <div className="relative">
              <MapPin
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8190A5]"
              />

              <select
                id="planner-destination"
                name="destination"
                defaultValue=""
                className="h-10 w-full appearance-none rounded-lg border border-[#D2DCE8] bg-white pl-9 pr-3 text-xs font-medium text-[#10264A] outline-none transition focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10"
              >
                <option value="">Select a destination</option>
                <option value="shimla">Shimla</option>
                <option value="manali">Manali</option>
                <option value="spiti">Spiti Valley</option>
                <option value="kinnaur">Kinnaur</option>
                <option value="lahaul">Lahaul</option>
                <option value="jibhi">Jibhi</option>
                <option value="dharamshala">Dharamshala</option>
                <option value="multiple">Multiple destinations</option>
                <option value="unsure">Not sure yet</option>
              </select>
            </div>

          </div>

          {/* TRAVELLERS */}

          <div>

            <div className="mb-1 flex items-center justify-between">

              <label className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#17365F]">
                Travellers
              </label>

              <span className="text-[10px] font-bold text-[#17365F]">
                {adults} Adult{adults !== 1 ? "s" : ""}
                {children > 0 &&
                  ` · ${children} Child${children !== 1 ? "ren" : ""}`}
              </span>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="flex h-10 items-center justify-between rounded-lg border border-[#D2DCE8] bg-white px-3">

                <div className="flex items-center gap-2">

                  <Users
                    size={14}
                    className="text-[#8190A5]"
                  />

                  <span className="text-[11px] font-semibold text-[#52657D]">
                    Adults
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setAdults(Math.max(1, adults - 1))
                    }
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2F6] text-xs text-[#17365F] transition hover:bg-[#E2E8EF]"
                  >
                    −
                  </button>

                  <span className="w-3 text-center text-xs font-bold text-[#10264A]">
                    {adults}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setAdults(Math.min(15, adults + 1))
                    }
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10264A] text-xs text-white transition hover:bg-[#17365F]"
                  >
                    +
                  </button>

                </div>
              </div>

              <div className="flex h-10 items-center justify-between rounded-lg border border-[#D2DCE8] bg-white px-3">

                <span className="text-[11px] font-semibold text-[#52657D]">
                  Children
                </span>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setChildren(Math.max(0, children - 1))
                    }
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2F6] text-xs text-[#17365F] transition hover:bg-[#E2E8EF]"
                  >
                    −
                  </button>

                  <span className="w-3 text-center text-xs font-bold text-[#10264A]">
                    {children}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setChildren(Math.min(10, children + 1))
                    }
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10264A] text-xs text-white transition hover:bg-[#17365F]"
                  >
                    +
                  </button>

                </div>
              </div>

            </div>
          </div>

          {/* BUDGET */}

          <div className="rounded-lg border border-[#D2DCE8] bg-white px-3.5 py-2">

            <div className="flex items-center justify-between">

              <label
                htmlFor="budget"
                className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#17365F]"
              >
                Approx. budget per person
              </label>

              <span className="text-xs font-extrabold text-[#B8862D]">
                {formatBudget(budget)}
              </span>

            </div>

            <input
              id="budget"
              type="range"
              min="15000"
              max="100000"
              step="5000"
              value={budget}
              onChange={(event) =>
                setBudget(Number(event.target.value))
              }
              className="mt-1 h-1 w-full cursor-pointer accent-[#C89A3D]"
            />

            <div className="mt-0.5 flex justify-between text-[8px] font-semibold text-[#52657D]">
              <span>₹15K</span>
              <span>₹40K</span>
              <span>₹60K</span>
              <span>₹80K</span>
              <span>₹1L+</span>
            </div>

          </div>

          {/* MESSAGE */}

          <div>

            <label
              htmlFor="planner-message"
              className="mb-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#17365F]"
            >
              Anything else?
            </label>

            <div className="relative">

              <MessageSquare
                size={14}
                className="absolute left-3 top-3 text-[#8190A5]"
              />

              <textarea
                id="planner-message"
                name="message"
                rows={2}
                placeholder="Hotel preferences, honeymoon, adventure, special requirements..."
                className="w-full resize-none rounded-lg border border-[#D2DCE8] bg-white py-2 pl-9 pr-3 text-xs font-medium leading-4 text-[#10264A] outline-none transition placeholder:text-[#8190A5] focus:border-[#C89A3D] focus:ring-2 focus:ring-[#C89A3D]/10"
              />

            </div>
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="group flex h-10.5 w-full items-center justify-center gap-2 rounded-lg bg-[#C89A3D] px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#10264A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D7AE57] hover:shadow-md"
          >
            SEND MY TRIP REQUEST

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          <p className="text-center text-[9px] font-medium leading-3 text-[#6B7C91]">
            No payment required · Your details are kept private
          </p>

        </form>
      </div>
    </div>
  );
}