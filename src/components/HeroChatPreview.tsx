import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Mic, MessageSquare, CalendarCheck, Play, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Waveform = ({ active }: { active: boolean }) => {
  return (
    <div className="flex items-end justify-center gap-[4px] h-10">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-primary to-[hsl(255,70%,72%)]"
          animate={
            active
              ? { height: [6, 22 + ((i * 7) % 18), 10, 28 + ((i * 5) % 14), 14, 6] }
              : { height: 6 }
          }
          transition={{
            duration: 1.4,
            repeat: active ? Infinity : 0,
            repeatType: "reverse",
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

type Step = {
  key: string;
  ms: number;
  labelEs: string;
  labelEn: string;
  icon: typeof Phone;
};

const HeroChatPreview = () => {
  const { language } = useTranslation();
  const es = language === "es";

  const steps: Step[] = useMemo(
    () => [
      { key: "ring", ms: 1400, labelEs: "Llamada entrante", labelEn: "Incoming call", icon: Phone },
      {
        key: "ans",
        ms: 1800,
        labelEs: "IA contesta en 2 seg",
        labelEn: "AI answers in 2s",
        icon: Mic,
      },
      {
        key: "talk",
        ms: 3000,
        labelEs: "Conversa e interpreta",
        labelEn: "Talks & interprets",
        icon: Mic,
      },
      {
        key: "book",
        ms: 2200,
        labelEs: "Agenda el turno",
        labelEn: "Books appointment",
        icon: CalendarCheck,
      },
      {
        key: "sms",
        ms: 2200,
        labelEs: "Envía cotización SMS",
        labelEn: "Sends SMS quote",
        icon: MessageSquare,
      },
    ],
    [],
  );

  const [stepIdx, setStepIdx] = useState(0);
  const [tick, setTick] = useState(0); // forces remount of step content on loop
  const [elapsed, setElapsed] = useState(0);

  // Step advance
  useEffect(() => {
    const t = setTimeout(() => {
      if (stepIdx < steps.length - 1) {
        setStepIdx((i) => i + 1);
      } else {
        // restart loop
        setTimeout(() => {
          setStepIdx(0);
          setElapsed(0);
          setTick((n) => n + 1);
        }, 1500);
      }
    }, steps[stepIdx].ms);
    return () => clearTimeout(t);
  }, [stepIdx, steps]);

  // Call timer (only while active)
  useEffect(() => {
    if (stepIdx === 0) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [stepIdx, tick]);

  const current = steps[stepIdx];
  const callActive = stepIdx >= 1;
  const m = Math.floor(elapsed / 60)
    .toString()
    .padStart(2, "0");
  const s = (elapsed % 60).toString().padStart(2, "0");

  return (
    <div className="bezel-shell">
      <div className="bezel-inner p-6 sm:p-7">
        {/* Auto-demo tag + step indicator */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1">
            <Play className="h-3 w-3 text-primary" fill="currentColor" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              {es ? "Demo automática" : "Auto demo"}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 px-3 py-1">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
              {callActive ? (es ? "En vivo" : "Live") : es ? "Sonando" : "Ringing"}
            </span>
          </div>
        </div>

        {/* Step progress dots */}
        <div className="flex items-center gap-1.5 mb-5">
          {steps.map((st, i) => (
            <div key={st.key} className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                key={`${st.key}-${tick}`}
                initial={{ width: i < stepIdx ? "100%" : "0%" }}
                animate={{ width: i <= stepIdx ? "100%" : "0%" }}
                transition={{ duration: i === stepIdx ? st.ms / 1000 : 0.3, ease: "linear" }}
                className="h-full bg-gradient-to-r from-primary to-[hsl(258,70%,68%)]"
              />
            </div>
          ))}
        </div>

        {/* Avatar + name */}
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: callActive ? 1 : [1, 1.04, 1] }}
            transition={{ duration: callActive ? 0.4 : 0.9, repeat: callActive ? 0 : Infinity }}
            className="relative mx-auto mb-3 w-20 h-20"
          >
            {!callActive && (
              <>
                <span
                  className="absolute inset-0 rounded-full bg-primary/25 animate-ping"
                  style={{ animationDuration: "1.2s" }}
                />
                <span
                  className="absolute -inset-3 rounded-full bg-primary/10 animate-ping"
                  style={{ animationDuration: "1.6s" }}
                />
              </>
            )}
            <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-[hsl(249,65%,56%)] to-[hsl(258,70%,62%)] grid place-items-center text-white shadow-[0_0_40px_-8px_hsl(249,70%,50%,0.5)]">
              <Phone className="h-7 w-7" strokeWidth={1.5} />
            </div>
          </motion.div>
          <div className="text-lg font-semibold text-foreground tracking-tight">QubeSight AI</div>
          <div className="text-xs text-muted-foreground tabular-nums">
            {callActive ? `${m}:${s}` : es ? "Llamando…" : "Calling…"}
          </div>
        </div>

        {/* Waveform */}
        <div className="mb-4">
          <Waveform active={callActive && stepIdx <= 2} />
        </div>

        {/* Current step label */}
        <div className="flex items-center justify-center gap-2 mb-4 min-h-[28px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.key}-${tick}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1.5"
            >
              <current.icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
              <span className="text-xs text-foreground/90 font-medium">
                {es ? current.labelEs : current.labelEn}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hairline my-4" />

        {/* Event stream */}
        <div className="flex flex-col gap-2.5 text-left min-h-[170px]">
          <AnimatePresence>
            {stepIdx >= 2 && (
              <motion.div
                key={`q-${tick}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bubble-in rounded-2xl rounded-bl-md px-3.5 py-2 text-[12.5px] leading-snug max-w-[85%]"
              >
                {es ? "Hola, ¿cuánto cuesta una limpieza dental?" : "Hi, how much is a cleaning?"}
              </motion.div>
            )}
            {stepIdx >= 2 && (
              <motion.div
                key={`a-${tick}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="self-end bubble-out rounded-2xl rounded-br-md px-3.5 py-2 text-[12.5px] leading-snug max-w-[85%]"
              >
                {es ? "$80. ¿Te agendo mañana 10am?" : "$80. Book you tomorrow 10am?"}
              </motion.div>
            )}

            {stepIdx >= 3 && (
              <motion.div
                key={`book-${tick}`}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-center gap-3 rounded-xl bg-emerald-400/[0.06] border border-emerald-400/20 px-3.5 py-2.5"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-400/15 grid place-items-center">
                  <CalendarCheck className="h-4 w-4 text-emerald-300" />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold text-foreground">
                    {es ? "Turno confirmado" : "Appointment confirmed"}
                  </div>
                  <div className="text-[10.5px] text-muted-foreground">
                    {es ? "Mar 23 Jun · 10:00 · Limpieza" : "Tue Jun 23 · 10:00 · Cleaning"}
                  </div>
                </div>
                <Check className="h-4 w-4 text-emerald-300" />
              </motion.div>
            )}

            {stepIdx >= 4 && (
              <motion.div
                key={`sms-${tick}`}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-center gap-3 rounded-xl bg-primary/[0.06] border border-primary/20 px-3.5 py-2.5"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/15 grid place-items-center">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold text-foreground">
                    {es ? "SMS enviado · cotización" : "SMS sent · quote"}
                  </div>
                  <div className="text-[10.5px] text-muted-foreground font-mono truncate">
                    {es ? "Limpieza $80 — confirmar: y/n" : "Cleaning $80 — confirm: y/n"}
                  </div>
                </div>
                <Check className="h-4 w-4 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeroChatPreview;
