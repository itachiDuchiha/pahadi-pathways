import Logo from "./Logo";
import NavLinks from "./NavLinks";

type NavbarProps = {
  onPlanTrip: () => void;
};

export default function Navbar({ onPlanTrip }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <div className="flex flex-shrink-0 items-center">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="hidden flex-1 justify-center lg:flex">
          <NavLinks />
        </nav>

        {/* CTA Button */}
        <div className="flex flex-shrink-0 items-center">
          <button
            onClick={onPlanTrip}
            className="rounded-full bg-[#C89A3D] px-8 py-3.5 font-semibold text-[#10264A] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#D7AE57] hover:shadow-xl active:scale-95"
          >
            Plan My Journey
          </button>
        </div>

      </div>
    </header>
  );
}