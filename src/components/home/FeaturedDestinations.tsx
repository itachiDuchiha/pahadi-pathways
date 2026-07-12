import DestinationCard from "../ui/DestinationCard";

export default function FeaturedDestinations() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Explore Our Destinations
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Discover the beauty of Himachal Pradesh through our carefully
            curated experiences in Shimla, Manali and Spiti Valley.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          <DestinationCard
            title="Shimla"
            image="/images/destinations/shimla.jpg"
            description="Walk through colonial streets, enjoy scenic viewpoints and experience the charm of Himachal's capital."
          />

          <DestinationCard
            title="Manali"
            image="/images/destinations/manali.jpg"
            description="From snow-covered peaks to thrilling adventures, Manali offers something unforgettable in every season."
          />

          <DestinationCard
            title="Spiti Valley"
            image="/images/destinations/spiti.jpg"
            description="Experience breathtaking monasteries, dramatic landscapes and one of India's most spectacular high-altitude deserts."
          />

        </div>

      </div>
    </section>
  );
}