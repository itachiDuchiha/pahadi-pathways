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
       * to decide which section is currently being viewed.
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
     * Main navbar + package navbar.
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
        border-[#10264A]/10
        bg-white/97
        shadow-[0_4px_18px_rgba(16,38,74,0.08)]
        backdrop-blur-md
      "
    >
      <div className="w-full px-3 sm:px-5 lg:px-6">
        <div className="flex w-full items-stretch">
          {sections.map((section) => {
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
                  flex
                  flex-1
                  items-center
                  justify-center
                  whitespace-nowrap
                  px-2
                  py-4
                  text-center
                  text-[13px]
                  font-semibold
                  tracking-[0.01em]
                  transition-colors
                  duration-200
                  sm:px-2
                  sm:text-[14px]
                  ${
                    isActive
                      ? "bg-[#DDBE73] text-[#10264A]"
                      : "text-[#52627A] hover:bg-[#F7F3E9] hover:text-[#10264A]"
                  }
                `}
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}