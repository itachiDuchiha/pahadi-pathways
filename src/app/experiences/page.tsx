import Image from "next/image";
import Link from "next/link";
import {
  Mountain,
  Home,
  Landmark,
  Footprints,
  Utensils,
  Star,
  Camera,
  Compass,
  ArrowRight,
} from "lucide-react";

import SiteLayout from "@/components/layout/SiteLayout";

const experiences = [
  {
    title: "Himalayan Road Trips",
    description:
      "Take the long way through dramatic mountain roads, high passes, river valleys and remote Himalayan landscapes.",
    image: "/images/hero/hero.jpg",
    icon: Mountain,
  },
  {
    title: "Village Life & Homestays",
    description:
      "Slow down in mountain villages, stay close to local communities and experience a quieter side of the Himalayas.",
    image: "/images/packages/spiti.jpg",
    icon: Home,
  },
  {
    title: "Monasteries & Culture",
    description:
      "Discover ancient monasteries, Buddhist traditions, mountain temples and the stories that have shaped Himalayan communities.",
    image: "/images/packages/spiti.jpg",
    icon: Landmark,
  },
  {
    title: "Adventure & Trekking",
    description:
      "Explore mountain trails, valleys and lesser-known routes for journeys that go beyond the usual sightseeing.",
    image: "/images/packages/manali.jpg",
    icon: Footprints,
  },
  {
    title: "Food & Local Flavours",
    description:
      "Taste the Himalayas through traditional dishes, local ingredients and simple meals shared along the journey.",
    image: "/images/packages/shimla.jpg",
    icon: Utensils,
  },
  {
    title: "Stargazing & Night Skies",
    description:
      "Far from city lights, experience remarkably clear Himalayan skies and nights filled with stars.",
    image: "/images/packages/spiti.jpg",
    icon: Star,
  },
  {
    title: "Photography & Scenic Views",
    description:
      "From sunrise over mountain ranges to winding roads and quiet villages, every journey offers moments worth capturing.",
    image: "/images/packages/dharamshala.jpg",
    icon: Camera,
  },
  {
    title: "Offbeat Himalayan Exploration",
    description:
      "Go beyond the familiar routes and discover hidden corners, remote landscapes and places that feel genuinely untouched.",
    image: "/images/packages/manali.jpg",
    icon: Compass,
  },
];

export default function ExperiencesPage() {
  return (
    <SiteLayout>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden">
        <Image
          src="/images/hero/experiences-paragliding.png"
          alt="Paragliding over the Himalayan mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081526]/55 via-[#081526]/45 to-[#081526]/75" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center px-6 pb-12 pt-28 text-center sm:px-8 lg:px-10">
          <div className="max-w-4xl text-white">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-[#D4AF37]" />

              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#D4AF37] sm:text-sm">
                THE HIMALAYAN COMPASS
              </p>

              <span className="h-px w-12 bg-[#D4AF37]" />
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl font-medium leading-[0.98] tracking-[-0.025em] sm:text-6xl md:text-7xl lg:text-[4.8rem]">
              Experience the Himalayas
              <span className="mt-2 block font-serif text-[#D4AF37] italic">
                Beyond the Journey
              </span>
            </h1>

            {/* Decorative divider */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-14 bg-[#D4AF37]" />
              <span className="h-2 w-2 rotate-45 bg-[#D4AF37]" />
              <span className="h-px w-14 bg-[#D4AF37]" />
            </div>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-7 text-white/95 sm:text-lg sm:leading-8">
              Adventure, culture, nature and quiet moments that turn a trip
              through the mountains into a journey worth remembering.
            </p>

            {/* Experience categories */}
            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-xs">
              ADVENTURE
              <span className="mx-3 text-[#D4AF37]">•</span>
              CULTURE
              <span className="mx-3 text-[#D4AF37]">•</span>
              NATURE
              <span className="mx-3 text-[#D4AF37]">•</span>
              LOCAL LIFE
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="bg-[#F7F3E9] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D] sm:text-sm">
            WHAT WILL YOU EXPERIENCE?
          </p>

          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#10264A] sm:text-4xl md:text-5xl">
            Travel with a little more curiosity.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#40516B] md:text-lg">
            Our Experiences section is about the things you can see, do,
            taste and discover once you reach the mountains. Use it for
            inspiration when deciding where your next Himalayan journey
            should take you.
          </p>
        </div>
      </section>

      {/* =========================================================
          EXPERIENCE GRID
      ========================================================= */}
      <section className="bg-white px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D] sm:text-sm">
              EXPLORE THE POSSIBILITIES
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#10264A] md:text-4xl">
              Find your kind of Himalayan experience.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#40516B]">
              From mountain adventures to quiet village moments, discover
              different ways to experience Himachal.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {experiences.map((experience) => {
              const Icon = experience.icon;

              return (
                <article
                  key={experience.title}
                  className="group overflow-hidden rounded-2xl bg-white shadow-[0_10px_35px_rgba(16,38,74,0.08)] ring-1 ring-[#10264A]/8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(16,38,74,0.15)]"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/75 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#C89A3D] shadow-lg">
                      <Icon size={21} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#10264A]">
                      {experience.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#40516B]">
                      {experience.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#B78622]">
                      Discover more

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED JOURNEY
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#10264A] px-6 py-24 sm:px-8 lg:px-10">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#C89A3D]/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] sm:text-sm">
              ONE JOURNEY. MANY EXPERIENCES.
            </p>

            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight md:text-5xl">
              Spiti is not just a destination.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
              A single Spiti journey can take you through ancient monasteries,
              remote villages, high-altitude landscapes, winding mountain
              roads, clear night skies and some of the most dramatic scenery
              in the Himalayas.
            </p>

            <Link
              href="/packages/spiti-beyond-the-passes"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#C89A3D] px-7 py-4 text-sm font-bold text-[#10264A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D4AF37] hover:shadow-lg"
            >
              Explore a Spiti Journey
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Image */}
          <div className="relative h-[380px] overflow-hidden rounded-3xl">
            <Image
              src="/images/packages/spiti.jpg"
              alt="Spiti Himalayan landscape"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/60 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                SPITI VALLEY
              </p>

              <p className="mt-2 font-serif text-2xl font-semibold text-white">
                Beyond the passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-[#F7F3E9] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D] sm:text-sm">
            YOUR JOURNEY STARTS WITH A QUESTION
          </p>

          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#10264A] md:text-5xl">
            Where do you want the mountains to take you?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#40516B] md:text-lg">
            Browse our destinations, explore the possibilities and then find
            a journey that fits the way you want to travel.
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
              className="inline-flex items-center gap-2 rounded-full border border-[#10264A]/20 bg-white px-7 py-4 text-sm font-bold text-[#10264A] transition-all duration-300 hover:-translate-y-1 hover:border-[#C89A3D] hover:text-[#B78622] hover:shadow-lg"
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