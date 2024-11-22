interface MatchResultDataTypes {
  header: {
    competitions: {
      date: string;
      competitors: { score: string }[];
    }[];
    season: {
      name: string;
    };
    league: {
      slug: string;
    };
  };
  gameInfo: {
    venue: {
      fullName: string;
      address: {
        city: string;
      };
    };
    attendance: string;
  };
  boxscore: {
    teams: {
      team: {
        id: string;
        displayName: string;
        logo: string;
        shortDisplayName: string;
      };
    }[];
  };
  rosters: RosterDataTypes[];
}
