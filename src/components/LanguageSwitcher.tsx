import { useTranslation } from "@/hooks/useTranslation";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] p-0.5"
    >
      <button
        type="button"
        onClick={() => setLanguage("es")}
        aria-pressed={language === "es"}
        className={`min-h-[32px] min-w-[40px] rounded-full px-2.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
          language === "es"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`min-h-[32px] min-w-[40px] rounded-full px-2.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
          language === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
