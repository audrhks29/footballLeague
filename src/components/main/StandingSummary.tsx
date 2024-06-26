import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchStandingSeasonData } from "@/server/fetchData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";

const StandingSummary = memo(({ slugId }: { slugId: string }) => {
  const { data: standingsData } = useSuspenseQuery({
    queryKey: ["standingData", slugId],
    queryFn: () => fetchStandingSeasonData(slugId, "2023"),
    select: (data: StandingSeasonDataTypes) =>
      data.children[0].standings.entries,
  });

  const navigate = useNavigate();

  const handleClickRow = (id: string) => {
    navigate(`/teams/${slugId}/${id}`);
  };

  const handleClickMore = () => {
    navigate(`/standings/${slugId}/2023`);
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <CardTitle>Standings</CardTitle>
        <CardDescription onClick={handleClickMore} className="cursor-pointer">
          more +
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Rank</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">GP</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">P</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-center">
            {standingsData.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => handleClickRow(item.team.id)}
                className="cursor-pointer"
              >
                <TableCell>
                  {item.stats.find((stat) => stat.name === "rank")?.value}
                </TableCell>
                <TableCell className="flex gap-3">
                  <img src={item.team.logos[0].href} width={20} height={20} />
                  <span>{item.team.abbreviation}</span>
                </TableCell>
                <TableCell>
                  {
                    item.stats.find((stat) => stat.name === "gamesPlayed")
                      ?.value
                  }
                </TableCell>
                <TableCell>
                  {item.stats.find((stat) => stat.name === "wins")?.value}
                </TableCell>
                <TableCell>
                  {item.stats.find((stat) => stat.name === "ties")?.value}
                </TableCell>
                <TableCell>
                  {item.stats.find((stat) => stat.name === "losses")?.value}
                </TableCell>
                <TableCell>
                  {item.stats.find((stat) => stat.name === "points")?.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

export default StandingSummary;
