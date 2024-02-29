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
  teams: Teams
  uid: string;
  year: number;
}

interface Teams {
  team: {
    id: string;
    name: string;
    color: string;
    alternateColor: string;
    logos: { href: string }[];
    displayName: string
  };
}[]
interface TeamInfoType {
  abbreviation: string;
  alternateColor: string;
  color: string;
  defaultLeague: {
    id: string;
    alternateId: string;
    logos: { href: string }[];
    slug: string;
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
  events: ResultType[]
  leagues: {
    slug: string;
  }[]
}
// Result ----
interface ResultType {
  competitions: {
    id: string;
    date: string;
    competitors: Competitors[];
    venue: { fullName: string }
  }[];
  date: string;
  id: string;
  name: string;
  season: { year: number, type: number, slug: string }
  shortName: string;
  status: {
    clock: number,
    displayClock: string,
    period: number,
    type: {
      completed: boolean;
    }
  }
  uid: string;
  venue: {
    displayName: string;
  }
}

interface Competitors {
  form: string;
  homeAway: string;
  id: string;
  order: number;
  score: string;
  team: {
    id: string,
    uid: string,
    abbreviation: string,
    displayName: string,
    shortDisplayName: string,
    logo: string,
    color: string,
    alternateColor: string
  }
  type: string;
  uid: string;
  winner: boolean;
}
// PlayerData ----
interface PlayerDataType {
  id: string;
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
  statistics: Statistics
}

interface Statistics {
  splits: {
    abbreviation: string;
    categories: Category[];
    id: string;
    name: string;
    type: string;
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

// standingsData
interface StandingsDataType {
  entries: Entries[]
}

interface Entries {
  stats: Stats[];
  note?: {
    color: string;
    description: string;
  }
  team: {
    id: string;
    name: string;
    logos: { href: string; }[]
  }
}

interface SummarizeStatsType {
  stats: { name: string, value: string }[];
  team: { id: string };
}
// matchResult
interface MatchResultType {
  header: {
    league: {
      slug: string
    }
    competitions: {
      date: string;
      competitors: {
        score: string;
      }[]
    }[]
    season: { name: string }
  }
  boxscore: {
    teams: {
      displayOrder: number;
      statistics: {
        name: string;
        displayValue: string;
        label: string;
      }[]
      team: {
        color: string;
        alternateColor: string;
        logo: string;
        shortDisplayName: string;
        displayName: string;
        id: string;
      }
    }[]
  }
  gameInfo: {
    attendance: number;
    venue: {
      fullName: string;
      address: {
        city: string;
        country: string;
      }
    }
  }
  commentary: {
    play?: {
      team?: {
        displayName: string;
      }
    }
    text: string;
    time: {
      displayValue: string;
    }
  }[]
  rosters: Rosters[];
  keyEvents: {
    id: string;
    clock: { displayValue: string; }
    team?: { displayName: string; };
    type: { text: string }
    text?: string;
  }[]
}

interface Rosters {
  roster: {
    stats: {
      abbreviation: string;
      displayName: string;
      value: number;
    }[]
    position: {
      abbreviation: string;
    }
    jersey: string;
    athlete: {
      fullName: string;
    }
  }[]
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

interface playerTransactionsTypes {
  items: {
    from: { $ref: string }
    to: { $ref: string }
    displayAmount: string;
    date: string;
  }[]
}