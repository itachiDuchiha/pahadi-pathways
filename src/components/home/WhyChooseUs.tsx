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
    description: "Carefully planned journeys across Himachal.",
  },
  {
    icon: MapPinned,
    title: "Local Mountain Experts",
    description: "Guided by people who truly know the mountains.",
  },
  {
    icon: Hotel,
    title: "Handpicked Stays",
    description: "Comfortable hotels and authentic homestays.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    description: "Trusted partners and experienced drivers.",
  },
  {
    icon: HeartHandshake,
    title: "Personal Support",
    description: "We're here before, during and after your trip.",
  },
  {
    icon: Sparkles,
    title: "Tailor-Made Holidays",
    description: "Trips customized to your style and budget.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-8">

      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#C89A3D]">
            WHY CHOOSE US
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#10264A] md:text-4xl">
            Travel Better With
            <br />
            The Himalayan Compass
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#C89A3D]" />

          <p className="mt-4 text-base leading-7 text-gray-600">
            Everything you need for a smooth, memorable Himachal journey.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex items-start gap-3 rounded-2xl border border-gray-100 bg-[#F8F8F6] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#C89A3D]/40 hover:shadow-xl"
              >

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#10264A] transition-all duration-300 group-hover:bg-[#C89A3D]">

                  <Icon
                    size={20}
                    className="text-white transition-all duration-300 group-hover:text-[#10264A]"
                  />

                </div>

                <div>

                  <h3 className="text-lg font-bold text-[#10264A]">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
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