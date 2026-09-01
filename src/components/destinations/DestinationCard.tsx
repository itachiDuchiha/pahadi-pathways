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
      <div className="relative h-[300px] overflow-hidden">
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

        <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/90 via-[#081526]/15 to-transparent" />

        {destination.category && (
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#10264A] backdrop-blur">
            {destination.category}
          </div>
        )}

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            {destination.subtitle}
          </p>

          <h3 className="mt-1.5 text-2xl font-bold">
            {destination.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="leading-7 text-gray-600">
          {destination.description}
        </p>

        <Link
          href={`/destinations/${destination.slug}`}
          className="
            mt-6
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