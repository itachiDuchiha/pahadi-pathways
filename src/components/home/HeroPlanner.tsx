import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Users,
} from "lucide-react";

export default function HeroPlanner() {
  return (
    <section className="relative z-30 mb-2 hidden md:block">
      <div className="mx-auto flex max-w-6xl items-center rounded-2xl bg-white px-3 py-2 shadow-[0_30px_70px_rgba(0,0,0,0.18)]">

        {/* Destination */}
        <button className="flex flex-[1.8] items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300 hover:bg-gray-100">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF]">
            <MapPin
              size={18}
              strokeWidth={2.4}
              className="text-[#10264A]"
            />
          </div>

          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Destination
            </p>

            <p className="whitespace-nowrap text-[15px] font-medium text-gray-800">
              Where would you like to go?
            </p>
          </div>

          <ChevronDown
            size={18}
            className="ml-auto text-gray-400"
          />
        </button>

        <div className="h-10 w-px bg-gray-200"></div>

        {/* Dates */}
        <button className="flex flex-1 items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300 hover:bg-gray-100">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF]">
            <CalendarDays
              size={18}
              strokeWidth={2.4}
              className="text-[#10264A]"
            />
          </div>

          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Dates
            </p>

            <p className="text-[15px] font-medium text-gray-800">
              Select Dates
            </p>
          </div>

          <ChevronDown
            size={18}
            className="ml-auto text-gray-400"
          />
        </button>

        <div className="h-10 w-px bg-gray-200"></div>

        {/* Travelers */}
        <button className="flex flex-1 items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300 hover:bg-gray-100">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF]">
            <Users
              size={18}
              strokeWidth={2.4}
              className="text-[#10264A]"
            />
          </div>

          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Travelers
            </p>

            <p className="text-[15px] font-medium text-gray-800">
              2 Adults
            </p>
          </div>

          <ChevronDown
            size={18}
            className="ml-auto text-gray-400"
          />
        </button>

        <button className="ml-3 rounded-xl bg-[#C89A3D] px-9 py-3 font-semibold text-[#10264A] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#D9B255] hover:shadow-xl">
          Search
        </button>

      </div>
    </section>
  );
}