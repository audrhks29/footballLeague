import { memo } from "react";

import { FaRegQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Props {
  paramsNation: string | undefined;
  paramsDivision: string | undefined;
  standingsData: StandingsDataTypes;
}

const StandingsTable = memo(
  ({ paramsNation, paramsDivision, standingsData }: Props) => {
    const navigate = useNavigate();

    const thArray = [
      "Rank",
      "Team Name",
      "P",
      "GP",
      "W",
      "D",
      "L",
      "GD",
      "NOTE",
    ];

    const goToTeamInfoPage = (teamId: string) => {
      navigate(`/teams/${paramsNation}.${paramsDivision}/${teamId}`);
    };

    return (
      <Table className="text-center m-auto">
        <colgroup>
          <col width={70} />
          <col width={300} />
          <col width={60} />
          <col width={60} />
          <col width={60} />
          <col width={60} />
          <col width={60} />
          <col width={60} />
          <col width={300} />
        </colgroup>
        <TableHeader>
          <TableRow>
            {thArray.map((item, index) => (
              <TableHead className="text-center" key={index}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {standingsData.entries.map((entry: Entries, entryIndex: number) => {
            const rankArray = Array.from(
              { length: standingsData.entries.length },
              (_, index) => index + 1
            );
            const statsOrderArray = [
              "points",
              "gamesPlayed",
              "wins",
              "ties",
              "losses",
              "pointDifferential",
              "note",
            ];

            return (
              <TableRow
                key={entryIndex}
                onClick={() => goToTeamInfoPage(entry.team.id)}
                className="cursor-pointer"
              >
                <TableCell className="font-bold">
                  {rankArray[entryIndex]}
                </TableCell>
                {entry.team && (
                  <TableCell className="flex items-center px-3">
                    {entry.team.logos ? (
                      <img
                        src={entry.team.logos[0].href}
                        alt={entry.team.name}
                        title={entry.team.name}
                        className="h-7 mr-2"
                      />
                    ) : (
                      <i className="text-[28px] mr-2">
                        <FaRegQuestionCircle />
                      </i>
                    )}
                    {entry.team.name}
                  </TableCell>
                )}
                {entry.stats && (
                  <>
                    {statsOrderArray.map((statName, index) => {
                      const stat = entry.stats.find(
                        (stat) => stat.name === statName
                      );

                      return (
                        stat && <TableCell key={index}>{stat.value}</TableCell>
                      );
                    })}
                  </>
                )}
                {entry.note && (
                  <TableCell
                    style={{ backgroundColor: `${entry.note.color}` }}
                    className="text-[#282828]"
                  >
                    {entry.note.description}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
);

export default StandingsTable;
