import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("fr") ? "fr" : "en";

  const toggle = () => {
    i18n.changeLanguage(currentLang === "fr" ? "en" : "fr");
  };

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
