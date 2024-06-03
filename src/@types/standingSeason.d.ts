interface StandingSeasonDataTypes {
  abbreviation: string;
  children: {
    abbreviation: string;
    id: string;
    name: string;
    standings: StandingsDataTypes;
    uid: string;
  }[];
  id: string;
  name: string;
  seasons: {
    year: number;
    startDate: string;
    endDate: string;
    displayName: string;
    types: {
      abbreviation: string;
      endDate: string;
      hasStandings: boolean;
      id: string;
      name: string;
      startDate: string;
    }[];
  }[];
}

interface StandingsDataTypes {
  id: string;
  name: string;
  displayName: string;
  links: {
    href: string;
    isExternal: boolean;
    isPremium: boolean;
    language: string;
    shortText: string;
    text: string;
    rel: string[];
  };
  season: number;
  seasonDisplayName: string;
  seasonType: number;
  entries: EntriesDataTypes[];
}

interface EntriesDataTypes {
  note?: {
    color: string;
    description: string;
    rank: number;
  };
  stats: StatsDataTypes[];
  team: {
    abbreviation: string;
    displayName: string;
    id: string;
    isActive: boolean;
    isNational: boolean;
    links: {
      href: string;
      isExternal: boolean;
      isPremium: boolean;
      language: string;
      rel: string[];
      shortText: string;
      text: string;
    }[];
    location: string;
    logos: {
      alt: string;
      height: number;
      href: string;
      lastUpdated: string;
      rel: string[];
      width: number;
    }[];
    name: string;
    shortDisplayName: string;
    uid: string;
  };
}

interface StatsDataTypes {
  abbreviation: string;
  description: string;
  displayName: string;
  displayValue: string;
  name: string;
  shortDisplayName: string;
  type: string;
  value: number;
}
