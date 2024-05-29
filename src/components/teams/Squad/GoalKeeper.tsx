import { TableCell, TableRow } from "@/components/ui/table";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  item: PlayerDataType;
  index: number;
}

const GoalKeeper = memo(({ item, index }: Props) => {
  const navigate = useNavigate();

  const goToPlayerPage = () => {
    navigate(`player/${item.id}`);
  };

  if (item.position.name == "Goalkeeper" && item.statistics) {
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
    const goalKeeping = item.statistics.splits.categories.find(
      (category) => category.name === "goalKeeping"
    );

    const app = generalCategory?.stats.find(
      (stat) => stat.name === "appearances"
    );
    const subIn = generalCategory?.stats.find((stat) => stat.name === "subIns");
    const save = goalKeeping?.stats.find((stat) => stat.name === "saves");
    const goalsConceded = goalKeeping?.stats.find(
      (stat) => stat.name === "goalsConceded"
    );
    const goalAssists = offensiveCategory?.stats.find(
      (stat) => stat.name === "goalAssists"
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
      <TableRow key={index} className="cursor-pointer" onClick={goToPlayerPage}>
        <TableCell className="text-left">{name}</TableCell>
        <TableCell>{no}</TableCell>
        <TableCell>{age}</TableCell>
        <TableCell>{height !== "NaN" ? height + "cm" : "-"}</TableCell>
        <TableCell>{weight !== "NaN" ? weight + "kg" : "-"}</TableCell>
        <TableCell className="text-left indent-2">
          <img
            src={countryImage}
            alt="countryImage"
            className="h-4 inline-block mr-2"
          />
          <span>{country}</span>
        </TableCell>
        <TableCell>{app?.value}</TableCell>
        <TableCell>{subIn?.value}</TableCell>
        <TableCell>{save?.value}</TableCell>
        <TableCell>{goalsConceded?.value}</TableCell>
        <TableCell>{goalAssists?.value}</TableCell>
        <TableCell>{foulsCommitted?.value}</TableCell>
        <TableCell>{foulsSuffered?.value}</TableCell>
        <TableCell>{yellowCard?.value}</TableCell>
        <TableCell>{redCard?.value}</TableCell>
      </TableRow>
    );
  }
});

export default GoalKeeper;
