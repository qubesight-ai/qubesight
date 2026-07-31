import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Problem from "@/components/sections/Problem";
import Assistant from "@/components/sections/Assistant";
import Multichannel from "@/components/sections/Multichannel";
import VoiceBot from "@/components/sections/VoiceBot";

import QubeOps from "@/components/sections/QubeOps";
import Industries from "@/components/sections/Industries";
import DemoNiches from "@/components/sections/DemoNiches";
import Testimonials from "@/components/sections/Testimonials";
import Founders from "@/components/sections/Founders";
import GuaranteeStrip from "@/components/sections/GuaranteeStrip";
import Differentiation from "@/components/sections/Differentiation";
import Pricing from "@/components/sections/Pricing";
import ROI from "@/components/sections/ROI";
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
          <TrustBar />
          <Problem />
          <Assistant />
          <Multichannel />
          <VoiceBot />
          <QubeOps />
          <Industries />
          <DemoNiches />
          <Differentiation />
          <Testimonials />
          <Founders />
          <Pricing />
          <GuaranteeStrip />
          <ROI />
          <FinalCTA />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
