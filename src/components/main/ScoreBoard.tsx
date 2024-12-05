import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchScoreboardData } from "@/services/fetchData";

const ScoreBoard = memo(({ slugId }: { slugId: string }) => {
  const navigate = useNavigate();

  const { data: scoreboardData } = useSuspenseQuery({
    queryKey: [`scoreboardData${slugId}`, slugId],
    queryFn: () => fetchScoreboardData(slugId),
    select: (data) => (data ? data : null),
  });

  return (
    <section className="card border bg-base shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Recent Match</h2>
        <span className="text-[12px] font-normal">
          {scoreboardData.day.date}
        </span>

        <div className="text-center flex flex-col gap-3">
          {scoreboardData ? (
            scoreboardData.events.map((data: EventDataTypes, index: number) => {
              const homeTeamData = data.competitions[0].competitors.find(
                (homeTeam) => homeTeam.homeAway === "home"
              );

              const awayTeamData = data.competitions[0].competitors.find(
                (awayTeam) => awayTeam.homeAway === "away"
              );

              return (
                <div
                  className="p-3 flex gap-3 justify-center items-center cursor-pointer hover:bg-base-300 border"
                  onClick={() => navigate(`/match/${slugId}/${data.id}`)}
                  key={index}
                >
                  {/* 홈 팀 로고 & 팀 명 */}
                  <div>
                    {homeTeamData?.team.logo && (
                      <img
                        src={homeTeamData?.team.logo}
                        width={40}
                        height={40}
                      />
                    )}
                    <span className="text-center font-bold">
                      {homeTeamData?.team.abbreviation}
                    </span>
                  </div>

                  {/* 스코어 */}
                  <div>
                    <span className="font-bold">{homeTeamData?.score}</span>
                    <span className="font-bold"> - </span>
                    <span className="font-bold">{awayTeamData?.score}</span>
                  </div>

                  {/* 어웨이 팀 로고 & 팀 명 */}
                  <div className="grid gap-1">
                    {awayTeamData?.team.logo && (
                      <img
                        src={awayTeamData?.team.logo}
                        width={40}
                        height={40}
                      />
                    )}
                    <span className="text-center font-bold">
                      {awayTeamData?.team.abbreviation}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <span>No Recent Match</span>
          )}
        </div>
      </div>
    </section>
  );
});

export default ScoreBoard;
