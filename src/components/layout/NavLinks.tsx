"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  scrolled: boolean;
};

const links = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Packages", href: "/packages" },
  { name: "Experiences", href: "#" },
  { name: "Gallery", href: "#" },
];

export default function NavLinks({ scrolled }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-8">

        {links.map((link) => {
          const active =
            pathname === link.href && link.href !== "#";

          const textColor = active
            ? "text-[#C89A3D]"
            : scrolled
            ? "text-[#10264A] hover:text-[#C89A3D]"
            : "text-white hover:text-[#D9B255]";

          if (link.href === "#") {
            return (
              <li key={link.name}>
                <span
                  className={`group relative cursor-pointer font-medium transition-all duration-300 ${textColor}`}
                >
                  {link.name}

                  <span
                    className="
                      absolute
                      -bottom-1.5
                      left-0
                      h-[2px]
                      w-0
                      bg-[#C89A3D]
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </span>
              </li>
            );
          }

          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`group relative font-medium transition-all duration-300 ${textColor}`}
              >
                {link.name}

                <span
                  className={`
                    absolute
                    -bottom-1.5
                    left-0
                    h-[2px]
                    bg-[#C89A3D]
                    transition-all
                    duration-300
                    ${
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />
              </Link>
            </li>
          );
        })}

      </ul>
    </nav>
  );
}