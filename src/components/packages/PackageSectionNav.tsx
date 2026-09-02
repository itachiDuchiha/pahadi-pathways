"use client";

import { useEffect, useState } from "react";

const sections = [
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
    label: "Inclusions & Exclusions",
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
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;

      /*
        Main website navbar:
        96px tall

        Package section navbar:
        sits directly underneath it

        We use a combined offset so the active section
        changes at the correct visual position.
      */
      const offset = 150;

      let currentSection = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) continue;

        const sectionTop =
          element.getBoundingClientRect().top + window.scrollY;

        if (scrollPosition + offset >= sectionTop) {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    /*
      Main navbar = 96px
      Package section nav = approximately 50px

      This keeps the selected heading visible
      instead of hiding it behind either navbar.
    */
    const offset = 150;

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div
      className="
        sticky
        top-[96px]
        z-40
        border-y
        border-[#10264A]/10
        bg-white/95
        shadow-sm
        backdrop-blur-md
      "
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <nav
          aria-label="Package sections"
          className="
            flex
            overflow-x-auto
            scrollbar-none
          "
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`
                  relative
                  shrink-0
                  whitespace-nowrap
                  px-4
                  py-4
                  text-[11px]
                  font-semibold
                  transition-colors
                  duration-200
                  sm:px-5
                  sm:text-xs
                  ${
                    isActive
                      ? "text-[#10264A]"
                      : "text-[#64748B] hover:text-[#10264A]"
                  }
                `}
              >
                {section.label}

                {/* Active gold indicator */}
                <span
                  className={`
                    absolute
                    bottom-0
                    left-3
                    right-3
                    h-[3px]
                    rounded-full
                    bg-[#C89A3D]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                    }
                  `}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}