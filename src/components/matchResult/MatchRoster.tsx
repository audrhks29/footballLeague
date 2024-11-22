import { memo } from "react";
import Roster from "@/components/matchResult/Roster";

const MatchRoster = memo(
  ({ matchResultData }: { matchResultData: MatchResultDataTypes }) => {
    return (
      <section className="grid grid-cols-2 gap-6">
        <Roster matchResultData={matchResultData.rosters[0]} />
        <Roster matchResultData={matchResultData.rosters[1]} />
      </section>
    );
  }
);

export default MatchRoster;
