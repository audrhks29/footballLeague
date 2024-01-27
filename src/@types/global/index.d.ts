type NewsItemType = {
  byline: string;
  categories: unknown[];
  dataSourceIdentifier: string;
  description: string;
  headline: string;
  images: { url: string, art: string, caption: string }[];
  lastModified: string;
  links: {
    api: {
      news: {
        href: string
      }
      self: {
        href: string
      }
    }
  };
  premium: boolean;
  published: string;
  type: string;
}

interface boardType {
  title: string;
  byline: string;
  published: string;
  story: string;
}

interface TeamDataType {
  abbreviation: string;
  id: string;
  name: string;
  season: { year: number, displayName: string };
  shortName: string;
  slug: string;
  teams: {
    team: {
      id: string;
      name: string;
      color: string;
      alternateColor: string;
      logos: { href: string }[];
      displayName: string
    };
  }[];
  uid: string;
  year: number;
}

interface TeamInfoType {
  abbreviation: string;
  alternateColor: string;
  color: string;
  defaultLeague: {
    id: string;
    alternateId: string;
    logos: { href: string }[];
  }
  displayName: string;
  groups: { id: string };
  id: string;
  isActive: boolean;
  leagueAbbrev: string;
  links: unknown[]
  location: string;
  logos: { href: string }[];
  name: string;
  nextEvent: {
    date: string;
    competitions: {
      competitors: {
        id: string;
        type: string;
        homeAway: string;
        team: {
          abbreviation: string;
          logos: { href: string; }[]
        }
      }[]
    }[]
  }[]
  nickname: string;
  record: {
    items: {
      stats: {
        name: string;
        value: string;
      }[]
    }[]
  }
  shortDisplayName: string;
  slug: string;
  standingSummary: string;
  uid: string;
}

interface ResponseScoreboard {
  events: MatchResultType[]
}
// MatchResult ----
interface MatchResultType {
  competitions: {
    id: string;
    date: string;
    competitors: Competitors[];
  }[];
  date: string;
  id: string;
  name: string;
  season: { year: number, type: number, slug: string }
  shortName: string;
  status: { clock: number, displayClock: string, period: number, type: object }
  uid: string;
  venue: { displayName: string }
}

interface Competitors {
  form: string;
  homeAway: string;
  id: string;
  order: number;
  score: string;
  team: { id: string, uid: string, abbreviation: string, displayName: string, shortDisplayName: string, logo: string }
  type: string;
  uid: string;
  winner: boolean;
}
// PlayerData ----
interface PlayerDataType {
  displayName: string;
  jersey: string;
  age: number;
  height: number;
  weight: number;
  flag: {
    alt: string;
    href: string;
  }
  position: {
    abbreviation: string
    displayName: string
    id: string
    leaf: boolean
    name: string
  }
  statistics: {
    splits: {
      abbreviation: string;
      categories: Category[];
      id: string;
      name: string;
      type: string;
    }
  }
}

interface Category {
  abbreviation: string;
  displayName: string;
  name: string;
  shortDisplayName: string;
  stats: Stats[];
  summary: string;
}

interface Stats {
  name: string;
  value: number;
}

// seasonData
interface SeasonDataType {
  year: number;
  displayName: string;
}

// stanadingsData
interface StandingDataType {
  entries: Entries[]
}

interface Entries {
  stats: Stats[];
  note: {
    color: string;
    description: string;
  }
  team: {
    name: string;
    logos: { href: string; }[]
  }
}

interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup';
  weekday?: 'long' | 'short' | 'narrow';
  era?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';
}