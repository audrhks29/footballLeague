import { memo } from "react";
import { useNavigate } from "react-router-dom";

const PlayerLists = memo(
  ({ player, index }: { player: PlayerDataType; index: number }) => {
    const navigate = useNavigate();

    const getStatValue = (categoryName: string, statName: string) => {
      const category = player.statistics?.splits.categories.find(
        (category) => category.name === categoryName
      );
      return (
        category?.stats.find((stat) => stat.name === statName)?.value ?? "-"
      );
    };

    const { displayName: name, jersey: no, age, height, weight, flag } = player;
    const country = flag ? flag.alt : "-";
    const countryImage = flag ? flag.href : "-";

    const isGoalkeeper = player.position.name === "Goalkeeper";
    const heightFormatted = height ? (height * 2.54).toFixed(1) + "cm" : "-";
    const weightFormatted = weight
      ? (weight * 0.453592).toFixed(1) + "kg"
      : "-";

    return (
      <tr
        key={index}
        className="cursor-pointer hover:bg-base-200"
        onClick={() => navigate(`player/${player.id}`)}
      >
        <td className="text-left">{name}</td>
        <td>{no}</td>
        <td>{age}</td>
        <td>{heightFormatted}</td>
        <td>{weightFormatted}</td>
        <td className="text-left indent-2">
          <img
            src={countryImage}
            alt="countryImage"
            className="h-4 inline-block mr-2"
          />
          {country}
        </td>
        <td>{getStatValue("general", "appearances")}</td>
        <td>{getStatValue("general", "subIns")}</td>
        {isGoalkeeper ? (
          <>
            <td>{getStatValue("goalKeeping", "saves")}</td>
            <td>{getStatValue("goalKeeping", "goalsConceded")}</td>
          </>
        ) : (
          <>
            <td>{getStatValue("offensive", "totalGoals")}</td>
            <td>{getStatValue("offensive", "goalAssists")}</td>
            <td>{getStatValue("offensive", "totalShots")}</td>
            <td>{getStatValue("offensive", "shotsOnTarget")}</td>
          </>
        )}
        <td>{getStatValue("general", "foulsCommitted")}</td>
        <td>{getStatValue("general", "foulsSuffered")}</td>
        <td>{getStatValue("general", "yellowCards")}</td>
        <td>{getStatValue("general", "redCards")}</td>
      </tr>
    );
  }
);

export default PlayerLists;
