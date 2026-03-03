import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "I staked credits on my club and won a signed shirt from a live auction. Wildest Tuesday ever.",
    name: "Marco, Italy",
    sport: "Football fan",
  },
  {
    quote: "Courtside tickets through loyalty points? Not a single dollar spent beyond my fan credits. This is unreal.",
    name: "Jasmine, USA",
    sport: "Basketball fan",
  },
  {
    quote: "I've been supporting my team for years. Finally a platform that lets me prove it and get rewarded for it.",
    name: "Alex, France",
    sport: "Rugby fan",
  },
];

const marqueeItems = [
  "Football",
  "Basketball",
  "Rugby",
  "Hockey",
  "Baseball",
  "American Football",
];

export default function SocialProof() {
  const { ref, isInView } = useInView();
  const [count, setCount] = useState(23412);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden brand-gradient">
      <div className="max-w-5xl mx-auto px-6">
        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-brand-dark/60 text-sm uppercase tracking-widest mb-2">Fans on the waitlist</p>
          <p className="font-display text-6xl md:text-7xl font-bold text-brand-dark">
            {count.toLocaleString()}
          </p>
          <p className="font-body text-brand-dark/50 text-sm mt-2">and counting...</p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="bg-brand-white rounded-2xl p-6 border border-brand-dark/5"
            >
              <p className="font-body text-brand-dark/80 mb-4 leading-relaxed">"{t.quote}"</p>
              <div>
                <p className="font-display font-bold text-sm text-brand-dark">{t.name}</p>
                <p className="font-body text-xs text-brand-dark/50">{t.sport}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative py-4 overflow-hidden">
        <div className="marquee flex whitespace-nowrap gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-display text-2xl md:text-3xl font-bold text-brand-dark/15">
              {item} •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
