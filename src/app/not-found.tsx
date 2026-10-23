import Link from "next/link";

import SiteLayout from "@/components/layout/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F8F6F1] px-6 py-20">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C89A3D]">
            404
          </p>

          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#10264A] md:text-5xl">
            Page not found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500 md:text-base">
            The page you are looking for does not exist or has moved.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/packages"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-[#C89A3D]
                px-7
                py-3.5
                text-xs
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#10264A]
                shadow-[0_8px_25px_rgba(0,0,0,0.22)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#D4AF37]
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.28)]
                active:scale-[0.97]
                sm:px-8
                sm:py-4
                sm:text-sm
              "
            >
              Browse packages
            </Link>

            <Link
              href="/destinations"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-[#10264A]/20
                bg-white/70
                px-7
                py-3.5
                text-xs
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#10264A]
                shadow-[0_4px_14px_rgba(16,38,74,0.05)]
                transition-all
                duration-300
                hover:border-[#C89A3D]
                hover:bg-white
                hover:text-[#B5852F]
                sm:px-8
                sm:py-4
                sm:text-sm
              "
            >
              Explore destinations
            </Link>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
