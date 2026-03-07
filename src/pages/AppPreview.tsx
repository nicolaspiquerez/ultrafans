import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { toast } from "sonner";
import LanguageToggle from "@/components/landing/LanguageToggle";
import FooterSection from "@/components/landing/FooterSection";
import { sports, countries, clubs, type Club } from "@/data/clubs";
import { useFavoriteClubs } from "@/hooks/useFavoriteClubs";
import { submitTeamSuggestion } from "@/lib/firebase";

function ClubRow({ club }: { club: Club }) {
  const { t } = useTranslation();
  const { toggleFavorite, isFavorite } = useFavoriteClubs();
  const domain = new URL(club.website).hostname;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 rounded-xl border border-brand-dark/10 bg-white hover:border-brand-yellow/40 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
          alt={club.name}
          className="w-6 h-6 rounded flex-shrink-0"
        />
        <span className="font-display font-bold text-brand-dark truncate">
          {club.name}
        </span>
      </div>
      <button
        onClick={() => toggleFavorite(club.id)}
        className="flex-shrink-0 p-2 rounded-lg transition-all hover:scale-110 active:scale-95"
        title={isFavorite(club.id) ? t("app.starred") : t("app.unstarred")}
      >
        <Star
          className={`w-5 h-5 transition-colors ${
            isFavorite(club.id)
              ? "fill-yellow-400 text-yellow-400"
              : "text-brand-dark/20 hover:text-yellow-400/60"
          }`}
        />
      </button>
    </motion.div>
  );
}

function EmptyState() {
  const { t } = useTranslation();
  return (
    <div className="text-center py-12 px-6 rounded-2xl border border-dashed border-brand-dark/10 bg-brand-dark/[0.02]">
      <p className="font-display text-lg font-bold text-brand-dark/40 mb-2">
        {t("app.comingSoon")}
      </p>
      <p className="font-body text-sm text-brand-dark/30">
        {t("app.noClubsYet")}
      </p>
    </div>
  );
}

function SuggestTeamSection() {
  const { t } = useTranslation();
  const [teamName, setTeamName] = useState("");
  const [country, setCountry] = useState("");
  const [sport, setSport] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    setLoading(true);
    try {
      await submitTeamSuggestion(teamName.trim(), country.trim() || undefined, sport.trim() || undefined);
      toast.success(t("app.suggestSuccess"));
      setTeamName("");
      setCountry("");
      setSport("");
    } catch {
      toast.error(t("app.suggestError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border border-brand-dark/10 bg-brand-dark/[0.02] p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold text-brand-dark mb-2">
            {t("app.suggestTitle")}
          </h3>
          <p className="font-body text-brand-dark/60 text-sm mb-6">
            {t("app.suggestSubtitle")}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-display text-sm font-bold text-brand-dark/70 block mb-1.5">
                {t("app.suggestTeamName")} *
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder={t("app.suggestTeamNamePlaceholder")}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-brand-dark/10 bg-white font-body text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-yellow/50 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-display text-sm font-bold text-brand-dark/70 block mb-1.5">
                  {t("app.suggestCountry")}
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={t("app.suggestCountryPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border-2 border-brand-dark/10 bg-white font-body text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-yellow/50 transition-colors"
                />
              </div>
              <div>
                <label className="font-display text-sm font-bold text-brand-dark/70 block mb-1.5">
                  {t("app.suggestSport")}
                </label>
                <input
                  type="text"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  placeholder={t("app.suggestSportPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border-2 border-brand-dark/10 bg-white font-body text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-yellow/50 transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-brand-dark text-brand-white font-display font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mx-auto text-brand-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                t("app.suggestSubmit")
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function AppPreview() {
  const { t } = useTranslation();
  const [activeSport, setActiveSport] = useState(sports[0].id);
  const [activeCountry, setActiveCountry] = useState(countries[0].code);

  const sportClubs = clubs.filter((c) => c.sportId === activeSport).sort((a, b) => a.name.localeCompare(b.name));
  const filteredClubs = activeCountry === "all" ? sportClubs : sportClubs.filter((c) => c.countryCode === activeCountry);
  const hasClubsForSport = sportClubs.length > 0;

  return (
    <main className="min-h-screen bg-brand-white">
      {/* Header */}
      <header className="bg-brand-yellow py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold text-brand-dark hover:opacity-80 transition-opacity">
            UltraFans
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-bold text-brand-dark/70 uppercase tracking-widest">
              {t("app.pageLabel")}
            </span>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Sport tabs — full-width menu under header */}
      <nav className="bg-brand-dark/[0.03] border-b border-brand-dark/10">
        <div className="flex overflow-x-auto">
          {sports.map((sport) => (
            <button
              key={sport.id}
              onClick={() => setActiveSport(sport.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-3.5 font-display text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                activeSport === sport.id
                  ? "border-brand-yellow bg-brand-dark text-brand-yellow"
                  : "border-transparent text-brand-dark/35 hover:text-brand-dark/60 hover:bg-brand-dark/[0.04]"
              }`}
            >
              <span>{sport.emoji}</span>
              <span className="hidden sm:inline">{t(sport.i18nKey)}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Subtitle only: removed page title per design request */}
      <section className="pt-8 sm:pt-10 pb-2 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-brand-dark/60 text-lg md:text-xl max-w-full"
          >
            {t("app.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Country tabs + club list */}
      <section className="pt-6 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {!hasClubsForSport ? (
            <EmptyState />
          ) : (
            <>
              {/* Country tabs */}
              <div className="w-full flex overflow-x-auto gap-1 bg-brand-dark/5 rounded-xl p-1.5 mb-8">
                {countries.map((country) => {
                  const countryHasClubs = sportClubs.some((c) => c.countryCode === country.code);
                  return (
                    <button
                      key={country.code}
                      onClick={() => setActiveCountry(country.code)}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg font-display text-sm font-bold transition-all ${
                        activeCountry === country.code
                          ? "bg-brand-dark text-brand-yellow shadow-md"
                          : countryHasClubs
                            ? "text-brand-dark/40 hover:text-brand-dark/60"
                            : "text-brand-dark/20 hover:text-brand-dark/30"
                      }`}
                    >
                      <span>{country.flag}</span>
                      <span className="hidden sm:inline">{t(country.i18nKey)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Club list — one per line */}
              {filteredClubs.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="space-y-3">
                  {filteredClubs.map((club) => (
                    <ClubRow key={club.id} club={club} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Suggest a team */}
      <SuggestTeamSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
