import Hero from "@/components/home/Hero";
import PopularPackages from "@/components/home/PopularPackages";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description:
    "Handcrafted Himachal Pradesh tours, custom itineraries and trusted local hosts for Shimla, Manali, Spiti and beyond.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />

      <PopularPackages />

      <FeaturedDestinations />

      <Testimonials />

      <WhyChooseUs />

      <CallToAction />
    </>
  );
}
