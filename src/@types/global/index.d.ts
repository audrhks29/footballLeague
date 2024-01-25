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
  nextEvent: []
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

interface MatchResultType {
  competitions: {
    id: string;
    date: string;
    competitors: {
      form: string;
      homeAway: string;
      id: string;
      order: number;
      records: [];
      score: string;
      statistics: [];
      team: { id: string, uid: string, abbreviation: string, displayName: string, shortDisplayName: string, logo: string }
      type: string;
      uid: string;
      winner: boolean;
    }[]
  }[];
  date: string;
  id: string;
  links: [];
  name: string;
  season: { year: number, type: number, slug: string }
  shortName: string;
  status: { clock: number, displayClock: string, period: number, type: object }
  uid: string;
  venue: { displayName: string }
}

interface PlayerDataType {
  statistics: {
    splits: {
      categories: {
        name: string;
        stats: {
          name: string;
          value: number
        }[]
      }[]
    }
  }
  position: {
    name: string;
  }
  displayName: string;
  jersey: string;
  age: number;
  height: number;
  weight: number;
  flag: {
    alt: string;
    href: string;
  }

}