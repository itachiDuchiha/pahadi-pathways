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
       * Main navbar = approximately 96px
       * Package section navbar = approximately 52px
       *
       * We use a point slightly below both navbars
       * to determine which section is currently visible.
       */
      const activationPoint = 175;

      let currentSection = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) continue;

        const top =
          element.getBoundingClientRect().top;

        if (top <= activationPoint) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(
          updateActiveSection
        );

        ticking = true;
      }
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateActiveSection
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    const element =
      document.getElementById(id);

    if (!element) return;

    /*
     * Leave enough space for:
     * Main navbar + package section navbar.
     */
    const offset = 155;

    const elementTop =
      element.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top: elementTop - offset,
      behavior: "smooth",
    });

    setActiveSection(id);

    window.history.replaceState(
      null,
      "",
      `#${id}`
    );
  };

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
      <div className="w-full px-3 sm:px-5 lg:px-6">
        <div className="flex w-full items-stretch">
          {sections.map((section, index) => {
            const isActive =
              activeSection === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) =>
                  handleClick(
                    event,
                    section.id
                  )
                }
                className={`
                  relative
                  flex
                  flex-1
                  items-center
                  justify-center
                  whitespace-nowrap
                  border-r
                  border-[#10264A]/5
                  px-2
                  py-4
                  text-center
                  text-[13px]
                  font-semibold
                  tracking-[0.01em]
                  transition-all
                  duration-200
                  sm:px-2
                  sm:text-[14px]

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
                      w-10
                      -translate-x-1/2
                      rounded-t-full
                      bg-[#C89A3D]
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