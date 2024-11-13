import { memo } from "react";

import { goalKeeperTh, outfieldPlayerTh } from "../../../assets/ArrayData";

import GoalKeeper from "./GoalKeeper";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OutfieldPlayer from "./OutFieldPlayer";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchSquadData } from "@/services/fetchData";

const Squad = memo(() => {
  const { slugId, teamId } = useParams();

  const { data: squadData } = useSuspenseQuery({
    queryKey: ["squadData", slugId, teamId],
    queryFn: () => fetchSquadData(slugId, teamId),
  });

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
          {squadData &&
            squadData.map((item: PlayerDataType, index: number) => {
              return <GoalKeeper item={item} index={index} key={index} />;
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
          {squadData &&
            squadData.map((item: PlayerDataType, index: number) => {
              return <OutfieldPlayer item={item} index={index} key={index} />;
            })}
        </TableBody>
      </Table>
    </div>
  );
});

export default Squad;
