import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import SportsVerticals from "@/components/landing/SportsVerticals";
import SocialProof from "@/components/landing/SocialProof";
import FoldTransition from "@/components/landing/FoldTransition";
import PartnerSection from "@/components/landing/PartnerSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <FeatureShowcase />
      <SportsVerticals />
      <SocialProof />
      <FoldTransition />
      <PartnerSection />
      <FooterSection />
    </main>
  );
};

export default Index;
