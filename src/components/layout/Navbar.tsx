"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";

type NavbarProps = {
  onPlanTrip: () => void;
};

export default function Navbar({ onPlanTrip }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ================= SCROLL DETECTION ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================= PHONE POPUP ================= */

  const openPhonePopup = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }

    setIsPhoneOpen(true);
  };

  const closePhonePopup = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    closeTimer.current = setTimeout(() => {
      setIsPhoneOpen(false);
    }, 250);
  };

  /* ================= MOBILE MENU ================= */

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previous) => !previous);
    setIsPhoneOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobilePlanTrip = () => {
    setIsMobileMenuOpen(false);
    onPlanTrip();
  };

  return (
    <header
      className={`
        fixed
        left-0
        right-0
        top-0
        z-50
        w-full
        transition-all
        duration-300
        ${
          scrolled
            ? "border-b border-gray-200 bg-white/95 shadow-md backdrop-blur-md"
            : "border-b border-white/10 bg-transparent"
        }
      `}
    >
      {/* ================= NAVBAR ================= */}

      <div
        className="
          mx-auto
          flex
          h-[96px]
          max-w-7xl
          items-center
          justify-between
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* LOGO */}

        <div className="flex shrink-0 items-center">
          <Logo />
        </div>

        {/* ================= DESKTOP NAVIGATION ================= */}

        <nav className="hidden flex-1 justify-center lg:flex">
          <NavLinks scrolled={scrolled} />
        </nav>

        {/* ================= DESKTOP RIGHT SIDE ================= */}

        <div className="hidden shrink-0 items-center gap-4 lg:flex">

          {/* PHONE */}

          <div
            className="relative"
            onMouseEnter={openPhonePopup}
            onMouseLeave={closePhonePopup}
          >
            <button
              type="button"
              aria-label="Call The Himalayan Compass"
              onClick={openPhonePopup}
              onFocus={openPhonePopup}
              onBlur={closePhonePopup}
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                ${
                  scrolled
                    ? "bg-[#10264A]/5 text-[#10264A] hover:bg-[#10264A]/10"
                    : "bg-white/15 text-white hover:bg-white/25"
                }
              `}
            >
              <Phone size={21} strokeWidth={2} />
            </button>

            {/* PHONE POPUP */}

            <div
              onMouseEnter={openPhonePopup}
              onMouseLeave={closePhonePopup}
              className={`
                absolute
                right-0
                top-[62px]
                w-[240px]
                rounded-2xl
                bg-white
                p-4
                text-left
                shadow-[0_15px_40px_rgba(0,0,0,0.18)]
                transition-all
                duration-200
                ${
                  isPhoneOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-2 opacity-0"
                }
              `}
            >
              {/* Arrow */}

              <div
                className="
                  absolute
                  -top-2
                  right-5
                  h-4
                  w-4
                  rotate-45
                  bg-white
                "
              />

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C89A3D]">
                Call Us
              </p>

              <a
                href="tel:+919876543210"
                className="
                  mt-3
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-[#F7F3E9]
                  px-3
                  py-3
                  text-[#10264A]
                  transition-all
                  duration-300
                  hover:bg-[#C89A3D]/20
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#C89A3D]
                  "
                >
                  <Phone
                    size={17}
                    className="text-[#10264A]"
                  />
                </div>

                <div>
                  <p className="text-[10px] text-gray-500">
                    Call directly
                  </p>

                  <p className="whitespace-nowrap text-sm font-bold">
                    +91 98765 43210
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* PLAN MY JOURNEY */}

          <button
            onClick={onPlanTrip}
            className="
              rounded-full
              bg-[#C89A3D]
              px-8
              py-3.5
              font-semibold
              text-[#10264A]
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#D7AE57]
              hover:shadow-xl
              active:scale-95
            "
          >
            Plan My Journey
          </button>
        </div>

        {/* ================= MOBILE RIGHT SIDE ================= */}

        <div className="flex items-center gap-2 lg:hidden">

          {/* PHONE */}

          <a
            href="tel:+919876543210"
            aria-label="Call The Himalayan Compass"
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              transition-all
              duration-300
              ${
                scrolled
                  ? "bg-[#10264A]/5 text-[#10264A]"
                  : "bg-white/15 text-white backdrop-blur-md"
              }
            `}
          >
            <Phone size={20} strokeWidth={2} />
          </a>

          {/* MENU BUTTON */}

          <button
            type="button"
            aria-label={
              isMobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              transition-all
              duration-300
              ${
                scrolled
                  ? "bg-[#10264A]/5 text-[#10264A]"
                  : "bg-white/15 text-white backdrop-blur-md"
              }
            `}
          >
            {isMobileMenuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`
          overflow-hidden
          border-t
          border-gray-200
          bg-white
          transition-all
          duration-300
          lg:hidden
          ${
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-6 pb-6 pt-5">

          {/* MOBILE LINKS */}

          <nav>
            <ul className="space-y-1">

              {/* HOME */}

              <li>
                <a
                  href="/"
                  onClick={closeMobileMenu}
                  className="
                    block
                    rounded-xl
                    px-4
                    py-3
                    font-semibold
                    text-[#10264A]
                    transition-colors
                    hover:bg-[#F7F3E9]
                    hover:text-[#C89A3D]
                  "
                >
                  Home
                </a>
              </li>

              {/* DESTINATIONS */}

              <li>
                <a
                  href="/destinations"
                  onClick={closeMobileMenu}
                  className="
                    block
                    rounded-xl
                    px-4
                    py-3
                    font-semibold
                    text-[#10264A]
                    transition-colors
                    hover:bg-[#F7F3E9]
                    hover:text-[#C89A3D]
                  "
                >
                  Destinations
                </a>
              </li>

              {/* PACKAGES */}

              <li>
                <a
                  href="/packages"
                  onClick={closeMobileMenu}
                  className="
                    block
                    rounded-xl
                    px-4
                    py-3
                    font-semibold
                    text-[#10264A]
                    transition-colors
                    hover:bg-[#F7F3E9]
                    hover:text-[#C89A3D]
                  "
                >
                  Packages
                </a>
              </li>

              {/* EXPERIENCES */}

              <li>
                <a
                  href="#"
                  onClick={closeMobileMenu}
                  className="
                    block
                    rounded-xl
                    px-4
                    py-3
                    font-semibold
                    text-[#10264A]
                    transition-colors
                    hover:bg-[#F7F3E9]
                    hover:text-[#C89A3D]
                  "
                >
                  Experiences
                </a>
              </li>

              {/* GALLERY */}

              <li>
                <a
                  href="#"
                  onClick={closeMobileMenu}
                  className="
                    block
                    rounded-xl
                    px-4
                    py-3
                    font-semibold
                    text-[#10264A]
                    transition-colors
                    hover:bg-[#F7F3E9]
                    hover:text-[#C89A3D]
                  "
                >
                  Gallery
                </a>
              </li>

            </ul>
          </nav>

          {/* MOBILE CTA */}

          <button
            type="button"
            onClick={handleMobilePlanTrip}
            className="
              mt-5
              w-full
              rounded-full
              bg-[#C89A3D]
              px-6
              py-3.5
              font-semibold
              text-[#10264A]
              shadow-md
              transition-all
              duration-300
              hover:bg-[#D7AE57]
              active:scale-[0.98]
            "
          >
            Plan My Journey
          </button>

        </div>
      </div>

    </header>
  );
}