import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Check, MessageCircle, PhoneCall, CalendarCheck } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const CinematicStory = () => {
  const ref = useRef<HTMLElement>(null);
  const { language } = useTranslation();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const panelY = useTransform(scrollYProgress, [0, .25, .75, 1], [100, 0, 0, -110]);
  const panelRotate = useTransform(scrollYProgress, [0, .3, .75, 1], [8, -1, -1, -7]);
  const panelOpacity = useTransform(scrollYProgress, [0, .18, .82, 1], [0, 1, 1, .08]);
  const copyY = useTransform(scrollYProgress, [0, .25, .75, 1], [70, 0, 0, -70]);
  const content = language === "es" ? {
    eyebrow: "IA EN MOVIMIENTO", title: "Una pregunta.", accent: "Una respuesta completa.", body: "Mientras tu cliente escribe, QubeSight entiende la intención, encuentra disponibilidad y hace que el siguiente paso ocurra.", incoming: "¿Tienen disponibilidad esta semana?", qualified: "Consulta · Jueves por la tarde", booked: "Jueves · 2:30 PM", confirmed: "Reserva confirmada", steps: ["Escucha", "Entiende", "Convierte"]
  } : {
    eyebrow: "AI IN MOTION", title: "One question.", accent: "One complete response.", body: "While your customer writes, QubeSight understands intent, finds availability, and makes the next step happen.", incoming: "Do you have availability this week?", qualified: "Consultation · Thursday afternoon", booked: "Thursday · 2:30 PM", confirmed: "Booking confirmed", steps: ["Listens", "Understands", "Converts"]
  };
  const cards = [
    { icon: MessageCircle, label: "01 / INCOMING", value: content.incoming, tone: "border-white/10 bg-white/[.055]" },
    { icon: PhoneCall, label: "02 / QUALIFIED", value: content.qualified, tone: "border-primary/40 bg-primary/10" },
    { icon: CalendarCheck, label: "03 / BOOKED", value: content.booked, tone: "border-emerald-400/35 bg-emerald-400/10" },
  ];
  return <section ref={ref} className="relative min-h-[170vh] bg-[#06060e] border-y border-white/[.08]">
    <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_42%,hsl(249_85%_58%_/_0.25),transparent_42%),radial-gradient(ellipse_at_15%_85%,hsl(178_100%_40%_/_0.1),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(hsl(0_0%_100%_/_0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%_/_0.05)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="container relative grid gap-14 lg:grid-cols-[.86fr_1.14fr] lg:items-center">
        <motion.div style={{ y: copyY }} className="max-w-xl">
          <p className="mb-7 text-[10px] font-bold tracking-[.22em] text-primary">[ 03 — {content.eyebrow} ]</p>
          <h2 className="display-xl text-[clamp(3.1rem,6.4vw,6.8rem)] text-white">{content.title}<br/><span className="font-serif font-normal italic tracking-[-.065em] text-primary-foreground">{content.accent}</span></h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/55">{content.body}</p>
          <div className="mt-12 flex gap-6">{content.steps.map((step, i) => <div key={step}><p className="text-[10px] tracking-[.15em] text-white/35">0{i + 1}</p><p className="mt-2 text-sm font-semibold text-white">{step}</p></div>)}</div>
        </motion.div>
        <motion.div style={{ y: panelY, rotate: panelRotate, opacity: panelOpacity }} className="relative mx-auto w-full max-w-[590px] rounded-[28px] border border-white/[.12] bg-[#0e1020]/90 p-3 shadow-[0_40px_100px_-35px_rgba(82,70,255,.8)] backdrop-blur-2xl">
          <div className="rounded-[20px] border border-white/[.08] bg-[#090a14] p-6 sm:p-8">
            <div className="mb-10 flex items-center justify-between border-b border-white/[.08] pb-5"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm font-black text-white">Q</span><div><p className="text-xs font-semibold text-white">QubeSight concierge</p><p className="mt-1 text-[10px] text-emerald-300">● online now</p></div></div><span className="text-xs text-white/35">LIVE</span></div>
            <div className="space-y-4">{cards.map((card, i) => <motion.div key={card.label} initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .6 }} transition={{ delay: i * .14, duration: .55 }} className={`ml-auto max-w-[88%] rounded-2xl border p-4 ${card.tone}`}><div className="mb-3 flex items-center gap-2 text-[9px] font-bold tracking-[.14em] text-white/45"><card.icon className="h-3.5 w-3.5"/>{card.label}</div><p className="text-sm font-medium leading-relaxed text-white">{card.value}</p>{i === 2 && <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-300"><Check className="h-3.5 w-3.5"/>{content.confirmed}</p>}</motion.div>)}</div>
            <div className="mt-9 flex gap-1.5">{cards.map((card, i) => <span key={card.label} className={`h-1 flex-1 rounded-full ${i === 2 ? "bg-emerald-400" : "bg-primary"}`}/>)}</div>
          </div>
          <div className="absolute -right-3 -top-3 hidden h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-primary text-white shadow-xl sm:flex"><ArrowUpRight className="h-6 w-6"/></div>
        </motion.div>
      </div>
    </div>
  </section>;
};
export default CinematicStory;

