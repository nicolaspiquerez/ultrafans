import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function PartnerSection() {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();

  const valueProps = [
    {
      icon: "🚀",
      title: t("partner.prop1Title"),
      desc: t("partner.prop1Desc"),
    },
    {
      icon: "📊",
      title: t("partner.prop2Title"),
      desc: t("partner.prop2Desc"),
    },
    {
      icon: "🎟️",
      title: t("partner.prop3Title"),
      desc: t("partner.prop3Desc"),
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 dark-gradient dark-section">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4 text-brand-white"
        >
          {t("partner.titleLine1")}
          <br />
          <span className="text-brand-yellow">{t("partner.titleLine2")}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brand-white/50 font-body text-base sm:text-lg mb-10 sm:mb-16 max-w-xl mx-auto"
        >
          {t("partner.subtitle")}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-20">
          {valueProps.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className="p-5 sm:p-8 rounded-2xl bg-brand-white/5 border border-brand-white/10 hover:border-brand-yellow/30 transition-colors"
            >
              <div className="text-3xl sm:text-4xl mb-4">{v.icon}</div>
              <h3 className="font-display text-xl font-bold mb-3 text-brand-white">{v.title}</h3>
              <p className="font-body text-brand-white/60 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="font-body text-brand-white/50 text-base sm:text-lg mb-4">
            {t("partner.getInTouch")}
          </p>
          <a
            href="mailto:partner@ultrafans.com"
            className="inline-block px-8 py-4 rounded-xl bg-brand-yellow text-brand-dark font-display font-bold text-base transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            partner@ultrafans.com
          </a>
        </motion.div>

      </div>
    </section>
  );
}
