import React, { memo } from "react";
import { Link, useParams } from "react-router-dom";
import { useSuspenseQueries } from "@tanstack/react-query";

import { fetchSummarizeStatsData, fetchTeamData } from "@/services/fetchData";
import getCurrentYear from "@/utils/getCurrentDate";

const SummarizeStats = memo(() => {
  const { slugId, teamId } = useParams();
  const currentYear = getCurrentYear();

  const [{ data: teamData }, { data: summarizeStatsData }] = useSuspenseQueries(
    {
      queries: [
        {
          queryKey: ["teamData", slugId, teamId],
          queryFn: () => fetchTeamData(slugId, teamId),
        },
        {
          queryKey: ["summarizeStatsData", slugId, teamId],
          queryFn: () => fetchSummarizeStatsData(slugId, teamId),
        },
      ],
    }
  );

  const statList = ["rank", "gamesPlayed", "wins", "ties", "losses", "points"];
  const leagueLogo = teamData && teamData.defaultLeague.logos[1];
  const statsData =
    teamData?.record?.items || (teamData && summarizeStatsData?.stats);
  return (
    <article>
      <div className="pb-2 flex items-end h-22">
        {teamData && (
          <React.Fragment>
            <img
              src={leagueLogo?.href}
              alt={leagueLogo?.href}
              className="w-16"
            />
            <h2 className="text-[20px] font-semibold mb-2">
              Current Season Team Stats
            </h2>
          </React.Fragment>
        )}
      </div>

      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        {statsData.map((item: RecordItems) =>
          statList.map((statName, index) => {
            const stats = item.stats.find((stat) => stat.name === statName);
            if (stats) {
              return (
                <div key={index} className="stat">
                  <div className="stat-title">{stats.name}</div>
                  <div className="stat-value text-right">{stats.value}</div>
                </div>
              );
            }
          })
        )}
      </div>

      <div className="text-right">
        <Link
          to={`/standings/${slugId}/${currentYear}`}
          className="cursor-pointer"
        >
          more +
        </Link>
      </div>
    </article>
  );
});

export default SummarizeStats;
