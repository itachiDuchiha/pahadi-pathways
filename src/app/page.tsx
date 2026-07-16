import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularPackages from "@/components/home/PopularPackages";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedDestinations />
        <WhyChooseUs />
        <PopularPackages />
        <Testimonials />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}