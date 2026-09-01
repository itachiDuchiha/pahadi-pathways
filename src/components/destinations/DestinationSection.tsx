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
    <section className="mx-auto max-w-6xl px-6 py-11 md:py-13">
      {/* ================= SECTION HEADING ================= */}

      <div className="mb-7 text-center md:mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          {subtitle}
        </p>

        <h2 className="mt-2.5 font-serif text-3xl font-medium text-[#10264A] md:text-4xl">
          {title}
        </h2>
      </div>

      {/* ================= DESTINATION CARDS ================= */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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