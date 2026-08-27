import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const DemoTemplateShell = ({ children }: { children: ReactNode }) => (
  <div className="prototype-shell demo-template-shell min-h-screen">
    <Header />
    <div className="prototype-demo-cubes" aria-hidden="true">
      <span /><span /><span />
    </div>
    <main className="relative z-10 pt-20">{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default DemoTemplateShell;

