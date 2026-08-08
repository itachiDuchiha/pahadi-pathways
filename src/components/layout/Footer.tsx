"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10264A] via-[#0D1F3A] to-[#081526]" />

      {/* Decorative Glow */}
      <div className="absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#C89A3D]/10 blur-[140px]" />

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-8 py-20">

        {/* ================= TOP SECTION ================= */}

        <div className="grid gap-14 lg:grid-cols-4">

          {/* ================= BRAND ================= */}

          <div>

            {/* Footer Logo */}
            <Link
              href="/"
              aria-label="The Himalayan Compass - Home"
              className="inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Image
                src="/images/logo/navbar-logo5.png"
                alt="The Himalayan Compass"
                width={240}
                height={60}
                className="h-14 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm leading-8 text-gray-300">
              Experience Himachal the local way.
              Carefully curated journeys through Shimla,
              Manali and Spiti with trusted local experts.
            </p>

          </div>


          {/* ================= EXPLORE ================= */}

          <div>

            <h3 className="mb-6 text-lg font-bold text-white">
              Explore
            </h3>

            <ul className="space-y-4 text-gray-300">

              {/* Destinations */}

              <li>
                <Link
                  href="/destinations"
                  className="transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  Destinations
                </Link>
              </li>


              {/* Packages */}

              <li>
                <Link
                  href="/packages"
                  className="transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  Packages
                </Link>
              </li>


              {/* Experiences */}

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  Experiences
                </a>
              </li>


              {/* Gallery */}

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  Gallery
                </a>
              </li>

            </ul>

          </div>


          {/* ================= PLAN YOUR TRIP ================= */}

          <div>

            <h3 className="mb-6 text-lg font-bold text-white">
              Plan Your Trip
            </h3>

            <ul className="space-y-4 text-gray-300">

              {/* Honeymoon */}

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  Honeymoon
                </a>
              </li>


              {/* Family Trips */}

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  Family Trips
                </a>
              </li>


              {/* Adventure */}

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  Adventure
                </a>
              </li>


              {/* Custom Journey */}

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  Custom Journey
                </a>
              </li>

            </ul>

          </div>


          {/* ================= CONTACT ================= */}

          <div>

            <h3 className="mb-6 text-lg font-bold text-white">
              Contact
            </h3>

            <div className="space-y-5">

              {/* Location */}

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-[#C89A3D]"
                />

                <p className="text-gray-300">
                  Shimla,
                  <br />
                  Himachal Pradesh,
                  <br />
                  India
                </p>

              </div>


              {/* Phone */}

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="shrink-0 text-[#C89A3D]"
                />

                <a
                  href="tel:+919876543210"
                  className="text-gray-300 transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  +91 98765 43210
                </a>

              </div>


              {/* Email */}

              <div className="flex items-start gap-3">

                <Mail
                  size={18}
                  className="mt-1 shrink-0 text-[#C89A3D]"
                />

                <a
                  href="mailto:hello@thehimalayancompass.com"
                  className="break-all text-gray-300 transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  hello@thehimalayancompass.com
                </a>

              </div>

            </div>


            {/* Social Icons */}

            <div className="mt-8 flex gap-4">

              {/* Instagram */}

              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#C89A3D]
                  hover:text-[#10264A]
                "
              >
                <FaInstagram size={18} />
              </a>


              {/* Facebook */}

              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#C89A3D]
                  hover:text-[#10264A]
                "
              >
                <FaFacebookF size={17} />
              </a>


              {/* YouTube */}

              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#C89A3D]
                  hover:text-[#10264A]
                "
              >
                <FaYoutube size={19} />
              </a>

            </div>

          </div>

        </div>


        {/* ================= DIVIDER ================= */}

        <div className="my-16 h-px bg-white/10" />


        {/* ================= OUR COMMITMENT ================= */}

        <div className="text-center">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
            Our Commitment
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
            Your Himalayan Journey, Our Responsibility
          </h3>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            We are working toward the necessary tourism and
            transport authorizations as The Himalayan Compass grows.
          </p>


          {/* Authorization Badges */}

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
              Himachal Tourism
              <span className="ml-2 text-[#C89A3D]">
                Coming Soon
              </span>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
              HRTC
              <span className="ml-2 text-[#C89A3D]">
                Coming Soon
              </span>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
              IRCTC
              <span className="ml-2 text-[#C89A3D]">
                Coming Soon
              </span>
            </div>

          </div>

        </div>


        {/* ================= BOTTOM DIVIDER ================= */}

        <div className="my-12 h-px bg-white/10" />


        {/* ================= COPYRIGHT ================= */}

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-400 md:flex-row md:text-left">

          <p>
            © 2026 The Himalayan Compass. All rights reserved.
          </p>

          <p>
            Crafted with{" "}
            <span className="text-[#C89A3D]">
              ♥
            </span>{" "}
            for mountain travelers.
          </p>

        </div>

      </div>

    </footer>
  );
}