import type { Metadata } from "next";
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
  Info,
  type LucideIcon,
} from "lucide-react";

import { getExperiences } from "@/lib/cms/experiences";
import type { ExperienceIcon } from "@/lib/cms/types";
import { pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/cms/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return pageMetadata(
    {
      title: "Experiences",
      description:
        "Trekking, camping, river rafting, monastery visits and local culture across Himachal Pradesh.",
      path: "/experiences",
    },
    settings
  );
}

const experienceIcons: Record<ExperienceIcon, LucideIcon> = {
  Camera,
  Compass,
  Footprints,
  Home,
  Landmark,
  Mountain,
  Star,
  Utensils,
};

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="bg-[#F7F3E9] text-[#10264A]">
      {/* Hero */}
      <section className="relative isolate flex min-h-[430px] items-center justify-center overflow-hidden pt-20 sm:min-h-[450px] lg:min-h-[480px]">
        <Image
          src="/images/hero/experiences-hero-trekking.webp"
          alt="A trekker exploring a scenic Himalayan mountain trail"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_44%]"
        />

        {/* Balanced overlay keeps the photograph visible while making the centered text readable. */}
        <div className="absolute inset-0 bg-[#081526]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#081526]/35 via-[#081526]/15 to-[#081526]/45" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-12">
          <p className="mb-3 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-xs sm:tracking-[0.35em]">
            <span className="h-px w-8 bg-[#C89A3D] sm:w-10" />
            The Himalayan Compass
            <span className="h-px w-8 bg-[#C89A3D] sm:w-10" />
          </p>

          <h1 className="max-w-4xl font-serif text-3xl font-medium leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Experience the Himalayas
            <span className="mt-2 block font-serif italic text-[#D4AF37]">
              Beyond the Journey
            </span>
          </h1>

          <div className="my-4 flex items-center justify-center gap-2 text-[#D4AF37] sm:my-5">
            <span className="h-px w-10 bg-[#C89A3D] sm:w-14" />
            <span className="text-sm">◆</span>
            <span className="h-px w-10 bg-[#C89A3D] sm:w-14" />
          </div>

          <p className="mx-auto max-w-2xl text-sm leading-6 text-white/95 sm:text-base sm:leading-7">
            Adventure, culture, nature and quiet moments that turn a trip
            through the mountains into a journey worth remembering.
          </p>

          <p className="mt-4 flex flex-wrap items-center justify-center text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-xs sm:tracking-[0.22em]">
            <span>Adventure</span>
            <span className="mx-2 text-[#D4AF37]">•</span>
            <span>Culture</span>
            <span className="mx-2 text-[#D4AF37]">•</span>
            <span>Nature</span>
            <span className="mx-2 text-[#D4AF37]">•</span>
            <span>Local Life</span>
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-12 text-center sm:px-8 sm:py-14">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#C89A3D]">
          What will you experience?
        </p>

        <h2 className="mx-auto max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#10264A] sm:text-4xl">
          Travel with a little more curiosity.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#40516A] sm:text-base sm:leading-7">
          Discover the places, traditions, landscapes and activities that
          make Himachal special. Use this page for inspiration while
          planning your journey with The Himalayan Compass.
        </p>
      </section>

      {/* Experience cards */}
      <section className="bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
              Explore the possibilities
            </p>

            <h2 className="font-serif text-3xl font-semibold leading-tight text-[#10264A] sm:text-4xl">
              Find your kind of Himalayan experience.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#526078]">
              From mountain adventures to quiet village moments, discover
              different ways to experience Himachal.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((experience) => {
              const Icon = experienceIcons[experience.icon];

              return (
                <article
                  key={experience.title}
                  className="group overflow-hidden rounded-xl border border-[#E8E1D3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden sm:h-44">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/35 to-transparent" />

                    <div className="absolute bottom-0 left-4 flex h-11 w-11 translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37] bg-[#F7F3E9] text-[#10264A] shadow-sm">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div className="px-4 pb-5 pt-7">
                    <h3 className="font-serif text-xl font-semibold leading-snug text-[#10264A]">
                      {experience.title}
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-[#526078]">
                      {experience.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#E8D8AE] bg-[#FBF7ED] p-4 text-sm leading-5 text-[#526078]">
            <Info
              size={19}
              className="mt-0.5 shrink-0 text-[#B48625]"
            />
            <p>
              Activities are subject to season, weather, availability and
              local operator rules. Unless specifically mentioned in a
              package&apos;s inclusions, activity fees are not included.
              Some experiences may require separate bookings.
            </p>
          </div>
        </div>
      </section>

      {/* Shimla and Manali featured package */}
      <section className="bg-[#10264A] px-5 py-10 text-white sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              One journey. Many experiences.
            </p>

            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              More than a mountain getaway.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
              Discover Shimla&apos;s colonial charm, travel through scenic
              Himalayan valleys, explore Manali&apos;s temples and forests,
              and enjoy the mountain landscapes around Solang Valley.
              Continue towards the Atal Tunnel and Sissu before ending your
              journey amid the peaceful scenery of Kasol and Parvati Valley.
            </p>

            <p className="mt-3 text-sm leading-5 text-white/70">
              Optional adventure activities and the Rohtang Pass excursion
              may cost extra and depend on availability, permits, weather
              and road conditions.
            </p>

            <Link
              href="/packages/shimla-manali-getaway"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#10264A] transition hover:bg-[#E5C35C]"
            >
              Explore Shimla &amp; Manali Getaway
              <ArrowRight size={17} />
            </Link>
          </div>

          <Link
            href="/packages/shimla-manali-getaway"
            className="group relative block min-h-[260px] overflow-hidden rounded-2xl border border-white/15 sm:min-h-[320px]"
          >
            <Image
              src="/images/packages/manali.webp"
              alt="Snow-covered mountain scenery in Manali"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/85 via-[#081526]/10 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Shimla · Manali · Kasol
              </p>

              <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                Your Himalayan escape.
              </h3>

              <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white">
                View package
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Bottom call to action */}
      <section className="px-5 py-12 text-center sm:px-8 sm:py-14">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
          Your journey starts with a question
        </p>

        <h2 className="mx-auto max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#10264A] sm:text-4xl">
          Where do you want the mountains to take you?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#526078] sm:text-base sm:leading-7">
          Browse our destinations, explore our available packages and find a
          journey that fits the way you want to travel.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/destinations"
            className="inline-flex min-w-52 items-center justify-center gap-2 rounded-full bg-[#10264A] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#193967]"
          >
            Explore Destinations
            <ArrowRight size={17} />
          </Link>

          <Link
            href="/packages"
            className="inline-flex min-w-52 items-center justify-center gap-2 rounded-full border border-[#C89A3D] bg-transparent px-6 py-3.5 text-sm font-bold text-[#10264A] transition hover:bg-[#D4AF37] hover:text-[#10264A]"
          >
            View Packages
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
