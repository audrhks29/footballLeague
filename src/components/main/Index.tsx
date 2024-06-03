import { memo } from "react";
import RecentNews from "./RecentNews";
import ScoreBoard from "./ScoreBoard";

const Index = memo(({ slugId }: { slugId: string }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <RecentNews slugId={slugId} />
      <ScoreBoard slugId={slugId} />
    </div>
  );
});

export default Index;
