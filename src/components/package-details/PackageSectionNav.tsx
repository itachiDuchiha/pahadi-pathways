"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "itinerary",
    label: "Detailed Itinerary",
  },
  {
    id: "stays",
    label: "Stays",
  },
  {
    id: "inclusions",
    label: "What's Included",
  },
  {
    id: "things-to-know",
    label: "Things to Know",
  },
  {
    id: "terms",
    label: "Terms & Conditions",
  },
  {
    id: "cancellation",
    label: "Cancellation Policy",
  },
];

export default function PackageSectionNav() {
  const [activeSection, setActiveSection] =
    useState("overview");

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      /*
       * Main navbar is approximately 96px.
       * Package section navbar sits directly below it.
       *
       * This activation point determines which section
       * is considered active while scrolling.
       */
      const activationPoint = 175;

      let currentSection = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) continue;

        const top = element.getBoundingClientRect().top;

        if (top <= activationPoint) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    const element = document.getElementById(id);

    if (!element) return;

    /*
     * Keep the target section below both:
     * 1. Main navbar
     * 2. Package section navbar
     */
    const offset = 155;

    const elementTop =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementTop - offset,
      behavior: "smooth",
    });

    setActiveSection(id);

    window.history.replaceState(null, "", `#${id}`);
  };

  /*
   * Automatically bring the active tab into view on mobile.
   * This is important when scrolling through the page:
   * if "Stays" becomes active, the navigation will
   * automatically move horizontally so the active item
   * remains visible.
   */
  useEffect(() => {
    const activeElement = document.querySelector(
      `[data-section-id="${activeSection}"]`
    ) as HTMLElement | null;

    if (!activeElement) return;

    activeElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSection]);

  return (
    <nav
      aria-label="Package sections"
      className="
        sticky
        top-[96px]
        z-40
        w-full
        border-y
        border-[#C89A3D]/20
        bg-[#F8F4EA]/98
        shadow-[0_4px_18px_rgba(16,38,74,0.08)]
        backdrop-blur-md
      "
    >
      {/* 
        MOBILE:
        Horizontal scrolling navigation.

        DESKTOP:
        Normal full-width navigation with all items
        distributed evenly.
      */}
      <div
        className="
          w-full
          overflow-x-auto
          overscroll-x-contain
          scrollbar-none
          sm:overflow-x-visible
        "
      >
        <div
          className="
            flex
            min-w-max
            items-stretch
            sm:min-w-0
            sm:w-full
          "
        >
          {sections.map((section, index) => {
            const isActive =
              activeSection === section.id;

            return (
              <a
                key={section.id}
                data-section-id={section.id}
                href={`#${section.id}`}
                onClick={(event) =>
                  handleClick(event, section.id)
                }
                className={`
                  relative
                  flex
                  min-w-[125px]
                  shrink-0
                  items-center
                  justify-center
                  whitespace-nowrap
                  border-r
                  border-[#10264A]/5
                  px-4
                  py-3.5
                  text-center
                  text-[12px]
                  font-semibold
                  tracking-[0.01em]
                  transition-all
                  duration-200

                  sm:min-w-0
                  sm:flex-1
                  sm:px-2
                  sm:py-4
                  sm:text-[13px]

                  lg:text-[14px]

                  ${
                    index === sections.length - 1
                      ? "border-r-0"
                      : ""
                  }

                  ${
                    isActive
                      ? `
                        bg-[#E4D2A0]
                        text-[#10264A]
                      `
                      : `
                        text-[#263B59]
                        hover:bg-[#F1E8D5]
                        hover:text-[#10264A]
                      `
                  }

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-inset
                  focus-visible:ring-[#C89A3D]
                `}
              >
                {section.label}

                {isActive && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-[3px]
                      w-9
                      -translate-x-1/2
                      rounded-t-full
                      bg-[#C89A3D]
                      sm:w-10
                    "
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}