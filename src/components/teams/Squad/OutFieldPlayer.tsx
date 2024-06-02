import { TableCell, TableRow } from "@/components/ui/table";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  item: PlayerDataType;
  index: number;
}

const OutfieldPlayer = memo(({ item, index }: Props) => {
  const navigate = useNavigate();

  const goToPlayerPage = () => {
    navigate(`player/${item.id}`);
  };

  if (item.position.name !== "Goalkeeper" && item.statistics) {
    const name = item.displayName;
    const no = item.jersey;
    const age = item.age;
    const height = (item.height * 2.54).toFixed(1);
    const weight = (item.weight * 0.453592).toFixed(1);
    const country = item.flag ? item.flag.alt : "-";
    const countryImage = item.flag ? item.flag.href : "-";

    const generalCategory = item.statistics.splits.categories.find(
      (category) => category.name === "general"
    );
    const offensiveCategory = item.statistics.splits.categories.find(
      (category) => category.name === "offensive"
    );

    const app = generalCategory?.stats.find(
      (stat) => stat.name === "appearances"
    );
    const subIn = generalCategory?.stats.find((stat) => stat.name === "subIns");
    const totalGoals = offensiveCategory?.stats.find(
      (stat) => stat.name === "totalGoals"
    );
    const goalAssists = offensiveCategory?.stats.find(
      (stat) => stat.name === "goalAssists"
    );
    const totalShots = offensiveCategory?.stats.find(
      (stat) => stat.name === "totalShots"
    );
    const shotsOnTarget = offensiveCategory?.stats.find(
      (stat) => stat.name === "shotsOnTarget"
    );
    const foulsCommitted = generalCategory?.stats.find(
      (stat) => stat.name === "foulsCommitted"
    );
    const foulsSuffered = generalCategory?.stats.find(
      (stat) => stat.name === "foulsSuffered"
    );
    const yellowCard = generalCategory?.stats.find(
      (stat) => stat.name === "yellowCards"
    );
    const redCard = generalCategory?.stats.find(
      (stat) => stat.name === "redCards"
    );
    return (
      <TableRow
        key={index}
        className="h-7 border-b border-tableBorderColor hover:bg-hoverColor cursor-pointer"
        onClick={goToPlayerPage}
      >
        <TableCell className="text-left">{name}</TableCell>
        <TableCell>{no}</TableCell>
        <TableCell>{age}</TableCell>
        <TableCell>{height !== "NaN" ? height + "cm" : "-"}</TableCell>
        <TableCell>{weight !== "NaN" ? weight + "kg" : "-"}</TableCell>
        <TableCell className="text-left indent-2">
          <img src={countryImage} alt="" className="h-4 inline-block mr-2" />
          {country}{" "}
        </TableCell>
        <TableCell>{app?.value}</TableCell>
        <TableCell>{subIn?.value}</TableCell>
        <TableCell>{totalGoals?.value}</TableCell>
        <TableCell>{goalAssists?.value}</TableCell>
        <TableCell>{totalShots?.value}</TableCell>
        <TableCell>{shotsOnTarget?.value}</TableCell>
        <TableCell>{foulsCommitted?.value}</TableCell>
        <TableCell>{foulsSuffered?.value}</TableCell>
        <TableCell>{yellowCard?.value}</TableCell>
        <TableCell>{redCard?.value}</TableCell>
      </TableRow>
    );
  }
});

export default OutfieldPlayer;
