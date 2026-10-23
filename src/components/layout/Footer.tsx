
"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

import { site, telUrl, mailtoUrl } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10264A] via-[#0D1F3A] to-[#081526]" />

      {/* Decorative Glow */}
      <div className="absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#C89A3D]/10 blur-[140px]" />

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-12">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.9fr_1.25fr] lg:gap-6">
          {/* BRAND */}
          <div>
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

            <p className="mt-4 max-w-sm leading-7 text-gray-300">
              Experience Himachal the local way. Carefully curated
              journeys through Shimla, Manali and Spiti with trusted
              local experts.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              Explore
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/destinations" className="transition-colors duration-300 hover:text-[#C89A3D]">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="transition-colors duration-300 hover:text-[#C89A3D]">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="transition-colors duration-300 hover:text-[#C89A3D]">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="transition-colors duration-300 hover:text-[#C89A3D]">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* PLAN YOUR TRIP */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              Plan Your Trip
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/packages" className="transition-colors duration-300 hover:text-[#C89A3D]">
                  Honeymoon
                </Link>
              </li>
              <li>
                <Link href="/packages" className="transition-colors duration-300 hover:text-[#C89A3D]">
                  Family Trips
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="transition-colors duration-300 hover:text-[#C89A3D]">
                  Adventure
                </Link>
              </li>
              <li>
                <Link href="/" className="transition-colors duration-300 hover:text-[#C89A3D]">
                  Custom Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="min-w-0">
            <h3 className="mb-4 text-lg font-bold text-white">
              Contact
            </h3>

            <div className="space-y-4">
              {/* LOCATION */}
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

              {/* PHONE */}
              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-[#C89A3D]"
                />

                <a
                  href={telUrl()}
                  className="whitespace-nowrap text-gray-300 transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  {site.phone.display}
                </a>
              </div>

              {/* EMAIL */}
              <div className="flex min-w-0 items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-[#C89A3D]"
                />

                <a
                  href={mailtoUrl()}
                  className="whitespace-nowrap text-sm text-gray-300 transition-colors duration-300 hover:text-[#C89A3D]"
                >
                  {site.email}
                </a>
              </div>
            </div>

            {/* SOCIAL ICONS */}
            <div className="mt-5 flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit The Himalayan Compass on Instagram"
                title="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#C89A3D] hover:text-[#10264A]"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit The Himalayan Compass on Facebook"
                title="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#C89A3D] hover:text-[#10264A]"
              >
                <FaFacebookF size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER BEFORE OUR PROMISE */}
        <div className="my-6 h-px bg-white/10" />

        {/* OUR PROMISE */}
        <div className="py-1 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
            Our Promise
          </p>

          <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">
            Your Himalayan Journey, Thoughtfully Planned.
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
            Discover the beauty of Himachal Pradesh through carefully
            curated journeys, local insights and personalised travel support.
          </p>
        </div>

        {/* BOTTOM DIVIDER */}
        <div className="my-6 h-px bg-white/10" />

        {/* COPYRIGHT */}
        <div className="flex flex-col items-center justify-center gap-3 pb-16 text-center text-sm text-gray-400 sm:pb-16 md:flex-row md:justify-between md:gap-6 md:pb-2 md:pl-16 md:pr-20 md:text-left">
          <p className="whitespace-nowrap">
            © 2026 The Himalayan Compass. All rights reserved.
          </p>

          <p className="whitespace-nowrap">
            Crafted with{" "}
            <span className="text-[#C89A3D]">♥</span>{" "}
            for mountain travelers.
          </p>
        </div>
      </div>
    </footer>
  );
}
