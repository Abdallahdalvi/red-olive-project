import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { HajjUmrahSection } from "@/components/home/HajjUmrahSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ContactCTA } from "@/components/home/ContactCTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PopularDestinations />
        <ServicesSection />
        <FeaturedPackages />
        <HajjUmrahSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <StatsSection />
        <BlogSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;