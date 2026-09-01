import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface NicheDemoPageProps {
  title: string;
  subtitle: string;
  badge: string;
  children: ReactNode;
}

const NicheDemoPage = ({ title, subtitle, badge, children }: NicheDemoPageProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative pt-32 pb-8 sm:pt-40 sm:pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="container relative">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider rounded-full glass-card text-primary">
              {badge}
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold font-display leading-tight mb-6 text-balance max-w-4xl">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">{subtitle}</p>
          </div>
        </section>

        <section className="pb-24 sm:pb-32">
          <div className="container">
            <div style={{ paddingTop: 40 }} className="flex justify-center">
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default NicheDemoPage;
