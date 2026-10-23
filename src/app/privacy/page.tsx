import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { site, mailtoUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
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
              Legal
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
            Privacy Policy
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
            How {site.name} collects, uses and protects the information
            you share when you plan a trip with us.
          </p>

        </div>
      </section>


      {/* =====================================================
          PRIVACY CONTENT
      ===================================================== */}

      <section className="relative py-16 md:py-20">

        <div className="mx-auto max-w-3xl px-6">

          <div
            className="
              rounded-[28px]
              border
              border-[#10264A]/10
              bg-white
              p-7
              shadow-[0_15px_45px_rgba(16,38,74,0.08)]
              md:p-10
            "
          >

            <p
              className="
                text-sm
                leading-6
                text-[#6B7685]
              "
            >
              Effective date: 23 October 2026
            </p>


            {/* What We Collect */}

            <h2
              className="
                mt-8
                font-serif
                text-2xl
                font-medium
                text-[#10264A]
              "
            >
              What We Collect
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                font-serif
                text-[15px]
                leading-7
                text-[#596678]
              "
            >
              When you use our trip planner, contact form or package
              enquiry form, we collect the information you choose to
              share with us: your name, phone number, email address,
              travel dates, party size and any message or trip details
              you include.
            </p>


            {/* Why We Collect It */}

            <h2
              className="
                mt-8
                font-serif
                text-2xl
                font-medium
                text-[#10264A]
              "
            >
              Why We Collect It
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                font-serif
                text-[15px]
                leading-7
                text-[#596678]
              "
            >
              We use this information solely to respond to your enquiry,
              plan your Himalayan journey and follow up with the details
              you have asked for. We do not use it for any other purpose.
            </p>


            {/* Who Processes It */}

            <h2
              className="
                mt-8
                font-serif
                text-2xl
                font-medium
                text-[#10264A]
              "
            >
              Who Processes It
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                font-serif
                text-[15px]
                leading-7
                text-[#596678]
              "
            >
              Enquiry details are delivered to us by email using Resend,
              a transactional email provider, and land in our Google
              Workspace / Gmail inbox. These providers process your
              information only to deliver and store your enquiry on our
              behalf.
            </p>


            {/* Retention */}

            <h2
              className="
                mt-8
                font-serif
                text-2xl
                font-medium
                text-[#10264A]
              "
            >
              Retention
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                font-serif
                text-[15px]
                leading-7
                text-[#596678]
              "
            >
              We keep enquiry emails for up to 24 months so we can refer
              back to past conversations, after which they are deleted.
            </p>


            {/* Your Rights */}

            <h2
              className="
                mt-8
                font-serif
                text-2xl
                font-medium
                text-[#10264A]
              "
            >
              Your Rights
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                font-serif
                text-[15px]
                leading-7
                text-[#596678]
              "
            >
              Under the Digital Personal Data Protection Act, 2023, you
              have the right to access, correct or request erasure of
              the personal data you have shared with us. To exercise any
              of these rights, email us at{" "}
              <a
                href={mailtoUrl()}
                className="font-semibold text-[#10264A] underline hover:text-[#A97925]"
              >
                {site.email}
              </a>
              .
            </p>


            {/* Contact */}

            <h2
              className="
                mt-8
                font-serif
                text-2xl
                font-medium
                text-[#10264A]
              "
            >
              Contact
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                font-serif
                text-[15px]
                leading-7
                text-[#596678]
              "
            >
              If you have any questions about this privacy policy or how
              your information is handled, reach out to us at{" "}
              <a
                href={mailtoUrl()}
                className="font-semibold text-[#10264A] underline hover:text-[#A97925]"
              >
                {site.email}
              </a>
              .
            </p>


            {/* Back Home */}

            <div className="mt-10">

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#10264A]/20
                  bg-[#F8F7F3]
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
                <ArrowLeft size={14} />
                Back Home
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
