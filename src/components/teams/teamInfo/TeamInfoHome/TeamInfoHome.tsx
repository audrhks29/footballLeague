import { memo } from "react";

import SummarizeStats from "./SummarizeStats";
import NextEvent from "./NextEvent";
import SummarizeResult from "./summarizeResult/SummarizeResult";

const TeamInfoHome = memo(() => {
  return (
    <div className="grid gap-6">
      <SummarizeStats />
      <div className="divider"></div>

      <SummarizeResult />
      <div className="divider"></div>

      <NextEvent />
    </div>
  );
});

export default TeamInfoHome;
