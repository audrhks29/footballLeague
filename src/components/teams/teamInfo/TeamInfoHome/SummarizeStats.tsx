import { memo } from "react";

import { Link, useParams } from "react-router-dom";

import useTeamDataStore from "../../../../store/teamData-store";
import useStandingsDataStore from "../../../../store/standings-store";
import { Card } from "@/components/ui/card";

const SummarizeStats = memo(() => {
  const { slugId } = useParams();
  const { summarizeStatsData } = useStandingsDataStore();
  const { teamData } = useTeamDataStore();

  const statList = ["rank", "gamesPlayed", "wins", "ties", "losses", "points"];
  const leagueLogo = teamData && teamData.defaultLeague.logos[0];

  return (
    <div>
      <ul className="w-full flex justify-between">
        <Card className="p-2 w-40 flex justify-center items-center h-22 border rounded-2xl">
          {teamData && <img src={leagueLogo?.href} alt="" className="w-16" />}
        </Card>

        {teamData &&
          teamData.record.items &&
          teamData.record.items.map((item) =>
            statList.map((statName, index) => {
              const stats = item.stats.find((stat) => stat.name === statName);
              if (stats) {
                return (
                  <Card
                    key={index}
                    className="w-40 flex flex-col justify-between p-4"
                  >
                    <p className="text-[16px]">{stats.name}</p>
                    <p className="text-[20px] font-bold">{stats.value}</p>
                  </Card>
                );
              }
            })
          )}

        {/* record.items가 없을때 standingsData에서 가져와야함 */}
        {teamData &&
          summarizeStatsData &&
          !teamData.record.items &&
          summarizeStatsData.stats.map((item) =>
            statList.map((statName, index) => {
              const findArray = item.name === statName;
              // const stats = item.stats.find(stat => stat.name === statName);
              if (findArray) {
                return (
                  <Card
                    key={index}
                    className="w-40 flex flex-col justify-between p-4"
                  >
                    <p className="text-[16px]">{item.name}</p>
                    <p className="text-[20px] font-bold">{item.value}</p>
                  </Card>
                );
              }
            })
          )}
      </ul>

      <div className="text-right">
        <Link to={`/standings/${slugId}/2023`} className="cursor-pointer">
          more +
        </Link>
      </div>
    </div>
  );
});

export default SummarizeStats;
