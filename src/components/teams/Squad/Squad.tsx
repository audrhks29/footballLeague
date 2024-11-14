import { memo } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { goalKeeperTh, outfieldPlayerTh } from "../../../assets/ArrayData";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PlayerLists from "./PlayerLists";

import { fetchSquadData } from "@/services/fetchData";

const Squad = memo(() => {
  const { slugId, teamId } = useParams();

  const { data: squadData } = useSuspenseQuery({
    queryKey: ["squadData", slugId, teamId],
    queryFn: () => fetchSquadData(slugId, teamId),
  });

  const goalkeepers = squadData?.filter(
    (player: PlayerDataType) => player.position.displayName === "Goalkeeper"
  );

  const fieldPlayers = squadData?.filter(
    (player: PlayerDataType) => player.position.displayName !== "Goalkeeper"
  );

  return (
    <div>
      <h2 className="text-[20px] font-semibold mb-2">GoalKeepers</h2>

      <Table className="w-full text-center">
        <colgroup>
          <col width={190} />
          <col width={60} />
          <col width={60} />
          <col width={75} />
          <col width={75} />
          <col width={190} />
        </colgroup>

        <TableHeader>
          <TableRow>
            {goalKeeperTh.map((item, index) => (
              <TableHead className="text-center" key={index} title={item.title}>
                {item.text}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {goalkeepers &&
            goalkeepers.map((item: PlayerDataType, index: number) => {
              return <PlayerLists item={item} index={index} key={index} />;
            })}
        </TableBody>
      </Table>

      <h2 className="text-[20px] font-semibold mt-6 mb-2">FieldPlayers</h2>
      <Table className="w-full text-center">
        <colgroup>
          <col width={190} />
          <col width={60} />
          <col width={60} />
          <col width={75} />
          <col width={75} />
          <col width={190} />
        </colgroup>

        <TableHeader>
          <TableRow>
            {outfieldPlayerTh.map((item, index) => (
              <TableHead className="text-center" key={index} title={item.title}>
                {item.text}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {fieldPlayers &&
            fieldPlayers.map((item: PlayerDataType, index: number) => {
              return <PlayerLists item={item} index={index} key={index} />;
            })}
        </TableBody>
      </Table>
    </div>
  );
});

export default Squad;
