import Image from "next/image";
import {
  ArrowRight,
  Car,
  Clock3,
  Hotel,
  MapPin,
  Star,
  UtensilsCrossed,
} from "lucide-react";

type PackageCardProps = {
  title: string;
  image: string;
  duration: string;
  rating: number;
  pickup: string;
  price: string;
  itinerary: string[];
  hiddenItinerary?: string[];
  includes: string[];
  popular?: boolean;
};

export default function PackageCard({
  title,
  image,
  duration,
  rating,
  pickup,
  price,
  itinerary,
  hiddenItinerary = [],
  includes,
  popular = false,
}: PackageCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* IMAGE */}

      <div className="relative h-56">

        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {popular && (

          <span className="absolute left-4 top-4 rounded-full bg-[#C89A3D] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#10264A] shadow-lg">

            Most Popular

          </span>

        )}

      </div>

      {/* CONTENT */}

      <div className="p-4">

        <div className="relative group/title">

  <h3 className="truncate text-xl font-bold leading-tight text-[#10264A]">
    {title}
  </h3>

  <div className="absolute right-0 top-8 z-50 hidden w-56 rounded-lg border border-[#C89A3D] bg-white px-3 py-2 text-xs font-medium text-[#10264A] shadow-xl group-hover/title:block">

  {title}

</div>

</div>

        {/* TOP INFO */}

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">

          <div className="flex items-center gap-2">

            <Clock3
              size={15}
              className="text-[#C89A3D]"
            />

            <span className="font-medium text-gray-700">

              {duration}

            </span>

          </div>

          <div className="flex items-center gap-2">

            <MapPin
              size={15}
              className="text-[#C89A3D]"
            />

            <span className="font-medium text-gray-700">

              {pickup}

            </span>

          </div>

          <div className="ml-auto flex items-center gap-1 rounded-full bg-[#10264A] px-3 py-1 text-white">

            <Star
              size={13}
              fill="currentColor"
            />

            <span className="text-xs font-semibold">

              {rating}

            </span>

          </div>

        </div>

        {/* ITINERARY */}

        <div className="mt-4">

          <div className="flex flex-wrap gap-x-2 gap-y-2">

            {itinerary.map((stop, index) => {

              const parts = stop.split(" ");

              return (

                <div
                  key={stop}
                  className="flex items-center text-[14px]"
                >

                  <span className="font-semibold text-[#10264A]">

                    {parts[0]}

                  </span>

                  <span className="ml-1 text-gray-700">

                    {parts.slice(1).join(" ")}

                  </span>

                  {index !== itinerary.length - 1 && (

                    <span className="mx-2 text-gray-300">

                      •

                    </span>

                  )}

                </div>

              );

            })}

            {hiddenItinerary.length > 0 && (

              <div className="relative group">

                <span className="cursor-pointer font-semibold text-[#10264A]">

                  +{hiddenItinerary.length} More

                </span>

                <div className="absolute right-0 top-7 z-40 hidden w-44 rounded-lg border border-[#C89A3D] bg-white px-2 py-2 text-xs shadow-xl group-hover:block">

                  {hiddenItinerary.map((item) => {

                    const parts = item.split(" ");

                    return (

                      <div
                        key={item}
                        className="mb-1 flex items-center last:mb-0"
                      >

                        <span className="text-xs font-semibold text-[#10264A]">

                          {parts[0]}

                        </span>

                        <span className="ml-1 text-gray-700">

                          {parts.slice(1).join(" ")}

                        </span>

                      </div>

                    );

                  })}

                </div>

              </div>

            )}

          </div>

        </div>
                {/* INCLUDES */}

        <div className="mt-5 flex items-center justify-between text-sm">

          {includes.includes("Transfer") && (

            <div className="flex items-center gap-2">

              <Car
                size={16}
                className="text-[#10264A]"
              />

              <span className="text-gray-700">
                Transfer
              </span>

            </div>

          )}

          {includes.includes("Stay") && (

            <div className="flex items-center gap-2">

              <Hotel
                size={16}
                className="text-[#10264A]"
              />

              <span className="text-gray-700">
                Stay
              </span>

            </div>

          )}

          {includes.includes("Meals") && (

            <div className="flex items-center gap-2">

              <UtensilsCrossed
                size={16}
                className="text-[#10264A]"
              />

              <span className="text-gray-700">
                Meals
              </span>

            </div>

          )}

        </div>

        {/* PRICE */}

        <div className="mt-5 flex items-end justify-between">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">

              Starting From

            </p>

            <h4 className="mt-1 text-3xl font-bold text-[#10264A]">

              {price}

            </h4>

          </div>

          <span className="text-xs text-gray-500">

            Per Person

          </span>

        </div>

        {/* BUTTON */}

        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#10264A] py-3 font-semibold text-white transition duration-300 hover:bg-[#18355F]">

          View Details

          <ArrowRight
            size={17}
          />

        </button>

      </div>

    </article>

  );
}