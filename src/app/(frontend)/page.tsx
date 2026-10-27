import Hero from "@/components/home/Hero";
import PopularPackages from "@/components/home/PopularPackages";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

import JsonLd from "@/components/seo/JsonLd";

import { getPackages } from "@/lib/cms/packages";
import { getTestimonials } from "@/lib/cms/testimonials";
import { defaultDescription, pageMetadata } from "@/lib/seo";
import { websiteJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  description: defaultDescription,
  path: "/",
});

export default async function Home() {
  const [packages, testimonials] = await Promise.all([getPackages(), getTestimonials()]);

  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      <Hero />

      <PopularPackages packages={packages} />

      <FeaturedDestinations />

      <Testimonials testimonials={testimonials} />

      <WhyChooseUs />

      <CallToAction />
    </>
  );
}
