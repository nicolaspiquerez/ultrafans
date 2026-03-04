import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

const features = [
  {
    tag: "Fan Credits",
    title: "Your team. Your stake.",
    desc: "Buy your club's fan credits with a card in seconds — no complexity. Hold more credits, earn more points daily. Your balance is your rank in the fan hierarchy.",
    mockUI: (
      <div className="bg-brand-dark rounded-xl p-5 text-brand-white font-body space-y-3 w-full max-w-[260px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-dark font-bold text-lg">⚽</div>
          <div>
            <p className="font-display font-bold text-sm">FC United</p>
            <p className="text-xs text-brand-white/50">Fan Credit</p>
          </div>
        </div>
        <div className="border-t border-brand-white/10 pt-3">
          <p className="text-xs text-brand-white/50">Your Balance</p>
          <p className="font-display text-3xl font-bold text-brand-yellow">2,450</p>
        </div>
        <div className="bg-brand-white/10 rounded-lg px-3 py-2 text-xs">
          <span className="text-brand-yellow">+12.5</span> points/day
        </div>
      </div>
    ),
  },
  {
    tag: "Points & Staking",
    title: "Hold to earn. Earn to win.",
    desc: "Stake your fan credits to generate loyalty points automatically. Points don't expire — they stack up waiting for the next auction. The more committed, the bigger your war chest.",
    mockUI: (
      <div className="bg-brand-dark rounded-xl p-5 text-brand-white font-body space-y-3 w-full max-w-[260px] mx-auto">
        <p className="text-xs text-brand-white/50">Total Points</p>
        <p className="font-display text-3xl font-bold text-brand-yellow">18,720</p>
        <div className="flex gap-1 h-20 items-end">
          {[30, 45, 38, 55, 62, 58, 72, 80, 75, 90, 95, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-brand-yellow/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="text-xs text-brand-white/50 text-center">Points earned (12 weeks)</p>
      </div>
    ),
  },
  {
    tag: "Rewards Auction",
    title: "One winner. Real rewards.",
    desc: "Bid your points in live auctions for experiences money can't normally buy: VIP match tickets, signed shirts, travel with the squad, or a private meet-and-greet.",
    mockUI: (
      <div className="bg-brand-dark rounded-xl p-5 text-brand-white font-body space-y-3 w-full max-w-[260px] mx-auto">
        <div className="relative h-24 rounded-lg overflow-hidden bg-brand-indigo/30 flex items-center justify-center">
          <span className="text-4xl">🎽</span>
          <div className="absolute top-2 right-2 bg-brand-coral text-brand-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </div>
        </div>
        <p className="font-display font-bold text-sm">Signed Match Shirt</p>
        <div className="flex justify-between text-xs">
          <div>
            <p className="text-brand-white/50">Top bid</p>
            <p className="font-bold text-brand-yellow">4,200 pts</p>
          </div>
          <div className="text-right">
            <p className="text-brand-white/50">Ends in</p>
            <p className="font-bold font-display">02:14:30</p>
          </div>
        </div>
        <div className="bg-brand-yellow text-brand-dark text-center py-2 rounded-lg font-display font-bold text-sm cursor-pointer hover:brightness-110 transition">
          Place Bid
        </div>
      </div>
    ),
  },
];

export default function FeatureShowcase() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 brand-gradient">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-10 sm:mb-16 text-brand-dark"
        >
          Built for ultra fans
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className="card-tilt bg-brand-white rounded-2xl p-4 pb-6 sm:p-6 sm:pb-8 border border-brand-dark/5"
            >
              <span className="inline-block font-display text-xs font-bold tracking-wider uppercase bg-brand-yellow px-3 py-1 rounded-full text-brand-dark mb-4">
                {f.tag}
              </span>
              <h3 className="font-display text-xl font-bold mb-2 text-brand-dark">{f.title}</h3>
              <p className="font-body text-sm text-brand-dark/60 mb-6 leading-relaxed">{f.desc}</p>
              {f.mockUI}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
