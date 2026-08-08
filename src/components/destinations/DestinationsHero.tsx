import Image from "next/image";

export default function DestinationsHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero/hero.jpg"
        alt="Explore Himachal Pradesh"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#081526]/70" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C89A3D] md:text-sm">
          EXPLORE HIMACHAL
        </p>

        <h1 className="mt-5 text-5xl font-extrabold leading-tight md:text-7xl">
          Every Journey
          <br />
          Begins With
          <span className="block text-[#C89A3D]">
            A Destination
          </span>
        </h1>

        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[#C89A3D]" />

        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl">
          Discover iconic hill stations, hidden valleys, peaceful monasteries,
          alpine lakes and unforgettable Himalayan experiences across Himachal
          Pradesh.
        </p>
      </div>
    </section>
  );
}