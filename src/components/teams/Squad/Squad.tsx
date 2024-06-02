import { memo } from "react";

import useRosterDataStore from "../../../store/rosterData-store";
import { goalKeeperTh, outfieldPlayerTh } from "../../../assets/ArrayData";

import GoalKeeper from "./GoalKeeper";
import OutFieldPlayer from "./OutFieldPlayer";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Squad = memo(() => {
  const { rosterData } = useRosterDataStore();

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
          {rosterData &&
            rosterData.map((item, index) => {
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
          {rosterData &&
            rosterData.map((item, index) => {
              return <OutFieldPlayer item={item} index={index} key={index} />;
            })}
        </TableBody>
      </Table>
    </div>
  );
});

export default Squad;
