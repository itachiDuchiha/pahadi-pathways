"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Mountain,
  MapPin,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
  Images,
} from "lucide-react";

import type { GalleryItem } from "@/lib/cms/types";

const categories = [
  "All Moments",
  "Landscapes",
  "Mountain Towns",
  "Road Journeys",
  "Valleys",
  "Local Life",
];

/*
  VIDEO GALLERY

  Add your videos to:
  public/videos/

  Then replace an empty src with a filename, for example:
  src: "/videos/spiti-journey.mp4"

  Keep the poster image as the video thumbnail.
*/

const videoItems = [
  {
    title: "A Journey Through Spiti",
    category: "Road Stories",
    src: "",
    poster: "/images/hero/hero-jpg.webp",
    duration: "Travel film",
  },
  {
    title: "The Quiet Side of Himachal",
    category: "Local Life",
    src: "",
    poster: "/images/hero/hero-jpg.webp",
    duration: "Mountain moments",
  },
  {
    title: "Roads Into the Himalayas",
    category: "Scenic Journeys",
    src: "",
    poster: "/images/hero/hero-jpg.webp",
    duration: "On the road",
  },
];

type GalleryExplorerProps = {
  items: GalleryItem[];
};

export default function GalleryExplorer({ items: galleryItems }: GalleryExplorerProps) {
  const [activeCategory, setActiveCategory] = useState("All Moments");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "All Moments"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeCategory
        );

  const closeOverlays = () => {
    setSelectedImage(null);
    setSelectedVideo(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlays();
      }

      if (selectedImage !== null) {
        if (event.key === "ArrowRight") {
          setSelectedImage(
            (current) =>
              current === null
                ? null
                : (current + 1) % filteredItems.length
          );
        }

        if (event.key === "ArrowLeft") {
          setSelectedImage(
            (current) =>
              current === null
                ? null
                : (current - 1 + filteredItems.length) %
                  filteredItems.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, selectedVideo, filteredItems.length]);

  return (
    <>
      {/* ================================================== */}
      {/* PHOTO GALLERY */}
      {/* ================================================== */}

      <section
        id="gallery-collection"
        className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 md:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section heading */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
                The photo collection
              </p>

              <h2 className="mt-3 font-serif text-3xl font-medium text-[#10264A] sm:text-4xl md:text-5xl">
                Moments from the mountains.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                A visual journal of mountain landscapes, scenic roads
                and the little moments that make the journey.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-sm text-gray-500">
              <Images size={18} className="text-[#C89A3D]" />
              <span>{filteredItems.length} photographs</span>
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setSelectedImage(null);
                  }}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full border px-5 py-3 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                    isActive
                      ? "border-[#10264A] bg-[#10264A] text-white shadow-md"
                      : "border-[#10264A]/15 bg-white text-[#10264A] hover:border-[#C89A3D] hover:text-[#9A7020]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Editorial photo grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <button
                key={`${item.title}-${item.category}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                aria-label={`View photograph: ${item.title}`}
                className={`group relative block w-full overflow-hidden rounded-sm bg-[#10264A] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89A3D] focus-visible:ring-offset-4 ${
                  item.size === "large"
                    ? "h-[380px] sm:h-[440px] lg:h-[480px]"
                    : "h-[320px] sm:h-[350px] lg:h-[360px]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/90 via-[#081526]/10 to-[#081526]/10 transition-colors duration-500 group-hover:from-[#081526]/95" />

                {/* Gold top accent */}
                <div className="absolute left-5 top-0 h-1 w-12 bg-[#C89A3D] transition-all duration-500 group-hover:w-20" />

                {/* Location marker */}
                <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#081526]/25 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-[#C89A3D] group-hover:bg-[#C89A3D] group-hover:text-[#10264A]">
                  <MapPin size={17} strokeWidth={1.6} />
                </div>

                {/* Card text */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E5BD60] sm:text-xs">
                    {item.category}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl font-medium sm:text-3xl">
                    {item.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-white/70 sm:text-sm">
                      {item.location}
                    </p>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:border-[#C89A3D] group-hover:bg-[#C89A3D] group-hover:text-[#10264A]">
                      <ArrowRight size={16} />
                    </span>
                  </div>

                  <div className="mt-4 h-px w-full bg-white/20">
                    <div className="h-px w-0 bg-[#C89A3D] transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Empty state for future category changes */}
          {filteredItems.length === 0 && (
            <div className="py-20 text-center">
              <Mountain
                size={34}
                className="mx-auto text-[#C89A3D]"
              />
              <p className="mt-4 text-lg text-[#10264A]">
                More moments are on their way.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================================================== */}
      {/* VIDEO COLLECTION */}
      {/* ================================================== */}

      <section className="bg-[#10264A] px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            {/* Video introduction */}
            <div className="text-white">
              <div className="flex items-center gap-3">
                <Film size={19} className="text-[#D4AF37]" />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Beyond photographs
                </p>
              </div>

              <h2 className="mt-5 font-serif text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
                See the mountains
                <span className="block italic text-[#D4AF37]">
                  in motion.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                Some journeys deserve more than a photograph. Explore
                cinematic travel films, scenic drives and the atmosphere
                of life in the Himalayas.
              </p>

              <div className="mt-7 flex items-center gap-3 text-sm text-white/75">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C89A3D]/50 text-[#D4AF37]">
                  <Play size={15} fill="currentColor" />
                </span>
                <span>Travel stories, one moment at a time.</span>
              </div>
            </div>

            {/* Video cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              {videoItems.map((video, index) => (
                <div
                  key={video.title}
                  className={`group relative overflow-hidden bg-[#081526] ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative ${
                      index === 0
                        ? "aspect-[16/8] sm:aspect-[16/7]"
                        : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={video.poster}
                      alt={video.title}
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 640px) 100vw, 70vw"
                          : "(max-width: 640px) 100vw, 35vw"
                      }
                      className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/95 via-[#081526]/15 to-[#081526]/10" />

                    {video.src ? (
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(index)}
                        aria-label={`Play ${video.title}`}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-[#C89A3D] text-[#10264A] shadow-xl transition-transform duration-300 group-hover:scale-110">
                          <Play size={21} fill="currentColor" />
                        </span>
                      </button>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[#C89A3D] group-hover:bg-[#C89A3D] group-hover:text-[#10264A]">
                          <Play size={20} />
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                        {video.category}
                      </p>

                      <h3 className="mt-2 font-serif text-xl font-medium text-white sm:text-2xl">
                        {video.title}
                      </h3>

                      <p className="mt-2 text-xs text-white/65">
                        {video.src ? video.duration : "Video coming soon"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-white/45">
            Video placeholders are ready for your own travel footage.
            Add your video files and update their paths in the gallery
            configuration when they are available.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* PHOTO LIGHTBOX */}
      {/* ================================================== */}

      {selectedImage !== null && filteredItems[selectedImage] && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050B14]/95 p-4 backdrop-blur-md sm:p-8"
          onClick={closeOverlays}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery photograph"
        >
          <button
            type="button"
            onClick={closeOverlays}
            aria-label="Close photograph"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#C89A3D] hover:text-[#10264A] sm:right-7 sm:top-7"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            aria-label="Previous photograph"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImage(
                (selectedImage - 1 + filteredItems.length) %
                  filteredItems.length
              );
            }}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#C89A3D] hover:text-[#10264A] sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative mx-auto h-[65vh] max-h-[760px] w-full">
              <Image
                src={filteredItems[selectedImage].image}
                alt={filteredItems[selectedImage].title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="mx-auto mt-5 max-w-3xl text-center text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] sm:text-xs">
                {filteredItems[selectedImage].category}
              </p>

              <h3 className="mt-2 font-serif text-2xl sm:text-3xl">
                {filteredItems[selectedImage].title}
              </h3>

              <p className="mt-2 text-sm text-white/60">
                {filteredItems[selectedImage].location}
              </p>

              <p className="mt-3 text-xs text-white/40">
                {selectedImage + 1} of {filteredItems.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Next photograph"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImage(
                (selectedImage + 1) % filteredItems.length
              );
            }}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#C89A3D] hover:text-[#10264A] sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* ================================================== */}
      {/* VIDEO PLAYER */}
      {/* ================================================== */}

      {selectedVideo !== null && videoItems[selectedVideo]?.src && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050B14]/95 p-4 backdrop-blur-md sm:p-8"
          onClick={closeOverlays}
          role="dialog"
          aria-modal="true"
          aria-label="Travel video player"
        >
          <button
            type="button"
            onClick={closeOverlays}
            aria-label="Close video"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#C89A3D] hover:text-[#10264A] sm:right-7 sm:top-7"
          >
            <X size={22} />
          </button>

          <div
            className="w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              key={videoItems[selectedVideo].src}
              src={videoItems[selectedVideo].src}
              poster={videoItems[selectedVideo].poster}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] w-full bg-black"
            />

            <h3 className="mt-4 font-serif text-xl text-white sm:text-2xl">
              {videoItems[selectedVideo].title}
            </h3>

            <p className="mt-2 text-sm text-white/60">
              {videoItems[selectedVideo].category}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
