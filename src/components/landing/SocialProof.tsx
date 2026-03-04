import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";

export default function SocialProof() {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();
  const { count } = useWaitlistCounter();

  const testimonials = [
    {
      quote: t("socialProof.testimonial1Quote"),
      name: t("socialProof.testimonial1Name"),
      sport: t("socialProof.testimonial1Sport"),
    },
    {
      quote: t("socialProof.testimonial2Quote"),
      name: t("socialProof.testimonial2Name"),
      sport: t("socialProof.testimonial2Sport"),
    },
    {
      quote: t("socialProof.testimonial3Quote"),
      name: t("socialProof.testimonial3Name"),
      sport: t("socialProof.testimonial3Sport"),
    },
  ];

  const marqueeItems = [
    t("socialProof.marquee.football"),
    t("socialProof.marquee.basketball"),
    t("socialProof.marquee.rugby"),
    t("socialProof.marquee.hockey"),
    t("socialProof.marquee.baseball"),
    t("socialProof.marquee.americanFootball"),
  ];


  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 overflow-hidden brand-gradient">
      <div className="max-w-5xl mx-auto px-6">
        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-brand-dark/60 text-sm uppercase tracking-widest mb-2">{t("socialProof.waitlistLabel")}</p>
          <p className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-brand-dark">
            {count.toLocaleString()}
          </p>
          <p className="font-body text-brand-dark/50 text-sm mt-2">{t("socialProof.andCounting")}</p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="bg-brand-white rounded-2xl p-4 sm:p-6 border border-brand-dark/5"
            >
              <p className="font-body text-brand-dark/80 mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="font-display font-bold text-sm text-brand-dark">{testimonial.name}</p>
                <p className="font-body text-xs text-brand-dark/50">{testimonial.sport}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative py-4 overflow-hidden">
        <div className="marquee flex whitespace-nowrap gap-4 sm:gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-brand-dark/15">
              {item} •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
