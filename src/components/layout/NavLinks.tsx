import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "#" },
  { name: "Packages", href: "#" },
  { name: "Gallery", href: "#" },
  { name: "Contact", href: "#" },
];

export default function NavLinks() {
  return (
    <nav>
      <ul className="flex items-center gap-10">
        {links.map((link) => (
          <li key={link.name}>
            {link.href === "#" ? (
              <span className="group relative cursor-pointer font-medium text-gray-800 transition-colors duration-300 hover:text-[#C89B3C]">
                {link.name}

                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#C89B3C] transition-all duration-300 group-hover:w-full"></span>
              </span>
            ) : (
              <Link
                href={link.href}
                className="group relative font-medium text-gray-800 transition-colors duration-300 hover:text-[#C89B3C]"
              >
                {link.name}

                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#C89B3C] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}