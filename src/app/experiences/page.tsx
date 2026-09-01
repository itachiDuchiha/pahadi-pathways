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
    image: "/images/packages/spiti-package.jpg",
    icon: Home,
  },
  {
    title: "Monasteries & Culture",
    description:
      "Discover ancient monasteries, Buddhist traditions, mountain temples and the stories that have shaped Himalayan communities.",
    image: "/images/packages/spiti-package.jpg",
    icon: Landmark,
  },
  {
    title: "Adventure & Trekking",
    description:
      "Explore mountain trails, valleys and lesser-known routes for journeys that go beyond the usual sightseeing.",
    image: "/images/packages/manali-package.jpg",
    icon: Footprints,
  },
  {
    title: "Food & Local Flavours",
    description:
      "Taste the Himalayas through traditional dishes, local ingredients and simple meals shared along the journey.",
    image: "/images/packages/shimla-package.jpg",
    icon: Utensils,
  },
  {
    title: "Stargazing & Night Skies",
    description:
      "Far from city lights, experience remarkably clear Himalayan skies and nights filled with stars.",
    image: "/images/packages/spiti-package.jpg",
    icon: Star,
  },
  {
    title: "Photography & Scenic Views",
    description:
      "From sunrise over mountain ranges to winding roads and quiet villages, every journey offers moments worth capturing.",
    image: "/images/hero/hero.jpg",
    icon: Camera,
  },
  {
    title: "Offbeat Himalayan Exploration",
    description:
      "Go beyond the familiar routes and discover hidden corners, remote landscapes and places that feel genuinely untouched.",
    image: "/images/packages/manali-package.jpg",
    icon: Compass,
  },
];

export default function ExperiencesPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <Image
          src="/images/hero/hero.jpg"
          alt="Himalayan mountain landscape"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#081526]/90 via-[#081526]/70 to-[#081526]/35" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 sm:px-8 lg:px-10">
          <div className="max-w-3xl text-white">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              THE HIMALAYAN COMPASS
            </p>

            <h1 className="text-5xl font-extrabold leading-[1.05] md:text-7xl">
              Experiences
              <span className="block font-light text-white/90">
                beyond the itinerary.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
              The Himalayas are more than destinations on a map. They are
              roads, villages, monasteries, flavours, adventures and quiet
              moments that become part of the journey.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#F7F3E9] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
            What will you experience?
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-[#10264A] md:text-5xl">
            Travel with a little more curiosity.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            Our Experiences section is about the things you can see, do,
            taste and discover once you reach the mountains. Use it for
            inspiration when deciding where your next Himalayan journey
            should take you.
          </p>
        </div>
      </section>

      {/* EXPERIENCE GRID */}
      <section className="bg-white px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
              Explore the possibilities
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#10264A] md:text-4xl">
              Find your kind of Himalayan experience.
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {experiences.map((experience) => {
              const Icon = experience.icon;

              return (
                <article
                  key={experience.title}
                  className="group overflow-hidden rounded-2xl bg-white shadow-[0_10px_35px_rgba(16,38,74,0.08)] ring-1 ring-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(16,38,74,0.15)]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/75 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#C89A3D] shadow-lg">
                      <Icon size={21} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#10264A]">
                      {experience.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {experience.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#C89A3D]">
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

      {/* FEATURED JOURNEY */}
      <section className="relative overflow-hidden bg-[#10264A] px-6 py-24 sm:px-8 lg:px-10">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#C89A3D]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="text-white">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              One journey. Many experiences.
            </p>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">
              Spiti is not just a destination.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
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

          <div className="relative h-[380px] overflow-hidden rounded-3xl">
            <Image
              src="/images/packages/spiti-package.jpg"
              alt="Spiti Himalayan landscape"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Spiti Valley
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                Beyond the passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F7F3E9] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
            Your journey starts with a question
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-[#10264A] md:text-5xl">
            Where do you want the mountains to take you?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
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