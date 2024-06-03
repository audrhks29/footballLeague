interface ScoreboardDataTypes {
  day: { date: string };
  events: EventDataTypes[];
}

interface EventDataTypes {
  id: string;
  competitions: {
    attendance: number;
    competitors: {
      score: string;
      homeAway: string;
      team: {
        logo: string;
        abbreviation: string;
      };
    }[];
  }[];
}
