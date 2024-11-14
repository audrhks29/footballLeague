import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

interface Season {
  $ref: string;
}

interface SeasonData {
  season: {
    $ref: string;
  };
}

const BASE_URL = "http://sports.core.api.espn.com/v2/sports/soccer";

export const usePlayerSeasons = (playerId: string | undefined) => {
  return useSuspenseQuery({
    queryKey: ["playerSeasons", playerId],
    queryFn: async () => {
      const url = `${BASE_URL}/leagues/all/athletes/${playerId}/seasons?lang=en&region=us&limit=200`;
      const response = await axios.get(url);
      return response.data.items;
    },
  });
};

export const useSeasonStats = (
  playerId: string | undefined,
  seasons: Season[] | undefined
) => {
  return useSuspenseQuery({
    queryKey: ["seasonStats", playerId],
    queryFn: async () => {
      if (!seasons) return [];

      const promises = seasons.map((obj) => {
        const url = obj.$ref.replace(
          "?lang=en&region=us",
          `/types/1/athletes/${playerId}/statistics?lang=en&region=us`
        );
        return axios.get(url);
      });

      const results = await Promise.allSettled(promises);
      return results;
    },
    select: (data) =>
      data?.filter((item) => item.value).map((item) => item.value.data),
  });
};

export const useSeasonNames = (
  playerId: string | undefined,
  seasonStats: SeasonData[] | undefined
) => {
  return useSuspenseQuery({
    queryKey: ["seasonNames", playerId],
    queryFn: async () => {
      if (!seasonStats) return [];

      const promises = seasonStats?.map((obj) => {
        const url = obj.season.$ref;
        return axios.get(url);
      });
      const resolvedResponses = await Promise.allSettled(promises);
      return resolvedResponses;
    },
    select: (data) =>
      data
        ?.filter((item) => item.value)
        .map((item) => item.value.data.displayName),
  });
};
