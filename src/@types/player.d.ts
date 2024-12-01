interface PlayerDataTypes {
  timestamp: string;
  status: string;
  season: {
    year: number;
    displayName: string;
    type: number;
    name: string;
  };
  athletes: AthletesDataTypes[];
  coach: {
    id: string;
    firstName: string;
    lastName: string;
    experience: number;
  }[];
  team: {
    id: string;
    abbreviation: string;
    location: string;
    name: string;
    displayName: string;
    clubhouse: string;
    color: string;
    logo: string;
    recordSummary: string;
    seasonSummary: string;
    standingSummary: string;
    isNational: boolean;
  };
}

interface AthletesDataTypes {
  id: string;
  uid: string;
  guid: string;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName: string;
  shortName: string;
  weight: number;
  displayWeight: string;
  height: number;
  displayHeight: string;
  age: number;
  dateOfBirth: string;
  gender: string;
  links: Array<{
    language: string;
    rel: string[];
    href: string;
    text: string;
    shortText: string;
    isExternal: boolean;
    isPremium: boolean;
  }>;
  birthPlace: {
    country: string;
  };
  citizenship: string;
  citizenshipCountry: {
    alternateId: string;
    abbreviation: string;
  };
  birthCountry: {
    alternateId: string;
    abbreviation: string;
  };
  slug: string;
  jersey: string;
  flag: {
    href: string;
    alt: string;
    rel: string[];
  };
  position: {
    id: string;
    name: string;
    displayName: string;
    abbreviation: string;
    leaf: boolean;
  };
  injuries: unknown[];
  statistics: {
    splits: {
      id: string;
      name: string;
      abbreviation: string;
      type: string;
      categories: Array<{
        name: string;
        displayName: string;
        shortDisplayName: string;
        abbreviation: string;
        summary: string;
        stats: Array<{
          name: string;
          displayName: string;
          shortDisplayName: string;
          description: string;
          abbreviation: string;
          value: number;
          displayValue: string;
        }>;
      }>;
    };
    $ref: string;
  };
  status: {
    id: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  seasons: {
    $ref: string;
  };
  leagues: {
    $ref: string;
  };
  transactions: {
    $ref: string;
  };
  events: {
    $ref: string;
  };
  defaultLeague: {
    $ref: string;
  };
  profiled: boolean;
  defaultTeam: {
    $ref: string;
  };
}

interface SplitsDataTypes {
  name: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  summary: string;
  stats: Array<{
    name: string;
    displayName: string;
    shortDisplayName: string;
    description: string;
    abbreviation: string;
    value: number;
    displayValue: string;
  }>;
}
