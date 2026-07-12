import FeatureCard from "../ui/FeatureCard";
import {
  Car,
  Hotel,
  MapPinned,
  Headset,
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Pahadi Pathways?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            We make exploring Himachal effortless by providing comfortable
            transportation, carefully selected stays, and connecting you
            with trusted local experiences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <FeatureCard
            icon={Car}
            title="Comfortable Travel"
            description="Travel safely in clean, well-maintained vehicles with experienced local drivers."
          />

          <FeatureCard
            icon={Hotel}
            title="Handpicked Stays"
            description="Stay in carefully selected hotels and authentic homestays that match your comfort and budget."
          />

          <FeatureCard
            icon={MapPinned}
            title="Trusted Local Experiences"
            description="Discover Himachal through reliable local partners offering sightseeing and unforgettable activities."
          />

          <FeatureCard
            icon={Headset}
            title="Dedicated Support"
            description="From planning your trip to reaching home safely, we're always here to assist you."
          />

        </div>

      </div>
    </section>
  );
}