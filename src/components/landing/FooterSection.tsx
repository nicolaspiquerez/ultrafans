import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";
import { addWaitlistEntry } from "@/lib/firebase";

export default function FooterSection() {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"fan" | "club" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTypeSelect = (selected: "fan" | "club") => {
    setType(selected);
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!type) {
      setError(t("footer.errorSelectType"));
      return;
    }
    if (!email.trim()) return;

    setLoading(true);
    try {
      await addWaitlistEntry(email.trim(), type);
      setSubmitted(true);
      setError("");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.7 },
        colors: ["#FFD700", "#1a1a2e", "#FFFFFF", "#FF6B4A", "#4B0082"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.75 },
          colors: ["#FFD700", "#1a1a2e", "#FFFFFF"],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.75 },
          colors: ["#FFD700", "#1a1a2e", "#FFFFFF"],
        });
      }, 300);
    } catch (err) {
      console.error("Waitlist error:", err);
      setError(t("footer.errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  const APP_VERSION = "1.0.0";

  return (
    <footer id="footer" ref={ref} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 dark-gradient dark-section">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-white mb-4">
            {t("footer.title")}
          </h2>
          <p className="font-body text-brand-white/50 mb-8">
            {t("footer.subtitle")}
          </p>

          {!submitted ? (
            <>
              {/* Two role buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
                <button
                  onClick={() => handleTypeSelect("club")}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-display font-bold text-base transition-all hover:scale-105 active:scale-95 ${
                    type === "club"
                      ? "bg-brand-yellow text-brand-dark ring-2 ring-brand-yellow/50"
                      : "bg-brand-white/10 text-brand-white border border-brand-white/20 hover:border-brand-yellow/40"
                  }`}
                >
                  {t("footer.imClub")}
                </button>
                <button
                  onClick={() => handleTypeSelect("fan")}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-display font-bold text-base transition-all hover:scale-105 active:scale-95 ${
                    type === "fan"
                      ? "bg-brand-yellow text-brand-dark ring-2 ring-brand-yellow/50"
                      : "bg-brand-white/10 text-brand-white border border-brand-white/20 hover:border-brand-yellow/40"
                  }`}
                >
                  {t("footer.imFan")}
                </button>
              </div>

              {error && (
                <p className="font-body text-sm text-red-400 mb-4">{error}</p>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  required
                  className="flex-1 px-5 py-4 rounded-xl bg-brand-white/10 border-2 border-brand-white/20 text-brand-white placeholder:text-brand-white/30 font-body text-base focus:outline-none focus:border-brand-yellow/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-yellow text-brand-dark font-display font-bold text-base transition-all hover:scale-105 active:scale-95 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 mx-auto text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    t("footer.cta")
                  )}
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-6 py-6 rounded-xl bg-brand-white/10 border-2 border-brand-yellow/30"
            >
              <span className="text-3xl block mb-2">🥐</span>
              <p className="font-display font-bold text-lg text-brand-white">
                {type === "fan" ? t("footer.successFanTitle") : t("footer.successClubTitle")}
              </p>
              <p className="text-sm text-brand-white/50 font-body">
                {type === "fan"
                  ? t("footer.successFanSubtitle")
                  : t("footer.successClubSubtitle")}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-brand-white/10 text-center">
        <p className="font-display text-2xl font-bold text-brand-yellow mb-4">{t("footer.brand")}</p>
        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-6">
          <a
            href="/about.html"
            className="font-body text-sm text-brand-white/40 hover:text-brand-white transition-colors"
          >
            {t("footer.aboutUs")}
          </a>
          <a
            href="/careers.html"
            className="font-body text-sm text-brand-white/40 hover:text-brand-white transition-colors"
          >
            {t("footer.careers")}
          </a>
          <Link
            to="/blog"
            className="font-body text-sm text-brand-white/40 hover:text-brand-white transition-colors"
          >
            {t("footer.blog")}
          </Link>
        </div>
        <p className="font-body text-xs text-brand-white/20 mb-2">{t("footer.copyright")}</p>
        <p className="font-body text-xs text-brand-white/10 mt-1">v{APP_VERSION}</p>
      </div>
    </footer>
  );
}
