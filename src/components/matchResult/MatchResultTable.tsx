import { memo } from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

interface Props {
  data: MatchResultType;
}

const MatchResultTable = memo(({ data }: Props) => {
  // homeTeam, awayTeam Stat
  const teamStatTableData: {
    name: string;
    homeTeamValue: string;
    label: string;
    awayTeamValue?: string;
  }[] = [];

  data.boxscore.teams[0].statistics &&
    data.boxscore.teams[0].statistics.forEach((stat) => {
      teamStatTableData.push({
        name: stat.name,
        homeTeamValue: stat.displayValue,
        label: stat.label,
      });
    });

  data.boxscore.teams[1].statistics &&
    data.boxscore.teams[1].statistics.forEach((stat, index) => {
      teamStatTableData[index]["awayTeamValue"] = stat.displayValue;
    });

  return (
    <Table className="m-auto w-fit">
      <colgroup>
        <col width={80} />
        <col width={200} />
        <col width={80} />
      </colgroup>

      <TableBody>
        {teamStatTableData.map((item, index) => {
          const totalGraphWidth: number =
            Number(item.homeTeamValue) + Number(item.awayTeamValue);
          const homeValuePercent: number = Number(
            ((Number(item.homeTeamValue) / totalGraphWidth) * 100).toFixed(1)
          );
          const awayValuePercent: number = Number(
            ((Number(item.awayTeamValue) / totalGraphWidth) * 100).toFixed(1)
          );

          const homeGraphWidth: number = Number.isNaN(homeValuePercent)
            ? 0
            : homeValuePercent;
          const awayGraphWidth: number = Number.isNaN(awayValuePercent)
            ? 0
            : awayValuePercent;

          if (item.label.includes("%")) return;
          else {
            return (
              <TableRow key={index} className="h-7">
                <TableCell
                  className="text-right relative"
                  title={`${homeGraphWidth}%`}
                >
                  <div
                    style={{
                      width: homeGraphWidth ? `${homeGraphWidth}px` : "",
                      height: homeGraphWidth ? "22px" : "",
                      backgroundColor:
                        homeValuePercent > awayValuePercent
                          ? "#845EC2"
                          : "#BC39B1",
                    }}
                    className="absolute right-0 -translate-y-1/2"
                  ></div>
                  <span className="absolute right-1 -translate-y-1/2">
                    {item.homeTeamValue}
                  </span>
                </TableCell>

                <TableCell className="text-center">{item.label}</TableCell>

                <TableCell
                  className="text-left relative"
                  title={`${awayGraphWidth}%`}
                >
                  <div
                    style={{
                      width: awayGraphWidth ? `${awayGraphWidth}px` : "",
                      height: awayGraphWidth ? "22px" : "",
                      backgroundColor:
                        awayValuePercent > homeGraphWidth
                          ? "#845EC2"
                          : "#BC39B1",
                    }}
                    className="absolute left-0 -translate-y-1/2"
                  ></div>
                  <span className="absolute left-1 -translate-y-1/2">
                    {item.awayTeamValue}
                  </span>
                </TableCell>
              </TableRow>
            );
          }
        })}
      </TableBody>
    </Table>
  );
});

export default MatchResultTable;
