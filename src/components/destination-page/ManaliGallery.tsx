import Image from "next/image";

type Props = {
  images: string[];
};

export default function ManaliGallery({ images }: Props) {
  return (
    <div className="w-full">
      <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">

        {/* =====================================================
            MAIN IMAGE — MANALI 1
        ===================================================== */}

        <div className="relative h-[300px] overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 md:h-[420px]">

          <Image
            src={images[0]}
            alt="Manali temple surrounded by cedar forests"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-700 hover:scale-105"
          />

        </div>


        {/* =====================================================
            SECOND IMAGE — MANALI 2
        ===================================================== */}

        <div className="relative h-[145px] overflow-hidden rounded-3xl md:col-span-1 md:h-[202px]">

          <Image
            src={images[1]}
            alt="Snow-covered mountains near Manali"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-700 hover:scale-105"
          />

        </div>


        {/* =====================================================
            THIRD IMAGE — MANALI 3
        ===================================================== */}

        <div className="relative h-[145px] overflow-hidden rounded-3xl md:col-span-1 md:h-[202px]">

          <Image
            src={images[2]}
            alt="Atal Tunnel Rohtang near Manali"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-700 hover:scale-105"
          />

        </div>


        {/* =====================================================
            FOURTH IMAGE — MANALI 4
        ===================================================== */}

        <div className="relative h-[145px] overflow-hidden rounded-3xl md:col-span-2 md:col-start-3 md:row-start-2 md:h-[202px]">

          <Image
            src={images[3]}
            alt="River rafting adventure near Manali"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-700 hover:scale-105"
          />

        </div>

      </div>
    </div>
  );
}