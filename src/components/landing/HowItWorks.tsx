import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();

  const steps = [
    {
      icon: "💛",
      title: t("howItWorks.step1Title"),
      desc: t("howItWorks.step1Desc"),
    },
    {
      icon: "⭐",
      title: t("howItWorks.step2Title"),
      desc: t("howItWorks.step2Desc"),
    },
    {
      icon: "🏆",
      title: t("howItWorks.step3Title"),
      desc: t("howItWorks.step3Desc"),
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-brand-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4 text-brand-dark"
        >
          {t("howItWorks.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brand-dark/60 font-body text-base sm:text-lg mb-10 sm:mb-16 max-w-xl mx-auto"
        >
          {t("howItWorks.subtitle")}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className="relative text-center p-5 sm:p-8 rounded-2xl bg-brand-yellow/10 border-2 border-brand-yellow/20 hover:border-brand-yellow/50 transition-colors group"
            >
              <div className="text-3xl sm:text-5xl mb-4 sm:mb-5">{step.icon}</div>
              <h3 className="font-display text-xl font-bold mb-3 text-brand-dark">{step.title}</h3>
              <p className="font-body text-brand-dark/70 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
