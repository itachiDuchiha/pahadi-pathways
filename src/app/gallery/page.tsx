import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Mountain,
  MapPin,
  ArrowRight,
} from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const galleryItems = [
  {
    title: "Spiti Valley",
    category: "Landscapes",
    image: "/images/packages/spiti-package.jpg",
    size: "large",
  },
  {
    title: "The Himalayan Roads",
    category: "Road Journeys",
    image: "/images/hero/hero.jpg",
    size: "normal",
  },
  {
    title: "Shimla",
    category: "Mountain Towns",
    image: "/images/packages/shimla-package.jpg",
    size: "normal",
  },
  {
    title: "Manali",
    category: "Valleys",
    image: "/images/packages/manali-package.jpg",
    size: "large",
  },
  {
    title: "Mountain Journeys",
    category: "Travel",
    image: "/images/hero/hero.jpg",
    size: "normal",
  },
  {
    title: "Himalayan Escapes",
    category: "Landscapes",
    image: "/images/packages/spiti-package.jpg",
    size: "normal",
  },
];

export default function GalleryPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative flex min-h-[65vh] items-center overflow-hidden">
        <Image
          src="/images/hero/hero.jpg"
          alt="Himalayan mountain landscape"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#081526]/90 via-[#081526]/65 to-[#081526]/35" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 sm:px-8 lg:px-10">
          <div className="max-w-3xl text-white">
            <div className="mb-5 flex items-center gap-3">
              <Camera
                size={20}
                className="text-[#D4AF37]"
                strokeWidth={1.8}
              />

              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                The Himalayan Compass
              </p>
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.05] md:text-7xl">
              The Gallery
              <span className="block font-light text-white/90">
                See the journey.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
              Mountains, roads, villages and quiet moments. A glimpse into
              the landscapes and experiences that make a Himalayan journey
              worth remembering.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#F7F3E9] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
            A glimpse of the Himalayas
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-[#10264A] md:text-5xl">
            Every road has a story.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            This is where we share the atmosphere of the places we travel
            through — dramatic landscapes, mountain roads, peaceful valleys,
            villages and the little moments between destinations.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                Explore the collection
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-[#10264A] md:text-4xl">
                Moments from the mountains.
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mountain size={17} className="text-[#C89A3D]" />
              <span>Himalayan journeys</span>
            </div>
          </div>

          {/* MASONRY-STYLE GRID */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className={`group relative overflow-hidden rounded-2xl ${
                  item.size === "large"
                    ? "h-[430px] md:h-[500px]"
                    : "h-[330px] md:h-[360px]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/85 via-[#081526]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Location icon */}
                <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#C89A3D] shadow-lg backdrop-blur-sm">
                  <MapPin size={18} strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                    {item.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  <div className="mt-3 h-[2px] w-0 bg-[#C89A3D] transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO / FUTURE MEDIA SECTION */}
      <section className="bg-[#10264A] px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-white">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                More than photographs
              </p>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">
                See the mountains in motion.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
                The gallery will eventually grow beyond photographs with
                short cinematic clips from the road, village life, mountain
                passes, stays and other moments from our journeys.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#D4AF37]">
                <Camera size={18} />
                <span>Short travel films coming here</span>
              </div>
            </div>

            <div className="relative flex h-[360px] items-center justify-center overflow-hidden rounded-3xl bg-[#081526]">
              <Image
                src="/images/hero/hero.jpg"
                alt="Himalayan road journey"
                fill
                className="object-cover opacity-55"
              />

              <div className="absolute inset-0 bg-[#081526]/45" />

              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md">
                <span className="ml-1 text-2xl">▶</span>
              </div>

              <p className="absolute bottom-6 left-6 text-sm font-medium text-white/80">
                Himalayan Compass — Journey Stories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F7F3E9] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
            Ready to see it yourself?
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-[#10264A] md:text-5xl">
            The best view is the one you experience.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
            Explore the destinations behind these landscapes or browse our
            journeys and start planning your own Himalayan escape.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full bg-[#10264A] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#183966] hover:shadow-lg"
            >
              Explore Destinations
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/packages"
              className="inline-flex items-center gap-2 rounded-full border border-[#10264A]/20 bg-white px-7 py-4 text-sm font-bold text-[#10264A] transition-all duration-300 hover:-translate-y-1 hover:border-[#C89A3D] hover:text-[#C89A3D] hover:shadow-lg"
            >
              View Packages
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}