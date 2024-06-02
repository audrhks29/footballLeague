import React, { memo, useState } from "react";

import axios, { AxiosResponse } from "axios";

import { useParams } from "react-router-dom";

import { leagueSelectArray } from "../../../../assets/ArrayData";

import { useSuspenseQuery } from "@tanstack/react-query";

import ResultList from "./ResultList";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Result = memo(() => {
  const { teamId, slugId } = useParams();

  const [selectedYear, setSelectedYear] = useState(2023);
  const [matchDivision, setMatchDivision] = useState<string | undefined>(
    slugId
  );

  const fetchSeasonData = async (
    slugId: string | undefined,
    selectedYear: number
  ) => {
    const response = await axios.get(
      `https://site.web.api.espn.com/apis/v2/sports/soccer/${slugId}/standings?season=${selectedYear}`
    );
    return response.data.seasons;
  };

  const { data: seasonData } = useSuspenseQuery({
    queryKey: ["seasonData", slugId, selectedYear],
    queryFn: () => fetchSeasonData(slugId, selectedYear),
  });

  const fetchTeamResultData = async (
    teamId: string | undefined,
    slugId: string | undefined,
    selectedYear: number
  ) => {
    try {
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

  const { data: resultData } = useSuspenseQuery({
    queryKey: ["resultData", teamId, slugId, selectedYear],
    queryFn: () => fetchTeamResultData(teamId, slugId, selectedYear),
  });

  const changeYear = (selectedYear: number) => {
    setSelectedYear(selectedYear);
  };

  return (
    <div>
      <div className="flex items-center">
        <span className="font-bold mr-3">Season</span>

        <Select
          onValueChange={(value) => changeYear(Number(value))}
          value={selectedYear.toString()}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {seasonData &&
              seasonData.map((item: SeasonDataType, idx: number) => {
                return (
                  <SelectItem key={idx} value={item.year.toString()}>
                    {item.year}-{item.year + 1}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      </div>

      <Card className="mt-5">
        {resultData && resultData.length === 0 && (
          <li>there is no data, please retry</li>
        )}

        {resultData &&
          resultData.map((item, index) => {
            const isCompletedMatch = item.status.type.completed;

            if (resultData && isCompletedMatch) {
              return (
                <React.Fragment key={index}>
                  <ResultList
                    item={item}
                    index={index}
                    matchDivision={matchDivision}
                    round={resultData.length - index}
                  />
                  <Separator />
                </React.Fragment>
              );
            }
          })}
      </Card>
    </div>
  );
});

export default Result;
