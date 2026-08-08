import DestinationCard from "./DestinationCard";

type Destination = {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  category?: string;
};

type DestinationSectionProps = {
  title: string;
  subtitle: string;
  destinations: Destination[];
};

export default function DestinationSection({
  title,
  subtitle,
  destinations,
}: DestinationSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      {/* Section Heading */}

      <div className="mb-12 text-center">

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          {subtitle}
        </p>

        <h2 className="mt-4 text-3xl font-bold text-[#10264A] md:text-4xl">
          {title}
        </h2>

      </div>

      {/* Destination Cards */}

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.slug}
            destination={destination}
          />
        ))}
      </div>

    </section>
  );
}