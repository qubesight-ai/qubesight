import { Bot, CheckCircle2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MatildaLiveCallButton from "@/components/MatildaLiveCallButton";
import { useMatildaLiveCall } from "@/hooks/useMatildaLiveCall";
import { useTranslation } from "@/hooks/useTranslation";

/** Landing voice demo: real-time call with Matilda via LiveKit (matilda-realtime-agent). */
const MatildaVoiceDemo = () => {
  const { t, language } = useTranslation();
  const spanish = language === "es";
  const call = useMatildaLiveCall();
  const live = call.status === "live";

  return (
    <section id="demo" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="eyebrow">
            <Volume2 className="h-3.5 w-3.5" /> {spanish ? "Demo de voz" : "Voice demo"}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl mt-5">
            {spanish ? "Conversa con un " : "Talk to a "}
            <span className="gradient-text">
              {spanish ? "agente de QubeSight." : "QubeSight agent."}
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {spanish
              ? "Llama a Matilda en tiempo real desde tu navegador y escucha cómo atiende a tus clientes."
              : "Call Matilda in real time from your browser and hear how she serves your customers."}
          </p>
        </div>
        <div className="max-w-3xl mx-auto bezel-shell">
          <div className="bezel-inner bento-tile p-5 sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-primary/15 text-primary border border-primary/30 grid place-items-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Matilda</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${live ? "bg-primary" : "bg-emerald-400"}`} />
                    {live ? (spanish ? "En llamada" : "On a call") : spanish ? "En línea" : "Online"}
                  </p>
                </div>
              </div>
            </div>
            <div className="min-h-48 py-6 space-y-3" aria-live="polite">
              {call.lines.length ? (
                call.lines.map((item) => (
                  <div
                    key={item.id}
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${item.speaker === "user" ? "ml-auto bubble-out" : "bubble-in"}`}
                  >
                    <span className="block text-[10px] uppercase tracking-wider opacity-70 mb-1">
                      {item.speaker === "user" ? (spanish ? "Tú" : "You") : "Matilda"}
                    </span>
                    {item.text}
                  </div>
                ))
              ) : (
                <div className="min-h-40 grid place-items-center text-center text-sm text-muted-foreground">
                  {live
                    ? spanish
                      ? "Matilda te saludará en un momento…"
                      : "Matilda will greet you in a moment…"
                    : spanish
                      ? "Presiona el botón y habla con Matilda como si llamaras a un negocio."
                      : "Press the button and talk to Matilda as if calling a business."}
                </div>
              )}
            </div>
            <MatildaLiveCallButton
              call={call}
              spanish={spanish}
              className="border-t border-white/10 pt-5 text-center text-muted-foreground"
            />
            <p className="mx-auto mt-5 max-w-2xl px-2 text-center text-xs leading-relaxed text-muted-foreground/70 sm:px-4">
              {t("matilda.demoLatencyDisclaimer")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button type="button" variant="heroOutline" asChild>
                <a href="#early-adopters">
                  {spanish
                    ? "Quiero ver cómo funcionaría en mi negocio"
                    : "See how it would work for my business"}{" "}
                  <CheckCircle2 />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MatildaVoiceDemo;
