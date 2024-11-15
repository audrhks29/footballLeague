import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";

import { fetchMatchResultData } from "@/services/fetchData";
import Roster from "@/components/matchResult/Roster";
import MatchResultTable from "@/components/matchResult/MatchResultTable";
import Commentary from "@/components/matchResult/Commentary";

const MatchResult = memo(() => {
  const { slugId, gameId } = useParams();

  const { data: matchResultData } = useSuspenseQuery({
    queryKey: ["matchResultData", slugId, gameId],
    queryFn: () => fetchMatchResultData(slugId, gameId),
  });

  const date = new Date(matchResultData.header.competitions[0].date);
  const options: DateTimeFormatOptions = {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const outputDateString = date.toLocaleDateString("en-US", options);

  return (
    <div className="inner">
      {/* 리그이름 */}
      {matchResultData && (
        <div>
          <h2 className="text-[26px] font-bold text-center py-4">
            {matchResultData.header.season.name}
          </h2>
        </div>
      )}

      {/* 스타디움, 일자, 관중 */}
      {matchResultData && (
        <div className="flex justify-between items-end">
          <h2 className=" text-[16px]">
            {matchResultData.gameInfo.venue.fullName},{" "}
            {matchResultData.gameInfo.venue.address.city}
          </h2>
          <div className="text-right">
            <h2>{outputDateString}</h2>
            <h2 className="">
              Attendance :{" "}
              {matchResultData.gameInfo.attendance.toLocaleString()}
            </h2>
          </div>
        </div>
      )}

      {matchResultData && (
        <Card className="flex h-48">
          <Link
            to={`/teams/${matchResultData.header.league.slug}/${matchResultData.boxscore.teams[0].team.id}`}
            className="flex"
          >
            <div className="w-[600px] flex justify-center items-center">
              <span className="text-[22px]">
                {matchResultData.boxscore.teams[0].team.displayName}
              </span>
              <img
                src={matchResultData.boxscore.teams[0].team.logo}
                alt={matchResultData.boxscore.teams[0].team.shortDisplayName}
                title={matchResultData.boxscore.teams[0].team.displayName}
                className="w-20 ml-3"
              />
            </div>
          </Link>

          <div className="w-[100px] text-center flex items-center justify-center text-[40px] font-bold">
            {matchResultData.header.competitions[0].competitors[0].score} :{" "}
            {matchResultData.header.competitions[0].competitors[1].score}
          </div>

          <Link
            to={`/teams/${matchResultData.header.league.slug}/${matchResultData.boxscore.teams[1].team.id}`}
            className="flex"
          >
            <div className="w-[600px] flex justify-center items-center">
              <img
                src={matchResultData.boxscore.teams[1].team.logo}
                alt={matchResultData.boxscore.teams[1].team.shortDisplayName}
                title={matchResultData.boxscore.teams[1].team.displayName}
                className="w-20 mr-3"
              />
              <span className="text-[22px]">
                {matchResultData.boxscore.teams[1].team.displayName}
              </span>
            </div>
          </Link>
        </Card>
      )}

      <section className="grid gap-3">
        <div className="grid grid-cols-2 gap-6">
          <Roster data={matchResultData.rosters[0]} />

          <Roster data={matchResultData.rosters[1]} />
        </div>

        <div>
          {matchResultData.boxscore.teams[0].statistics ? (
            <MatchResultTable data={matchResultData} />
          ) : (
            <p>Sorry, There is No Statistics Data</p>
          )}
        </div>

        {matchResultData && matchResultData.keyEvents && (
          <Commentary data={matchResultData} />
        )}
      </section>
    </div>
  );
});

export default MatchResult;
