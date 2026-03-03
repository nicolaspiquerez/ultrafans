import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

const valueProps = [
  {
    icon: "🚀",
    title: "Your own fan credit, live in a day",
    desc: "Issue your team's fan credit with one click. Set supply, manage distribution — we handle all the infrastructure. No technical team required.",
  },
  {
    icon: "📊",
    title: "Full fan visibility",
    desc: "See every fan's email and credit balance in one dashboard. Know who your most committed supporters actually are, not just your biggest social media accounts.",
  },
  {
    icon: "🎟️",
    title: "Run experiences, not just content",
    desc: "Create auction experiences directly from your admin panel — add a date, location, and number of seats. New revenue stream with zero ad spend.",
  },
];

export default function PartnerSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 dark-gradient dark-section">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold text-center mb-4 text-brand-white"
        >
          Fan engagement infrastructure
          <br />
          <span className="text-brand-yellow">for sports.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brand-white/50 font-body text-lg mb-16 max-w-xl mx-auto"
        >
          Everything you need to monetize your fanbase and create unforgettable experiences.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {valueProps.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className="p-8 rounded-2xl bg-brand-white/5 border border-brand-white/10 hover:border-brand-yellow/30 transition-colors"
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-display text-xl font-bold mb-3 text-brand-white">{v.title}</h3>
              <p className="font-body text-brand-white/60 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Partner logos placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="font-body text-sm text-brand-white/30 mb-6 uppercase tracking-widest">
            Trusted by clubs across 4 continents
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-10 rounded-lg bg-brand-white/5 border border-brand-white/10"
              />
            ))}
          </div>

          <a
            href="#footer"
            className="inline-block mt-12 px-8 py-4 rounded-xl bg-brand-yellow text-brand-dark font-display font-bold text-base transition-all hover:scale-105 hover:glow-yellow"
          >
            Partner With Us →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
