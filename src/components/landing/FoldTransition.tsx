import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FoldTransition() {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();

  return (
    <section
      ref={ref}
      className="py-32 md:py-40 px-6 text-center dark-gradient dark-section">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto">

        <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white mb-4">{t("fold.title")}
        </p>
        <p className="font-body text-brand-white/60 text-lg">
          {t("fold.subtitleText")}{" "}
          <a href="mailto:team@ultrafans.co" className="text-brand-yellow hover:underline">
            team@ultrafans.co
          </a>
        </p>
      </motion.div>
    </section>);

}
