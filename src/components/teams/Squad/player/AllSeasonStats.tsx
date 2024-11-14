import { memo } from "react";
import { useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  usePlayerSeasons,
  useSeasonNames,
  useSeasonStats,
} from "@/hooks/usePlayerStats";

interface Props {
  fetchUrl: string;
  position: string;
}

const AllSeasonStats = memo((props: Props) => {
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
    <Card>
      <CardHeader>
        <CardTitle>All Season Stats</CardTitle>
      </CardHeader>

      <Separator />
      <CardContent>
        <Table className="text-center w-full">
          <TableHeader>
            <TableRow>
              {props.position === "1"
                ? goalKeeperTh.map((item, index) => (
                    <TableHead className="text-center" key={index}>
                      {item.name}
                    </TableHead>
                  ))
                : fieldTh.map((item, index) => (
                    <TableHead className="text-center" key={index}>
                      {item.name}
                    </TableHead>
                  ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {fetchedData?.map((item, index) => {
              console.log(item.splits.categories);
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
                <TableRow key={index}>
                  <TableCell className="text-left">{seasonName}</TableCell>
                  <TableCell>{stats.appearances}</TableCell>
                  <TableCell>{stats.subIns}</TableCell>
                  {isGoalKeeper ? (
                    <>
                      <TableCell>{stats.saves}</TableCell>
                      <TableCell>{stats.goalsConceded}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{stats.totalGoals}</TableCell>
                      <TableCell>{stats.totalShots}</TableCell>
                      <TableCell>{stats.shotsOnTarget}</TableCell>
                    </>
                  )}
                  <TableCell>{stats.goalAssists}</TableCell>
                  <TableCell>{stats.foulsCommitted}</TableCell>
                  <TableCell>{stats.yellowCards}</TableCell>
                  <TableCell>{stats.redCards}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

export default AllSeasonStats;
