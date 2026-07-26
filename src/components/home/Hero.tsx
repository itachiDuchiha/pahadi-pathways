import Navbar from "../layout/Navbar";

type HeroProps = {
  onPlanTrip: () => void;
};

export default function Hero({ onPlanTrip }: HeroProps) {
  return (
    <section
      className="relative min-h-[54vh] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero/hero.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071220]/40 via-[#071220]/55 to-[#071220]/72"></div>

      <Navbar onPlanTrip={onPlanTrip} />

      <div className="relative z-10 flex min-h-[54vh] items-center justify-center px-6 pt-6 pb-10 text-center">
        <div className="max-w-5xl">

          {/* Brand */}
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37] md:text-sm">
            THE HIMALAYAN COMPASS
          </p>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-2xl md:text-6xl">
            Where Every Mountain
            <br />
            Tells a Story
          </h1>

          {/* Gold Divider */}
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-[#C89A3D]"></div>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-100 md:text-lg">
            Curated journeys through the Himalayas, crafted for unforgettable
            adventures and authentic experiences.
          </p>

          {/* Planner */}
          <div className="mx-auto mt-10 hidden max-w-6xl items-center rounded-3xl bg-white p-4 shadow-2xl md:flex">

            <div className="flex-1 px-6 text-left">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Destination
              </p>

              <p className="mt-1 text-lg text-gray-800">
                Where would you like to go?
              </p>
            </div>

            <div className="h-12 w-px bg-gray-200"></div>

            <div className="flex-1 px-6 text-left">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Travel Dates
              </p>

              <p className="mt-1 text-lg text-gray-800">
                Select Dates
              </p>
            </div>

            <div className="h-12 w-px bg-gray-200"></div>

            <div className="flex-1 px-6 text-left">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Travelers
              </p>

              <p className="mt-1 text-lg text-gray-800">
                2 Adults
              </p>
            </div>

            <button
              onClick={onPlanTrip}
              className="ml-4 rounded-2xl bg-[#10264A] px-8 py-4 font-semibold text-white transition hover:bg-[#183A63]"
            >
              Plan Journey
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}