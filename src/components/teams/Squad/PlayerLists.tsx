import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { TableCell, TableRow } from "@/components/ui/table";

interface Props {
  item: PlayerDataType;
  index: number;
}

const PlayerLists = memo(({ item, index }: Props) => {
  const navigate = useNavigate();

  const goToPlayerPage = () => {
    navigate(`player/${item.id}`);
  };

  const getStatValue = (categoryName: string, statName: string) => {
    const category = item.statistics?.splits.categories.find(
      (category) => category.name === categoryName
    );
    return category?.stats.find((stat) => stat.name === statName)?.value ?? "-";
  };

  const { displayName: name, jersey: no, age, height, weight, flag } = item;
  const country = flag ? flag.alt : "-";
  const countryImage = flag ? flag.href : "-";

  const isGoalkeeper = item.position.name === "Goalkeeper";
  const heightFormatted = height ? (height * 2.54).toFixed(1) + "cm" : "-";
  const weightFormatted = weight ? (weight * 0.453592).toFixed(1) + "kg" : "-";

  return (
    <TableRow
      key={index}
      className="h-7 border-b border-tableBorderColor hover:bg-hoverColor cursor-pointer"
      onClick={goToPlayerPage}
    >
      <TableCell className="text-left">{name}</TableCell>
      <TableCell>{no}</TableCell>
      <TableCell>{age}</TableCell>
      <TableCell>{heightFormatted}</TableCell>
      <TableCell>{weightFormatted}</TableCell>
      <TableCell className="text-left indent-2">
        <img
          src={countryImage}
          alt="countryImage"
          className="h-4 inline-block mr-2"
        />
        {country}
      </TableCell>
      <TableCell>{getStatValue("general", "appearances")}</TableCell>
      <TableCell>{getStatValue("general", "subIns")}</TableCell>
      {isGoalkeeper ? (
        <>
          <TableCell>{getStatValue("goalKeeping", "saves")}</TableCell>
          <TableCell>{getStatValue("goalKeeping", "goalsConceded")}</TableCell>
        </>
      ) : (
        <>
          <TableCell>{getStatValue("offensive", "totalGoals")}</TableCell>
          <TableCell>{getStatValue("offensive", "goalAssists")}</TableCell>
          <TableCell>{getStatValue("offensive", "totalShots")}</TableCell>
          <TableCell>{getStatValue("offensive", "shotsOnTarget")}</TableCell>
        </>
      )}
      <TableCell>{getStatValue("general", "foulsCommitted")}</TableCell>
      <TableCell>{getStatValue("general", "foulsSuffered")}</TableCell>
      <TableCell>{getStatValue("general", "yellowCards")}</TableCell>
      <TableCell>{getStatValue("general", "redCards")}</TableCell>
    </TableRow>
  );
});

export default PlayerLists;
