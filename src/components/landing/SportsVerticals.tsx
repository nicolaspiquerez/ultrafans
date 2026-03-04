import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import athleteSoccer from "@/assets/athlete-soccer.jpg";
import athleteBasketball from "@/assets/athlete-basketball.jpg";
import athleteNfl from "@/assets/athlete-nfl.jpg";
import athleteRugby from "@/assets/athlete-rugby.jpg";
import athleteHockey from "@/assets/athlete-hockey.jpg";
import athleteBaseball from "@/assets/athlete-baseball.jpg";

const sports = [
  { img: athleteSoccer, sport: "Football", tagline: "From local matches to cup finals.", emoji: "⚽" },
  { img: athleteBasketball, sport: "Basketball", tagline: "Courtside without the price tag.", emoji: "🏀" },
  { img: athleteNfl, sport: "American Football", tagline: "Tailgate culture, digitized.", emoji: "🏈" },
  { img: athleteRugby, sport: "Rugby", tagline: "Scrum down and show up.", emoji: "🏉" },
  { img: athleteHockey, sport: "Hockey", tagline: "From the rink to the roster.", emoji: "🏒" },
  { img: athleteBaseball, sport: "Baseball", tagline: "Every pitch, every fan.", emoji: "⚾" },
];

export default function SportsVerticals() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-brand-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4 text-brand-dark"
        >
          Your favorite sport teams
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-brand-dark/60 font-body text-base sm:text-lg mb-10 sm:mb-16 max-w-xl mx-auto"
        >
          Earn real experiences with more sports and more rewards.
        </motion.p>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 snap-x snap-mandatory">
          {sports.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="relative min-w-[220px] sm:min-w-[280px] md:min-w-0 aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer snap-center"
            >
              <img
                src={s.img}
                alt={s.sport}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <span className="text-2xl sm:text-3xl mb-2 block">{s.emoji}</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-white mb-1">{s.sport}</h3>
                <p className="font-body text-sm text-brand-white/70">{s.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
