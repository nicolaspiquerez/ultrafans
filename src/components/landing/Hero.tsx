import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";
import { addWaitlistEntry } from "@/lib/firebase";
import athleteSoccer from "@/assets/athlete-soccer.jpg";
import athleteBasketball from "@/assets/athlete-basketball.jpg";
import athleteNfl from "@/assets/athlete-nfl.jpg";
import athleteUfc from "@/assets/athlete-ufc.jpg";
import fansCheering from "@/assets/fans-cheering.jpg";
import LanguageToggle from "./LanguageToggle";

export default function Hero() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const floatingProfiles = [
    { img: athleteSoccer, name: "Carlos M.", fans: t("hero.profiles.carlosFans"), className: "top-[15%] left-[8%] float-1" },
    { img: athleteBasketball, name: "Jay W.", fans: t("hero.profiles.jayFans"), className: "top-[10%] right-[10%] float-2" },
    { img: athleteNfl, name: "Marcus T.", fans: t("hero.profiles.marcusFans"), className: "bottom-[25%] left-[5%] float-3 hidden md:block" },
    { img: athleteUfc, name: "Viktor K.", fans: t("hero.profiles.viktorFans"), className: "bottom-[20%] right-[8%] float-4" },
    { img: fansCheering, name: t("hero.profiles.fanClubName"), fans: t("hero.profiles.fanClubFans"), className: "top-[45%] left-[15%] float-5 hidden lg:block" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      try {
        await addWaitlistEntry(email.trim(), "fan");
        setSubmitted(true);
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#1a1a2e", "#FFFFFF", "#FF6B4A", "#4B0082"],
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.65 },
            colors: ["#FFD700", "#1a1a2e", "#FFFFFF"],
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.65 },
            colors: ["#FFD700", "#1a1a2e", "#FFFFFF"],
          });
        }, 300);
      } catch (err) {
        console.error("Waitlist error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(50 100% 60%) 0%, hsl(45 100% 65%) 30%, hsl(50 100% 55%) 60%, hsl(48 90% 58%) 100%)`,
        backgroundSize: "400% 400%",
        animation: "hero-gradient 8s ease infinite"
      }}>

      {/* Language toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        <LanguageToggle />
      </div>

      {/* Floating athlete profiles */}
      {floatingProfiles.map((p, i) =>
      <div
        key={i}
        className={`absolute z-10 hidden sm:block ${p.className}`}>

          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-foreground/10 shadow-xl">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-display font-bold bg-foreground/80 text-brand-yellow px-2 py-0.5 rounded-full">
              {p.fans}
            </span>
          </div>
        </div>
      )}

      {/* Floating sport icons */}
      {/* Rugby ball */}
      <svg className="absolute top-20 right-[20%] w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 text-foreground/10 float-2 rotate-[30deg] hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="6" fill="currentColor" opacity="0.15" />
        <ellipse cx="12" cy="12" rx="10" ry="6" />
      </svg>
      {/* Basketball */}
      <svg className="absolute bottom-32 left-[20%] w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-foreground/10 float-4 hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1" />
        <circle cx="12" cy="12" r="10" />
      </svg>
      {/* Baseball */}
      <svg className="absolute top-[60%] right-[15%] w-10 h-10 md:w-14 md:h-14 text-foreground/10 float-3 hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1" />
        <circle cx="12" cy="12" r="10" />
      </svg>
      {/* Pennant flag — long triangle */}
      <svg className="absolute top-[40%] right-[30%] w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-foreground/10 float-1 -rotate-12 hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 2L22 9L4 16Z" fill="currentColor" opacity="0.15" />
        <path d="M4 2L22 9L4 16Z" />
        <line x1="4" y1="2" x2="4" y2="22" />
      </svg>
      {/* Hockey stick */}
      <svg className="absolute top-[30%] left-[3%] w-12 h-12 md:w-16 md:h-16 text-foreground/10 float-5 hidden lg:block -rotate-[20deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2L4 16Q4 20 8 20L12 20" />
        <circle cx="18" cy="10" r="2.5" fill="currentColor" opacity="0.15" strokeWidth="1.5" />
      </svg>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>

          <span className="inline-block font-display text-sm md:text-base font-bold tracking-widest uppercase mb-6 bg-foreground/10 px-4 py-2 rounded-full">{t("hero.badge")}

          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 text-foreground/80 font-body">
            {t("hero.subtitle")}<br />
            {t("hero.subtitleLine2")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">

          {!submitted ?
          <>
              <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("hero.emailPlaceholder")}
              required
              className="flex-1 px-5 py-4 rounded-xl bg-foreground/10 border-2 border-foreground/20 text-foreground placeholder:text-foreground/40 font-body text-base focus:outline-none focus:border-foreground/40 transition-colors" />

              <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-xl bg-brand-dark font-display font-bold text-brand-white text-base transition-all hover:scale-105 hover:shadow-2xl active:scale-95 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">

                {loading ? (
                  <svg className="animate-spin h-5 w-5 mx-auto text-brand-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>{t("hero.cta")} 🚀</>
                )}
              </button>
            </> :

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full px-6 py-5 rounded-xl bg-foreground/10 border-2 border-foreground/20 text-center">

              <span className="text-3xl block mb-2">🥐</span>
              <p className="font-display font-bold text-lg">{t("hero.successTitle")}</p>
              <p className="text-sm text-foreground/70 font-body">{t("hero.successSubtitle")}</p>
            </motion.div>
          }
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 font-body text-sm text-foreground/50"
        >
          {t("hero.clubQuestion")} <a href="mailto:partner@ultrafans.co" className="text-foreground/70 underline hover:text-foreground transition-colors">partner@ultrafans.co</a>
        </motion.p>
      </div>
    </section>);

}
