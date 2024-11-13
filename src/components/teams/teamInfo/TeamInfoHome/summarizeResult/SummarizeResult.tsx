import { memo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import axios, { AxiosResponse } from "axios";

import { leagueSelectArray } from "../../../../../assets/ArrayData";

import ResultList from "./ResultList";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { fetchTeamData } from "@/services/fetchData";

import getCurrentYear from "@/utils/getCurrentDate";

const SummarizeResult = memo(() => {
  const { slugId, teamId } = useParams();
  const currentYear = getCurrentYear();

  const { data: teamData } = useSuspenseQuery({
    queryKey: ["teamData", slugId, teamId],
    queryFn: () => fetchTeamData(slugId, teamId),
  });

  const [matchDivision, setMatchDivision] = useState<string | undefined>(
    slugId
  );

  const fetchRecentMatchResultData = async (
    teamId: string | undefined,
    slugId: string | undefined
  ) => {
    try {
      const selectedYear = Number(currentYear);
      const nextYear = selectedYear + 1;
      const findDivision = leagueSelectArray.find((item) =>
        slugId?.includes(item.value)
      );
      const divisionArray: string[] = findDivision
        ? findDivision.league.map(
            (item) => `${findDivision.value}.` + item.division
          )
        : [];

      for (const id of divisionArray) {
        const currentYearScoreboard: AxiosResponse<ResponseScoreboard> =
          await axios.get(
            `http://site.api.espn.com/apis/site/v2/sports/soccer/${id}/scoreboard?dates=${selectedYear}&limit=500`
          );
        const nextYearScoreboard: AxiosResponse<ResponseScoreboard> =
          await axios.get(
            `http://site.api.espn.com/apis/site/v2/sports/soccer/${id}/scoreboard?dates=${nextYear}&limit=500`
          );

        if (
          currentYearScoreboard.data.events &&
          nextYearScoreboard.data.events
        ) {
          const filterCurrentYearMatchedTeam =
            currentYearScoreboard.data.events.filter((item) =>
              item.competitions[0].competitors.some(
                (competitor) => competitor.id === teamId
              )
            );

          const filterNextYearMatchedTeam =
            nextYearScoreboard.data.events.filter((item) =>
              item.competitions[0].competitors.some(
                (competitor) => competitor.id === teamId
              )
            );

          const filterMatchCurrentYear = filterCurrentYearMatchedTeam.filter(
            (item) => item.season.year === selectedYear
          );
          const filterMatchNextYear = filterNextYearMatchedTeam.filter(
            (item) => item.season.year === selectedYear
          );

          if (
            filterMatchCurrentYear.length > 0 &&
            filterMatchNextYear.length > 0
          ) {
            setMatchDivision(currentYearScoreboard.data.leagues[0].slug);
            const data = filterMatchCurrentYear
              .concat(filterMatchNextYear)
              .sort((a, b) => parseInt(b.id) - parseInt(a.id));
            return data;
          }
        }
      }
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const { data: recentMatchResult } = useSuspenseQuery({
    queryKey: ["recentMatchResult", teamId, slugId],
    queryFn: () => fetchRecentMatchResultData(teamId, slugId),
  });

  const isCompletedMatch =
    recentMatchResult &&
    recentMatchResult.filter((item) => item.status.type.completed === true);
  const displayedMatches =
    recentMatchResult && isCompletedMatch ? isCompletedMatch.slice(0, 5) : [];

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Recent Match Result</CardTitle>
      </CardHeader>

      {displayedMatches && (
        <div className="flex w-full">
          {displayedMatches.map((item, index) => {
            return (
              <ResultList
                key={index}
                item={item}
                index={index}
                matchDivision={matchDivision}
                teamData={teamData}
              />
            );
          })}
        </div>
      )}
    </Card>
  );
});

export default SummarizeResult;
