import { fetchScoreboardData } from "@/server/fetchData";
import { useSuspenseQuery } from "@tanstack/react-query";
import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useNavigate } from "react-router-dom";

const ScoreBoard = memo(({ slugId }: { slugId: string }) => {
  const navigate = useNavigate();

  const { data: scoreboardData } = useSuspenseQuery({
    queryKey: [`scoreboardData${slugId}`, slugId],
    queryFn: () => fetchScoreboardData(slugId),
    select: (data) => (data ? data : null),
  });

  const handleClickMatch = (gameId: string) => {
    navigate(`/match/${slugId}/${gameId}`);
  };

  return (
    <Card className="col-start-2 row-start-1 row-span-2">
      <CardHeader>
        <CardTitle>Recent Match</CardTitle>
        <CardDescription>{scoreboardData.day.date}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-3">
        {scoreboardData ? (
          scoreboardData.events.map((data: EventDataTypes, index: number) => {
            const homeTeamData = data.competitions[0].competitors.find(
              (homeTeam) => homeTeam.homeAway === "home"
            );

            const awayTeamData = data.competitions[0].competitors.find(
              (awayTeam) => awayTeam.homeAway === "away"
            );

            return (
              <Card
                className="p-3 flex gap-3 justify-center items-center cursor-pointer hover:bg-muted/50"
                onClick={() => handleClickMatch(data.id)}
                key={index}
              >
                <div className="grid gap-1">
                  {homeTeamData?.team.logo && (
                    <img src={homeTeamData?.team.logo} width={40} height={40} />
                  )}
                  <span className="text-center font-bold">
                    {homeTeamData?.team.abbreviation}
                  </span>
                </div>

                <CardDescription className="font-bold">
                  {homeTeamData?.score}
                </CardDescription>

                <span className="font-bold"> - </span>

                <CardDescription className="font-bold">
                  {awayTeamData?.score}
                </CardDescription>

                <div className="grid gap-1">
                  {awayTeamData?.team.logo && (
                    <img src={awayTeamData?.team.logo} width={40} height={40} />
                  )}
                  <span className="text-center font-bold">
                    {awayTeamData?.team.abbreviation}
                  </span>
                </div>
              </Card>
            );
          })
        ) : (
          <span>No Recent Match</span>
        )}
      </CardContent>
    </Card>
  );
});

export default ScoreBoard;
