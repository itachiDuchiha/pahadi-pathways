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
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-130px 0px -55% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="sticky top-24 z-40 border-y border-[#10264A]/10 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <nav
          aria-label="Package sections"
          className="flex overflow-x-auto scrollbar-none"
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
                      : "text-gray-500 hover:text-[#10264A]"
                  }
                `}
              >
                {section.label}

                <span
                  className={`
                    absolute
                    bottom-0
                    left-3
                    right-3
                    h-[2px]
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