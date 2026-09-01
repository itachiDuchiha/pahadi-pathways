"use client";

import {
  CalendarDays,
  Check,
  Hotel,
  Map,
  MessageSquare,
  Phone,
  Send,
  Users,
} from "lucide-react";

type PackageDetailsProps = {
  packageTitle?: string;
};

export default function PackageDetails({
  packageTitle = "Spiti: Beyond the Passes",
}: PackageDetailsProps) {
  return (
    <section className="bg-[#F5F6F8] py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">

        {/* =====================================================
            MAIN CONTENT + ENQUIRY SIDEBAR
        ===================================================== */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="min-w-0">

            {/* TOP NAV / TABS */}

            <div className="rounded-xl border border-gray-200 bg-white px-4 sm:px-6">
              <div className="grid grid-cols-2 divide-x divide-gray-200 sm:grid-cols-4">

                <a
                  href="#itinerary"
                  className="
                    group
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    border-b-2
                    border-[#C89A3D]
                    px-3
                    py-4
                    text-center
                    transition-colors
                  "
                >
                  <Map
                    size={23}
                    strokeWidth={1.8}
                    className="text-[#10264A]"
                  />

                  <span className="text-[11px] font-semibold text-[#10264A] sm:text-xs">
                    Recommended Itinerary
                  </span>
                </a>

                <a
                  href="#pricing"
                  className="
                    group
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    border-b-2
                    border-transparent
                    px-3
                    py-4
                    text-center
                    transition-colors
                    hover:border-[#C89A3D]
                  "
                >
                  <CalendarDays
                    size={23}
                    strokeWidth={1.8}
                    className="text-[#10264A]"
                  />

                  <span className="text-[11px] font-semibold text-[#10264A] sm:text-xs">
                    Pricing
                  </span>
                </a>

                <a
                  href="#accommodation"
                  className="
                    group
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    border-b-2
                    border-transparent
                    px-3
                    py-4
                    text-center
                    transition-colors
                    hover:border-[#C89A3D]
                  "
                >
                  <Hotel
                    size={23}
                    strokeWidth={1.8}
                    className="text-[#10264A]"
                  />

                  <span className="text-[11px] font-semibold text-[#10264A] sm:text-xs">
                    Accommodation
                  </span>
                </a>

                <a
                  href="#inclusions"
                  className="
                    group
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    border-b-2
                    border-transparent
                    px-3
                    py-4
                    text-center
                    transition-colors
                    hover:border-[#C89A3D]
                  "
                >
                  <Check
                    size={23}
                    strokeWidth={2}
                    className="text-[#10264A]"
                  />

                  <span className="text-[11px] font-semibold text-[#10264A] sm:text-xs">
                    Inclusions
                  </span>
                </a>

              </div>
            </div>


            {/* =================================================
                INTRODUCTION
            ================================================= */}

            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">

              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
                About The Journey
              </p>

              <h2 className="font-serif text-[1.7rem] font-medium leading-tight text-[#10264A] sm:text-[2rem]">
                Discover {packageTitle}
              </h2>

              <div className="mt-5 space-y-4 text-[13px] leading-6 text-gray-600">
                <p>
                  This carefully designed Himalayan journey takes you through
                  dramatic mountain landscapes, ancient villages, monasteries
                  and some of the most spectacular roads in Himachal Pradesh.
                </p>

                <p>
                  From the lush valleys of Kinnaur to the stark beauty of
                  Spiti, every part of the journey offers something different.
                  The itinerary balances sightseeing, comfortable stays and
                  enough time to actually experience the places rather than
                  simply passing through them.
                </p>
              </div>

            </div>


            {/* =================================================
                ITINERARY
            ================================================= */}

            <div
              id="itinerary"
              className="mt-6 rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
            >
              <div className="flex items-end justify-between gap-4 border-b border-gray-100 pb-4">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
                    Day By Day
                  </p>

                  <h2 className="mt-1 font-serif text-[1.7rem] font-medium text-[#10264A]">
                    Recommended Itinerary
                  </h2>
                </div>

                <span className="hidden rounded-full bg-[#F5F6F8] px-3 py-1.5 text-[10px] font-semibold text-[#10264A] sm:block">
                  10 Nights / 9 Days
                </span>

              </div>


              {/* DAY 1 */}

              <div className="relative border-b border-gray-100 py-6">

                <div className="flex gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10264A] text-[11px] font-bold text-white">
                    01
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C89A3D]">
                      Day 01
                    </p>

                    <h3 className="mt-1 text-sm font-bold text-[#10264A]">
                      Chandigarh → Shimla
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-gray-600">
                      Begin your Himalayan journey from Chandigarh and drive
                      towards Shimla. Enjoy the changing landscape as the
                      plains give way to the mountains.
                    </p>
                  </div>

                </div>

              </div>


              {/* DAY 2 */}

              <div className="relative border-b border-gray-100 py-6">

                <div className="flex gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10264A] text-[11px] font-bold text-white">
                    02
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C89A3D]">
                      Day 02
                    </p>

                    <h3 className="mt-1 text-sm font-bold text-[#10264A]">
                      Shimla → Sangla
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-gray-600">
                      Travel deeper into Himachal through the beautiful
                      valleys of Kinnaur, with mountain scenery throughout
                      the drive.
                    </p>
                  </div>

                </div>

              </div>


              {/* DAY 3 */}

              <div className="relative border-b border-gray-100 py-6">

                <div className="flex gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10264A] text-[11px] font-bold text-white">
                    03
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C89A3D]">
                      Day 03
                    </p>

                    <h3 className="mt-1 text-sm font-bold text-[#10264A]">
                      Sangla → Kalpa
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-gray-600">
                      Continue towards Kalpa, surrounded by dramatic
                      Himalayan peaks and traditional mountain villages.
                    </p>
                  </div>

                </div>

              </div>


              {/* DAY 4 */}

              <div className="relative py-6">

                <div className="flex gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10264A] text-[11px] font-bold text-white">
                    04
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C89A3D]">
                      Day 04
                    </p>

                    <h3 className="mt-1 text-sm font-bold text-[#10264A]">
                      Kalpa → Tabo
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-gray-600">
                      Enter the high-altitude desert landscape of Spiti and
                      experience the striking change in scenery.
                    </p>
                  </div>

                </div>

              </div>


              {/* MORE DAYS */}

              <div className="rounded-lg bg-[#F5F6F8] px-5 py-4 text-center">
                <p className="text-[11px] font-semibold text-[#10264A]">
                  Days 5–10 continue through Tabo, Kaza, Key, nearby villages
                  and the return journey.
                </p>
              </div>

            </div>


            {/* =================================================
                PRICING
            ================================================= */}

            <div
              id="pricing"
              className="mt-6 rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
                Package Cost
              </p>

              <h2 className="mt-1 font-serif text-[1.7rem] font-medium text-[#10264A]">
                Pricing
              </h2>

              <div className="mt-5 flex flex-wrap items-end justify-between gap-5 rounded-xl bg-[#F5F6F8] p-5">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C89A3D]">
                    Starting From
                  </p>

                  <p className="mt-1 text-3xl font-bold tracking-tight text-[#10264A]">
                    ₹31,999
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    per person
                  </p>
                </div>

                <a
                  href="#enquiry"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#C89A3D]
                    px-5
                    py-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[#10264A]
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-[#D7AE57]
                  "
                >
                  Enquire Now
                  <Send size={14} />
                </a>

              </div>
            </div>


            {/* =================================================
                ACCOMMODATION
            ================================================= */}

            <div
              id="accommodation"
              className="mt-6 rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
                Where You Stay
              </p>

              <h2 className="mt-1 font-serif text-[1.7rem] font-medium text-[#10264A]">
                Accommodation
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {[
                  "Comfortable hotels / stays",
                  "Breakfast included",
                  "Dinner included",
                  "Selected 3-star properties",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg bg-[#F5F6F8] px-4 py-3"
                  >
                    <Check
                      size={15}
                      className="shrink-0 text-[#C89A3D]"
                    />

                    <span className="text-[11px] font-medium text-[#10264A]">
                      {item}
                    </span>
                  </div>
                ))}

              </div>
            </div>


            {/* =================================================
                INCLUSIONS
            ================================================= */}

            <div
              id="inclusions"
              className="mt-6 rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
                What's Included
              </p>

              <h2 className="mt-1 font-serif text-[1.7rem] font-medium text-[#10264A]">
                Inclusions
              </h2>

              <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">

                {[
                  "Private SUV / Innova Crysta",
                  "Accommodation as per itinerary",
                  "Breakfast and dinner",
                  "Driver allowances and fuel",
                  "Sightseeing as mentioned",
                  "All applicable taxes",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C89A3D]/15">
                      <Check
                        size={12}
                        strokeWidth={2.5}
                        className="text-[#C89A3D]"
                      />
                    </div>

                    <span className="text-[12px] leading-5 text-gray-600">
                      {item}
                    </span>
                  </div>
                ))}

              </div>
            </div>

          </div>


          {/* =================================================
              RIGHT — STICKY ENQUIRY FORM
          ================================================= */}

          <aside
            id="enquiry"
            className="lg:sticky lg:top-28"
          >

            <div className="overflow-hidden rounded-xl border border-[#10264A]/10 bg-white shadow-[0_10px_30px_rgba(16,38,74,0.08)]">

              {/* FORM HEADER */}

              <div className="bg-[#10264A] px-5 py-5">

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C89A3D]">
                  Plan Your Journey
                </p>

                <h2 className="mt-1 font-serif text-[1.45rem] font-medium text-white">
                  Request a Callback
                </h2>

                <p className="mt-1.5 text-[10px] leading-5 text-white/65">
                  Tell us a few details and our travel expert will get in
                  touch with you.
                </p>

              </div>


              {/* FORM */}

              <form className="space-y-4 p-5">

                {/* NAME */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10264A]"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-xs
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


                {/* PHONE */}

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10264A]"
                  >
                    Mobile Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-xs
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


                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10264A]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-xs
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


                {/* DATE */}

                <div className="grid grid-cols-2 gap-3">

                  <div>
                    <label
                      htmlFor="checkin"
                      className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10264A]"
                    >
                      Travel Date
                    </label>

                    <div className="relative">

                      <CalendarDays
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="checkin"
                        type="date"
                        className="
                          w-full
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          py-2.5
                          pl-9
                          pr-2
                          text-[10px]
                          text-[#10264A]
                          outline-none
                          focus:border-[#C89A3D]
                        "
                      />

                    </div>
                  </div>


                  <div>
                    <label
                      htmlFor="guests"
                      className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10264A]"
                    >
                      Guests
                    </label>

                    <div className="relative">

                      <Users
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="guests"
                        type="number"
                        min="1"
                        placeholder="2"
                        className="
                          w-full
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          py-2.5
                          pl-9
                          pr-2
                          text-xs
                          text-[#10264A]
                          outline-none
                          placeholder:text-gray-400
                          focus:border-[#C89A3D]
                        "
                      />

                    </div>
                  </div>

                </div>


                {/* MESSAGE */}

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10264A]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Any preferences or questions?"
                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3.5
                      py-2.5
                      text-xs
                      leading-5
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


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#C89A3D]
                    px-4
                    py-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.1em]
                    text-[#10264A]
                    shadow-sm
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-[#D7AE57]
                    hover:shadow-md
                  "
                >
                  Send Enquiry
                  <Send size={14} />
                </button>


                {/* PHONE OPTION */}

                <div className="border-t border-gray-100 pt-4 text-center">

                  <p className="text-[9px] text-gray-400">
                    Prefer to speak directly?
                  </p>

                  <a
                    href="tel:+919876543210"
                    className="mt-2 inline-flex items-center gap-2 text-[11px] font-bold text-[#10264A] transition-colors hover:text-[#C89A3D]"
                  >
                    <Phone size={14} />
                    +91 98765 43210
                  </a>

                </div>

              </form>

            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}