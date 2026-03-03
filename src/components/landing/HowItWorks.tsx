import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

const steps = [
  {
    icon: "⚡",
    title: "Back your team",
    desc: "Buy your club's fan credits and become a verified supporter. Every purchase goes directly to the team you love.",
  },
  {
    icon: "🔥",
    title: "Stake and earn",
    desc: "Stake your fan credits to start earning loyalty points every day. The longer you hold, the more points you stack.",
  },
  {
    icon: "🏆",
    title: "Bid on unforgettable moments",
    desc: "Spend your points in live auctions for real-world rewards: VIP match tickets, signed shirts, travel with the squad, and meet-the-player sessions.",
  },
];

export default function HowItWorks() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-brand-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold text-center mb-4 text-brand-dark"
        >
          How it works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brand-dark/60 font-body text-lg mb-16 max-w-xl mx-auto"
        >
          Three steps. Zero complexity. Maximum fandom.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className="relative text-center p-8 rounded-2xl bg-brand-yellow/10 border-2 border-brand-yellow/20 hover:border-brand-yellow/50 transition-colors group"
            >
              <div className="text-5xl mb-5">{step.icon}</div>
              <span className="absolute top-4 right-4 font-display text-7xl font-bold text-brand-dark/5 select-none">
                {i + 1}
              </span>
              <h3 className="font-display text-xl font-bold mb-3 text-brand-dark">{step.title}</h3>
              <p className="font-body text-brand-dark/70 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
