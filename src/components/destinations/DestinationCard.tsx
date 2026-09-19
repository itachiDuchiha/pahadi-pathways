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
    <Link
      href={`/destinations/${destination.slug}`}
      className="
        group
        block
        overflow-hidden
        rounded-3xl
        border
        border-[#10264A]/8
        bg-white
        shadow-[0_8px_30px_rgba(16,38,74,0.08)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#C89A3D]/60
        hover:shadow-[0_18px_45px_rgba(16,38,74,0.14)]
        focus:outline-none
        focus:ring-2
        focus:ring-[#C89A3D]
        focus:ring-offset-2
      "
    >
      {/* ================= IMAGE ================= */}

      <div className="relative h-[285px] overflow-hidden">
        <Image
          src={destination.image}
          alt={`${destination.name}, Himachal Pradesh`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* Dark cinematic gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#081526]/95
            via-[#081526]/25
            to-transparent
          "
        />

        {/* Subtle golden hover glow */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#C89A3D]/10
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* ================= FEATURED BADGE ================= */}

        {destination.category && (
          <div
            className="
              absolute
              left-5
              top-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#C89A3D]/70
              bg-[#081526]/65
              px-3.5
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#D4AF37]
              shadow-[0_4px_15px_rgba(0,0,0,0.18)]
              backdrop-blur-md
              transition-all
              duration-300
              group-hover:border-[#D4AF37]
              group-hover:bg-[#081526]/80
            "
          >
            <span className="text-[8px] text-[#D4AF37]">✦</span>

            <span>{destination.category}</span>

            <span className="h-px w-4 bg-[#C89A3D]/70" />
          </div>
        )}

        {/* ================= IMAGE CONTENT ================= */}

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#D4AF37]
            "
          >
            {destination.subtitle}
          </p>

          <h3
            className="
              mt-1.5
              font-serif
              text-3xl
              font-medium
              leading-tight
              tracking-[-0.01em]
            "
          >
            {destination.name}
          </h3>
        </div>
      </div>

      {/* ================= CARD CONTENT ================= */}

      <div className="flex min-h-[170px] flex-col p-6">
        <p className="text-[15px] leading-7 text-gray-600">
          {destination.description}
        </p>

        {/* ================= CTA ================= */}

        <div
          className="
            mt-auto
            inline-flex
            w-fit
            items-center
            gap-2
            pt-5
            text-sm
            font-bold
            text-[#10264A]
            transition-all
            duration-300
            group-hover:text-[#C89A3D]
          "
        >
          <span>Explore Destination</span>

          <span
            className="
              text-base
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}