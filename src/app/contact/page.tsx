import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#10264A]">

        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-180px]
            h-[420px]
            w-[420px]
            -translate-x-1/2
            rounded-full
            bg-[#C89A3D]/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-6xl
            px-6
            py-20
            text-center
            md:py-24
          "
        >

          {/* Eyebrow */}

          <div className="mb-5 flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-[#C89A3D]/70" />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.42em]
                text-[#D9B255]
              "
            >
              Get In Touch
            </p>

            <span className="h-px w-10 bg-[#C89A3D]/70" />

          </div>


          {/* Heading */}

          <h1
            className="
              font-serif
              text-[2.8rem]
              font-medium
              leading-tight
              tracking-[-0.025em]
              text-white
              sm:text-5xl
              md:text-6xl
            "
          >
            Let's Talk About
            <br />
            Your Himalayan Journey
          </h1>


          {/* Divider */}

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-[#C89A3D]/60" />

            <span
              className="
                h-[7px]
                w-[7px]
                rotate-45
                bg-[#C89A3D]
              "
            />

            <span className="h-px w-10 bg-[#C89A3D]/60" />

          </div>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              font-serif
              text-[15px]
              leading-7
              text-white/75
              md:text-[16px]
              md:leading-8
            "
          >
            Whether you're planning your first Himalayan escape or
            returning for another adventure, we're here to help you
            plan the journey.
          </p>

        </div>
      </section>


      {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

      <section className="relative py-16 md:py-20">

        <div className="mx-auto max-w-6xl px-6">

          <div
            className="
              grid
              gap-10
              lg:grid-cols-[0.85fr_1.15fr]
              lg:gap-16
            "
          >

            {/* =================================================
                LEFT — CONTACT DETAILS
            ================================================= */}

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-9 bg-[#C89A3D]/70" />

                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.42em]
                    text-[#C89A3D]
                  "
                >
                  Contact Details
                </p>

              </div>


              <h2
                className="
                  mt-5
                  font-serif
                  text-[2.35rem]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.025em]
                  text-[#10264A]
                  sm:text-[2.8rem]
                "
              >
                We're Here
                <br />
                To Help
              </h2>


              <p
                className="
                  mt-5
                  max-w-md
                  font-serif
                  text-[15px]
                  leading-7
                  text-[#596678]
                "
              >
                Have a question about a destination, package, vehicle,
                hotel or custom itinerary? Reach out and we'll help
                you figure out the details.
              </p>


              {/* Contact Cards */}

              <div className="mt-8 space-y-4">

                {/* Email */}

                <a
                  href="mailto:thehimalyancompass@gmail.com"
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-[#10264A]/10
                    bg-white
                    p-5
                    shadow-[0_6px_22px_rgba(16,38,74,0.05)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C89A3D]/50
                    hover:shadow-[0_12px_28px_rgba(16,38,74,0.09)]
                  "
                >

                  <span
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F7F0DF]
                      text-[#C89A3D]
                    "
                  >
                    <Mail size={19} strokeWidth={1.8} />
                  </span>

                  <span>

                    <span
                      className="
                        block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-[#7A8491]
                      "
                    >
                      Email
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        text-sm
                        font-semibold
                        text-[#10264A]
                        transition-colors
                        group-hover:text-[#A97925]
                      "
                    >
                      thehimalyancompass@gmail.com
                    </span>

                  </span>

                </a>


                {/* Phone */}

                <a
                  href="tel:+919876543210"
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-[#10264A]/10
                    bg-white
                    p-5
                    shadow-[0_6px_22px_rgba(16,38,74,0.05)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C89A3D]/50
                    hover:shadow-[0_12px_28px_rgba(16,38,74,0.09)]
                  "
                >

                  <span
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F7F0DF]
                      text-[#C89A3D]
                    "
                  >
                    <Phone size={19} strokeWidth={1.8} />
                  </span>

                  <span>

                    <span
                      className="
                        block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-[#7A8491]
                      "
                    >
                      Phone
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        text-sm
                        font-semibold
                        text-[#10264A]
                        transition-colors
                        group-hover:text-[#A97925]
                      "
                    >
                      +91 98765 43210
                    </span>

                  </span>

                </a>


                {/* Location */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-[#10264A]/10
                    bg-white
                    p-5
                    shadow-[0_6px_22px_rgba(16,38,74,0.05)]
                  "
                >

                  <span
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F7F0DF]
                      text-[#C89A3D]
                    "
                  >
                    <MapPin size={19} strokeWidth={1.8} />
                  </span>

                  <span>

                    <span
                      className="
                        block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-[#7A8491]
                      "
                    >
                      Based In
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        text-sm
                        font-semibold
                        text-[#10264A]
                      "
                    >
                      Shimla, Himachal Pradesh
                    </span>

                  </span>

                </div>


                {/* Hours */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-[#10264A]/10
                    bg-white
                    p-5
                    shadow-[0_6px_22px_rgba(16,38,74,0.05)]
                  "
                >

                  <span
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F7F0DF]
                      text-[#C89A3D]
                    "
                  >
                    <Clock3 size={19} strokeWidth={1.8} />
                  </span>

                  <span>

                    <span
                      className="
                        block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-[#7A8491]
                      "
                    >
                      Working Hours
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        text-sm
                        font-semibold
                        text-[#10264A]
                      "
                    >
                      Mon – Sat · 9:00 AM – 7:00 PM
                    </span>

                  </span>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT — CONTACT FORM
            ================================================= */}

            <div
              className="
                rounded-[28px]
                border
                border-[#10264A]/10
                bg-white
                p-7
                shadow-[0_15px_45px_rgba(16,38,74,0.08)]
                md:p-9
              "
            >

              <div>

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#C89A3D]
                  "
                >
                  Send Us A Message
                </p>

                <h3
                  className="
                    mt-3
                    font-serif
                    text-3xl
                    font-medium
                    text-[#10264A]
                  "
                >
                  Tell Us About Your Trip
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-[#6B7685]
                  "
                >
                  Share a few details and we'll get back to you.
                </p>

              </div>


              {/* Form */}

              <form className="mt-7 space-y-5">

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


                {/* Submit */}

                <button
                  type="button"
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
                  "
                >
                  Send Message

                  <ArrowRight
                    size={15}
                    strokeWidth={1.9}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="pb-20">

        <div className="mx-auto max-w-6xl px-6">

          <div
            className="
              rounded-[24px]
              border
              border-[#C89A3D]/20
              bg-[#F7F0DF]
              px-6
              py-8
              text-center
              md:px-10
              md:py-10
            "
          >

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#A97925]
              "
            >
              Prefer A Quick Conversation?
            </p>

            <h3
              className="
                mt-2
                font-serif
                text-2xl
                font-medium
                text-[#10264A]
              "
            >
              Let's plan it together.
            </h3>

            <p className="mt-2 text-sm text-[#6D604B]">
              Call or message us and we'll help you build your journey.
            </p>

            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <a
                href="tel:+919876543210"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#10264A]
                  px-6
                  py-3
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#17345F]
                "
              >
                <Phone size={14} />
                Call Us
              </a>

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#10264A]/20
                  bg-white/70
                  px-6
                  py-3
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#10264A]
                  transition-all
                  duration-300
                  hover:border-[#C89A3D]
                  hover:bg-white
                "
              >
                Back Home
                <ArrowLeft size={14} />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}