import Navbar from "../layout/Navbar";
import HeroPlanner from "./HeroPlanner";

type HeroProps = {
  onPlanTrip: () => void;
};

export default function Hero({ onPlanTrip }: HeroProps) {
  return (
    <>
      {/* HERO */}
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero/hero.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071220]/40 via-[#071220]/55 to-[#071220]/72"></div>

        <Navbar onPlanTrip={onPlanTrip} />

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[68vh] items-center justify-center px-6 pt-24 pb-36 text-center">
          <div className="max-w-5xl">

            {/* Brand */}
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37] md:text-sm">
              THE HIMALAYAN COMPASS
            </p>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.08] text-white drop-shadow-2xl md:text-6xl">
              Where Every Mountain
              <br />
              Tells a Story
            </h1>

            {/* Gold Divider */}
            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-[#C89A3D]"></div>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-9 text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] md:text-xl">
              Curated journeys through the Himalayas,
              <br />
              crafted for unforgettable adventures and authentic experiences.
            </p>

          </div>
        </div>
      </section>

      {/* SEARCH PLANNER */}
      <div className="relative z-30 mx-auto -mt-10 max-w-6xl px-6">
        <HeroPlanner />
      </div>
    </>
  );
}