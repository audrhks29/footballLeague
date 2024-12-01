import { memo } from "react";
import { useParams } from "react-router-dom";

import {
  usePlayerSeasons,
  useSeasonNames,
  useSeasonStats,
} from "@/hooks/usePlayerStats";

const AllSeasonStats = memo((props: { fetchUrl: string; position: string }) => {
  const { playerId } = useParams();

  const { data: playerSeasonsData } = usePlayerSeasons(playerId);
  const { data: fetchedData } = useSeasonStats(playerId, playerSeasonsData);
  const { data: seasonNameData } = useSeasonNames(playerId, fetchedData);

  const goalKeeperTh = [
    { id: 1, name: "Season" },
    { id: 2, name: "App" },
    { id: 3, name: "Sub" },
    { id: 4, name: "Save" },
    { id: 5, name: "Goals Conceded" },
    { id: 6, name: "Assists" },
    { id: 7, name: "Foul" },
    { id: 8, name: "Yellow Card" },
    { id: 9, name: "Red Card" },
  ];

  const fieldTh = [
    { id: 1, name: "Season" },
    { id: 2, name: "App" },
    { id: 3, name: "Sub" },
    { id: 4, name: "Goals" },
    { id: 4, name: "Assists" },
    { id: 6, name: "Shots" },
    { id: 7, name: "Shot On Target" },
    { id: 8, name: "Foul" },
    { id: 9, name: "Yellow Card" },
    { id: 10, name: "Red Card" },
  ];

  const findStatValue = (
    categoryData: SplitsDataTypes | undefined,
    statName: string
  ) => categoryData?.stats.find((stat) => stat.name === statName)?.value;

  const findCategory = (categories: SplitsDataTypes[], categoryName: string) =>
    categories.find((category) => category.name === categoryName);

  return (
    <section className="card">
      <div className="card-body">
        <div className="card-title">
          <h3>All Season Stats</h3>
        </div>
        <table className="table text-center w-full">
          <thead>
            <tr>
              {props.position === "1"
                ? goalKeeperTh.map((item, index) => (
                    <th className="text-center" key={index}>
                      {item.name}
                    </th>
                  ))
                : fieldTh.map((item, index) => (
                    <th className="text-center" key={index}>
                      {item.name}
                    </th>
                  ))}
            </tr>
          </thead>

          <tbody>
            {fetchedData?.map((item, index) => {
              const generalData = findCategory(
                item.splits.categories,
                "general"
              );
              const offensiveData = findCategory(
                item.splits.categories,
                "offensive"
              );
              const seasonName = seasonNameData && seasonNameData[index];

              const stats: {
                appearances: number | undefined;
                subIns: number | undefined;
                foulsCommitted: number | undefined;
                yellowCards: number | undefined;
                redCards: number | undefined;
                totalGoals?: number | undefined;
                goalAssists: number | undefined;
                totalShots?: number | undefined;
                shotsOnTarget?: number | undefined;
                goalsConceded?: number | undefined;
                saves?: number | undefined;
              } = {
                appearances: findStatValue(generalData, "appearances"),
                subIns: findStatValue(generalData, "subIns"),
                foulsCommitted: findStatValue(generalData, "foulsCommitted"),
                yellowCards: findStatValue(generalData, "yellowCards"),
                redCards: findStatValue(generalData, "redCards"),
                totalGoals: findStatValue(offensiveData, "totalGoals"),
                goalAssists: findStatValue(offensiveData, "goalAssists"),
                totalShots: findStatValue(offensiveData, "totalShots"),
                shotsOnTarget: findStatValue(offensiveData, "shotsOnTarget"),
              };

              const isGoalKeeper = props.position === "1";

              if (isGoalKeeper) {
                const goalKeepingData = findCategory(
                  item.splits.categories,
                  "goalKeeping"
                );
                stats.goalsConceded = findStatValue(
                  goalKeepingData,
                  "goalsConceded"
                );
                stats.saves = findStatValue(goalKeepingData, "saves");
              }

              return (
                <tr key={index}>
                  <td className="text-left">{seasonName}</td>
                  <td>{stats.appearances}</td>
                  <td>{stats.subIns}</td>
                  {isGoalKeeper ? (
                    <>
                      <td>{stats.saves}</td>
                      <td>{stats.goalsConceded}</td>
                    </>
                  ) : (
                    <>
                      <td>{stats.totalGoals}</td>
                      <td>{stats.totalShots}</td>
                      <td>{stats.shotsOnTarget}</td>
                    </>
                  )}
                  <td>{stats.goalAssists}</td>
                  <td>{stats.foulsCommitted}</td>
                  <td>{stats.yellowCards}</td>
                  <td>{stats.redCards}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
});

export default AllSeasonStats;
