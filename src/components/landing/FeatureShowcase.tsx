import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function FanCreditMock({ t }: { t: (key: string) => string }) {
  return (
    <div className="bg-brand-dark rounded-xl p-5 text-brand-white font-body space-y-3 w-full max-w-[260px] mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-dark font-bold text-lg">⚽</div>
        <div>
          <p className="font-display font-bold text-sm">{t("features.fan.mockTeam")}</p>
          <p className="text-xs text-brand-white/50">{t("features.fan.mockLabel")}</p>
        </div>
      </div>
      <div className="border-t border-brand-white/10 pt-3">
        <p className="text-xs text-brand-white/50">{t("features.fan.mockBalance")}</p>
        <p className="font-display text-3xl font-bold text-brand-yellow">2,450</p>
      </div>
      <div className="bg-brand-white/10 rounded-lg px-3 py-2 text-xs">
        <span className="text-brand-yellow">2,450</span> {t("features.fan.mockDailyPoints")}
      </div>
    </div>
  );
}

function StakingMock({ t }: { t: (key: string) => string }) {
  return (
    <div className="bg-brand-dark rounded-xl p-5 text-brand-white font-body space-y-3 w-full max-w-[260px] mx-auto">
      <p className="text-xs text-brand-white/50">{t("features.staking.mockTotalPoints")}</p>
      <p className="font-display text-3xl font-bold text-brand-yellow">18,720</p>
      <div className="flex gap-1 h-20 items-end">
        {[30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-brand-yellow/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="text-xs text-brand-white/50 text-center">{t("features.staking.mockChartLabel")}</p>
    </div>
  );
}

function AuctionMock({ t }: { t: (key: string) => string }) {
  return (
    <div className="bg-brand-dark rounded-xl p-5 text-brand-white font-body space-y-3 w-full max-w-[260px] mx-auto">
      <div className="relative h-24 rounded-lg overflow-hidden bg-brand-indigo/30 flex items-center justify-center">
        <span className="text-4xl">🎽</span>
        <div className="absolute top-2 right-2 bg-brand-coral text-brand-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
          {t("features.auction.mockLive")}
        </div>
      </div>
      <p className="font-display font-bold text-sm">{t("features.auction.mockItem")}</p>
      <div className="flex justify-between text-xs">
        <div>
          <p className="text-brand-white/50">{t("features.auction.mockTopBid")}</p>
          <p className="font-bold text-brand-yellow">{t("features.auction.mockTopBidValue")}</p>
        </div>
        <div className="text-right">
          <p className="text-brand-white/50">{t("features.auction.mockEndsIn")}</p>
          <p className="font-bold font-display">02:14:30</p>
        </div>
      </div>
      <div className="bg-brand-yellow text-brand-dark text-center py-2 rounded-lg font-display font-bold text-sm cursor-pointer hover:brightness-110 transition">
        {t("features.auction.mockPlaceBid")}
      </div>
    </div>
  );
}

export default function FeatureShowcase() {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();

  const features = [
    {
      tag: t("features.fan.tag"),
      title: t("features.fan.title"),
      desc: t("features.fan.desc"),
      mockUI: <FanCreditMock t={t} />,
    },
    {
      tag: t("features.staking.tag"),
      title: t("features.staking.title"),
      desc: t("features.staking.desc"),
      mockUI: <StakingMock t={t} />,
    },
    {
      tag: t("features.auction.tag"),
      title: t("features.auction.title"),
      desc: t("features.auction.desc"),
      mockUI: <AuctionMock t={t} />,
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 brand-gradient">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-10 sm:mb-16 text-brand-dark"
        >
          {t("features.title")}
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
