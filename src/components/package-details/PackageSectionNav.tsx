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
    label: "Day-by-Day Journey",
  },
  {
    id: "stays",
    label: "Stays",
  },
  {
    id: "highlights",
    label: "Journey Highlights",
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
        rootMargin: "-150px 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    const element = document.getElementById(id);

    if (!element) return;

    const navbarOffset = 135;

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - navbarOffset,
      behavior: "smooth",
    });

    setActiveSection(id);
  };

  return (
    <nav
      className="
        sticky
        top-[72px]
        z-40
        border-y
        border-[#10264A]/10
        bg-white/95
        shadow-[0_4px_18px_rgba(16,38,74,0.06)]
        backdrop-blur-md
      "
      aria-label="Package sections"
    >
      <div className="mx-auto max-w-6xl overflow-x-auto px-5 sm:px-6">
        <div className="flex min-w-max items-center gap-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) =>
                  handleClick(event, section.id)
                }
                className={`
                  relative
                  whitespace-nowrap
                  px-3
                  py-4
                  text-[11px]
                  font-semibold
                  tracking-[0.01em]
                  transition-colors
                  duration-200
                  sm:px-4
                  sm:text-[12px]
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
                    duration-200
                    sm:left-4
                    sm:right-4
                    ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                    }
                  `}
                />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}