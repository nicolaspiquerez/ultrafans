import { useTranslation } from "react-i18next";

interface LanguageToggleProps {
  dark?: boolean;
}

export default function LanguageToggle({ dark = false }: LanguageToggleProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("fr") ? "fr" : "en";

  const toggle = () => {
    i18n.changeLanguage(currentLang === "fr" ? "en" : "fr");
  };

  if (dark) {
    return (
      <button
        onClick={toggle}
        className="font-display text-sm font-bold tracking-wide px-3 py-1.5 rounded-full border-2 border-brand-white/20 hover:border-brand-yellow/50 transition-colors bg-brand-white/5"
      >
        <span className={currentLang === "fr" ? "text-brand-yellow" : "text-brand-white/40"}>FR</span>
        <span className="text-brand-white/30 mx-1">|</span>
        <span className={currentLang === "en" ? "text-brand-yellow" : "text-brand-white/40"}>EN</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="font-display text-sm font-bold tracking-wide px-3 py-1.5 rounded-full border-2 border-foreground/20 hover:border-foreground/40 transition-colors bg-foreground/5"
    >
      <span className={currentLang === "fr" ? "text-foreground" : "text-foreground/40"}>FR</span>
      <span className="text-foreground/30 mx-1">|</span>
      <span className={currentLang === "en" ? "text-foreground" : "text-foreground/40"}>EN</span>
    </button>
  );
}
