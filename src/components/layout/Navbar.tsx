
"use client";

import { useRef, useState } from "react";
import { Menu, Phone, X, ArrowUpRight } from "lucide-react";

import { site, telUrl } from "@/config/site";

import Logo from "./Logo";
import NavLinks from "./NavLinks";

type NavbarProps = {
  onPlanTrip: () => void;
};

export default function Navbar({ onPlanTrip }: NavbarProps) {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* =========================================================
     PHONE POPUP
  ========================================================= */

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
    }, 180);
  };

  const togglePhonePopup = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }

    setIsPhoneOpen((previous) => !previous);
  };

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previous) => !previous);
    setIsPhoneOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full">
      {/* NAVBAR BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          -z-10
          border-b
          border-[#10264A]/10
          bg-white
          shadow-[0_4px_20px_rgba(16,38,74,0.08)]
        "
      />

      {/* NAVBAR CONTENT */}

      <div
        className="
          mx-auto
          flex
          h-[82px]
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

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden flex-1 justify-center lg:flex">
          <NavLinks scrolled={true} />
        </nav>

        {/* DESKTOP PHONE */}

        <div className="hidden shrink-0 items-center lg:flex">
          <div
            className="relative"
            onMouseEnter={openPhonePopup}
            onMouseLeave={closePhonePopup}
          >
            <button
              type="button"
              aria-label="Contact The Himalayan Compass by phone"
              aria-expanded={isPhoneOpen}
              aria-haspopup="dialog"
              onClick={togglePhonePopup}
              onFocus={openPhonePopup}
              onBlur={closePhonePopup}
              className={`
                group
                relative
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300
                ease-out
                ${
                  isPhoneOpen
                    ? "border-[#C89A3D]/40 bg-[#F7F3E9] text-[#C89A3D] shadow-[0_6px_20px_rgba(200,154,61,0.18)]"
                    : "border-[#10264A]/5 bg-[#10264A]/[0.04] text-[#10264A] shadow-sm hover:-translate-y-0.5 hover:border-[#C89A3D]/40 hover:bg-[#F7F3E9] hover:text-[#C89A3D] hover:shadow-[0_6px_20px_rgba(200,154,61,0.16)]"
                }
              `}
            >
              <Phone
                size={20}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:rotate-[-8deg]"
              />

              {/* SMALL GOLD ACCENT */}

              <span
                className={`
                  absolute
                  bottom-[7px]
                  right-[7px]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#C89A3D]
                  transition-transform
                  duration-300
                  ${
                    isPhoneOpen
                      ? "scale-100"
                      : "scale-0 group-hover:scale-100"
                  }
                `}
              />
            </button>

            {/* PHONE POPUP */}

            <div
              id="navbar-phone-popup"
              role="dialog"
              aria-label="Call The Himalayan Compass"
              onMouseEnter={openPhonePopup}
              onMouseLeave={closePhonePopup}
              className={`
                absolute
                right-0
                top-[calc(100%+14px)]
                w-[270px]
                origin-top-right
                transition-all
                duration-200
                ${
                  isPhoneOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible translate-y-2 scale-[0.98] opacity-0"
                }
              `}
            >
              {/* CONNECTING POINTER */}

              <div
                className="
                  absolute
                  -top-[7px]
                  right-[18px]
                  h-3.5
                  w-3.5
                  rotate-45
                  border-l
                  border-t
                  border-[#10264A]/[0.06]
                  bg-white
                "
              />

              {/* POPUP CARD */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#10264A]/[0.06]
                  bg-white
                  p-5
                  shadow-[0_18px_50px_rgba(16,38,74,0.16)]
                "
              >
                {/* GOLD TOP ACCENT */}

                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-[3px]
                    bg-gradient-to-r
                    from-[#C89A3D]/30
                    via-[#D4AF37]
                    to-[#C89A3D]/30
                  "
                />

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.24em]
                    text-[#C89A3D]
                  "
                >
                  Let's Talk
                </p>

                <h3
                  className="
                    mt-1.5
                    font-serif
                    text-xl
                    font-bold
                    text-[#10264A]
                  "
                >
                  Plan your next journey.
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  Have a question about your Himachal trip? We're here
                  to help.
                </p>

                {/* CALL LINK */}

                <a
                  href={telUrl()}
                  className="
                    group/call
                    mt-4
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-[#C89A3D]/20
                    bg-[#F7F3E9]
                    p-3
                    transition-all
                    duration-300
                    hover:border-[#C89A3D]/50
                    hover:bg-[#C89A3D]/15
                  "
                >
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#C89A3D]
                      text-[#10264A]
                      transition-transform
                      duration-300
                      group-hover/call:scale-105
                    "
                  >
                    <Phone size={17} strokeWidth={2} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] text-slate-500">
                      Call us directly
                    </span>

                    <span className="mt-0.5 block whitespace-nowrap text-sm font-bold tracking-wide text-[#10264A]">
                      {site.phone.display}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="
                      shrink-0
                      text-[#C89A3D]
                      transition-transform
                      duration-300
                      group-hover/call:translate-x-0.5
                      group-hover/call:-translate-y-0.5
                    "
                  />
                </a>

                <p className="mt-3 text-center text-[10px] text-slate-400">
                  Your Himalayan journey starts here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE RIGHT SIDE */}

        <div className="flex items-center gap-2 lg:hidden">
          {/* MOBILE PHONE */}

          <a
            href={telUrl()}
            aria-label="Call The Himalayan Compass"
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[#10264A]/5
              bg-[#10264A]/[0.04]
              text-[#10264A]
              transition-all
              duration-300
              hover:border-[#C89A3D]/40
              hover:bg-[#F7F3E9]
              hover:text-[#C89A3D]
              active:scale-95
            "
          >
            <Phone
              size={20}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:rotate-[-8deg]"
            />
          </a>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[#10264A]/5
              bg-[#10264A]/[0.04]
              text-[#10264A]
              transition-all
              duration-300
              hover:border-[#C89A3D]/40
              hover:bg-[#F7F3E9]
              hover:text-[#C89A3D]
            "
          >
            {isMobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

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
          <nav>
            <ul className="space-y-1">
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

              <li>
                <a
                  href="/experiences"
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

              <li>
                <a
                  href="/gallery"
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
        </div>
      </div>
    </header>
  );
}
