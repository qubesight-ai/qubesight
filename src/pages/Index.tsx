import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import CinematicStory from "@/components/sections/CinematicStory";
import TrustBar from "@/components/sections/TrustBar";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import Multichannel from "@/components/sections/Multichannel";
import Products from "@/components/sections/Products";
import VoiceBot from "@/components/sections/VoiceBot";
import Industries from "@/components/sections/Industries";
import Benefits from "@/components/sections/Benefits";
import SocialProof from "@/components/sections/SocialProof";
import Testimonials from "@/components/sections/Testimonials";
import Founders from "@/components/sections/Founders";
import Integrations from "@/components/sections/Integrations";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import GuaranteeStrip from "@/components/sections/GuaranteeStrip";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackgroundScene from "@/components/three/BackgroundScene";
import ParticleNetwork from "@/components/three/ParticleNetwork";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();
  return (
    <div className="min-h-screen relative">
      <BackgroundScene />
      <ParticleNetwork />
      <div className="grain-overlay" aria-hidden="true" />
      <div className="relative" style={{ zIndex: 2 }}>
        <Header />
        <main>
          <Hero />
          <CinematicStory />
          <TrustBar />
          <Problem />
          <Solution />
          <HowItWorks />
          <Multichannel />
          <Products />
          <VoiceBot />
          <Industries />
          <Benefits />
          <SocialProof />
          <Testimonials />
          <Founders />
          <Integrations />
          <Pricing />
          <FAQ />
          <GuaranteeStrip />
          <FinalCTA />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;

