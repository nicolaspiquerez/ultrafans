export type SportId = "football" | "basketball" | "americanFootball" | "rugby" | "hockey" | "baseball";

export interface Club {
  id: string;
  name: string;
  website: string;
  countryCode: string;
  sportId: SportId;
}

export interface Country {
  code: string;
  flag: string;
  i18nKey: string;
}

export interface Sport {
  id: SportId;
  emoji: string;
  i18nKey: string;
}

export const sports: Sport[] = [
  { id: "football", emoji: "⚽", i18nKey: "app.sports.football" },
  { id: "basketball", emoji: "🏀", i18nKey: "app.sports.basketball" },
  { id: "americanFootball", emoji: "🏈", i18nKey: "app.sports.americanFootball" },
  { id: "rugby", emoji: "🏉", i18nKey: "app.sports.rugby" },
  { id: "hockey", emoji: "🏒", i18nKey: "app.sports.hockey" },
  { id: "baseball", emoji: "⚾", i18nKey: "app.sports.baseball" },
];

export const countries: Country[] = [
  { code: "all", flag: "🌍", i18nKey: "app.countries.all" },
  { code: "uk", flag: "🇬🇧", i18nKey: "app.countries.uk" },
  { code: "france", flag: "🇫🇷", i18nKey: "app.countries.france" },
  { code: "spain", flag: "🇪🇸", i18nKey: "app.countries.spain" },
  { code: "belgium", flag: "🇧🇪", i18nKey: "app.countries.belgium" },
  { code: "switzerland", flag: "🇨🇭", i18nKey: "app.countries.switzerland" },
];

export const clubs: Club[] = [
  // UK - Football
  { id: "norwich-city", name: "Norwich City", website: "https://www.canaries.co.uk", countryCode: "uk", sportId: "football" },
  { id: "preston-north-end", name: "Preston North End", website: "https://www.pne.com", countryCode: "uk", sportId: "football" },
  { id: "blackburn-rovers", name: "Blackburn Rovers", website: "https://www.rovers.co.uk", countryCode: "uk", sportId: "football" },
  { id: "manchester-united", name: "Manchester United", website: "https://www.manutd.com", countryCode: "uk", sportId: "football" },
  { id: "ipswich-town", name: "Ipswich Town", website: "https://www.itfc.co.uk", countryCode: "uk", sportId: "football" },

  // France - Football
  { id: "paris-fc", name: "Paris FC", website: "https://parisfc.fr", countryCode: "france", sportId: "football" },
  // France - Rugby
  { id: "racing-92", name: "Racing 92", website: "https://www.racing92.fr", countryCode: "france", sportId: "rugby" },
  // France - Basketball
  { id: "paris-basketball", name: "Paris Basketball", website: "https://parisbasketball.com", countryCode: "france", sportId: "basketball" },
  { id: "nanterre-92", name: "Nanterre 92", website: "https://www.nanterre92.com", countryCode: "france", sportId: "basketball" },
  { id: "olympique-lyonnais", name: "Olympique Lyonnais", website: "https://www.ol.fr", countryCode: "france", sportId: "football" },
  { id: "olympique-marseille", name: "Olympique de Marseille", website: "https://www.om.fr", countryCode: "france", sportId: "football" },

  // Spain - Football
  { id: "real-madrid", name: "Real Madrid", website: "https://www.realmadrid.com", countryCode: "spain", sportId: "football" },
  { id: "atletico-madrid", name: "Atlético Madrid", website: "https://www.atleticodemadrid.com", countryCode: "spain", sportId: "football" },
];
