"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#F8F6F1] px-6 py-20">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-medium tracking-tight text-[#10264A] md:text-5xl">
          Something went wrong
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500 md:text-base">
          An unexpected error occurred while loading this page.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="
            mt-8
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
          Try again
        </button>
      </div>
    </div>
  );
}
