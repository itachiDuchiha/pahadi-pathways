import {
  Compass,
  Hotel,
  ShieldCheck,
  MapPinned,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Curated Experiences",
    description:
      "Thoughtfully crafted journeys designed around unforgettable Himalayan experiences.",
  },
  {
    icon: MapPinned,
    title: "Local Mountain Experts",
    description:
      "Travel with people who know the mountains better than anyone else.",
  },
  {
    icon: Hotel,
    title: "Handpicked Stays",
    description:
      "Comfortable hotels and homestays selected for quality, location and hospitality.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    description:
      "Experienced drivers, trusted partners and complete peace of mind.",
  },
  {
    icon: HeartHandshake,
    title: "Personal Support",
    description:
      "We're with you before, during and after your journey whenever you need us.",
  },
  {
    icon: Sparkles,
    title: "Tailor-Made Holidays",
    description:
      "Every itinerary is personalized to match your travel style and budget.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white pt-10 pb-14">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#C89A3D]">
            WHY CHOOSE US
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#10264A] md:text-5xl">
            Travel Better With
            <br />
            The Himalayan Compass
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#C89A3D]" />

          <p className="mt-5 text-lg leading-7 text-gray-600">
            Premium journeys, trusted local expertise and unforgettable
            experiences — everything you need for the perfect Himalayan escape.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#F8F8F6] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C89A3D]/40 hover:shadow-xl"
              >

                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#10264A] transition-all duration-300 group-hover:bg-[#C89A3D]">

                  <Icon
                    size={22}
                    className="text-white transition-all duration-300 group-hover:text-[#10264A]"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-[#10264A]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-[15px] leading-6 text-gray-600">
                    {feature.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}