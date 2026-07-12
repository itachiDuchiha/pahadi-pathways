import Navbar from "../layout/Navbar";

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero/hero.jpg')"
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <Navbar />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-4xl">

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Where Every Mountain
            <br />
            Tells a Story
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Discover Himachal like never before with handcrafted journeys
            through Shimla, Manali &amp; Spiti Valley.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

            <button className="rounded-full bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800">
              Explore Packages
            </button>

            <button className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200">
              Plan My Trip
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}