export default function CallToAction() {
  return (
    <section
      className="relative my-20 overflow-hidden rounded-3xl"
      style={{
        backgroundImage: "url('/images/hero/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#10264A]/85 via-[#10264A]/70 to-black/60"></div>

      {/* Content */}

      <div className="relative mx-auto max-w-5xl px-8 py-24 text-center text-white">

        {/* Small Label */}

        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D9B255]">
          LET'S PLAN YOUR JOURNEY
        </p>

        {/* Heading */}

        <h2 className="mt-4 text-4xl font-bold md:text-5xl">
          Ready to Explore Himachal?
        </h2>

        {/* Gold Divider */}

        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#D9B255]"></div>

        {/* Text */}

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200">
          Whether you're dreaming of a peaceful retreat in Shimla,
          an adventure in Manali, or the breathtaking landscapes
          of Spiti, we'll help you plan a journey that's comfortable,
          memorable, and tailored to you.
        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">

          {/* Primary */}

          <button
            className="
              rounded-full
              bg-[#C89A3D]
              px-9
              py-4
              font-semibold
              text-[#10264A]
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#D7AE57]
              hover:shadow-xl
              active:scale-95
            "
          >
            Plan My Journey
          </button>

          {/* Secondary */}

          <button
            className="
              rounded-full
              border
              border-white/60
              bg-white/10
              px-9
              py-4
              font-semibold
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-white
              hover:bg-white
              hover:text-[#10264A]
              hover:shadow-xl
              active:scale-95
            "
          >
            Contact Us
          </button>

        </div>

      </div>
    </section>
  );
}