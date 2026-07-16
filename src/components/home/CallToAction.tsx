export default function CallToAction() {
  return (
    <section
      className="relative my-24 overflow-hidden rounded-3xl"
      style={{
        backgroundImage: "url('/images/hero/himachal-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      <div className="relative mx-auto max-w-5xl px-8 py-24 text-center text-white">
        <h2 className="text-4xl font-bold md:text-5xl">
          Ready to Explore Himachal?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200">
          Whether you're dreaming of a peaceful retreat in Shimla, an
          adventure in Manali, or the breathtaking landscapes of Spiti,
          we'll help you plan a journey that's comfortable, memorable,
          and tailored to you.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-full bg-green-700 px-8 py-4 font-semibold transition hover:bg-green-800">
            Plan My Journey
          </button>

          <button className="rounded-full border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-gray-900">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}