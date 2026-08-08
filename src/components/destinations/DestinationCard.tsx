import Image from "next/image";
import Link from "next/link";

type DestinationCardProps = {
  destination: {
    name: string;
    slug: string;
    subtitle: string;
    description: string;
    image: string;
    category?: string;
  };
};

export default function DestinationCard({
  destination,
}: DestinationCardProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-lg
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* Image */}

      <div className="relative h-[340px] overflow-hidden">

        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/90 via-transparent to-transparent" />

        {/* Category Badge */}

        {destination.category && (
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#10264A] backdrop-blur">
            {destination.category}
          </div>
        )}

        {/* Title */}

        <div className="absolute bottom-6 left-6 right-6 text-white">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            {destination.subtitle}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {destination.name}
          </h3>

        </div>
      </div>

      {/* Content */}

      <div className="p-7">

        <p className="leading-7 text-gray-600">
          {destination.description}
        </p>

        <Link
          href={`/destinations/${destination.slug}`}
          className="
            mt-7
            inline-flex
            items-center
            font-semibold
            text-[#10264A]
            transition-all
            duration-300
            hover:text-[#C89A3D]
          "
        >
          Explore Destination

          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>
    </article>
  );
}