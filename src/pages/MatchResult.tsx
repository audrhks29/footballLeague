import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchMatchResultData } from "@/services/fetchData";

import MatchResultTable from "@/components/matchResult/MatchResultTable";
import Commentary from "@/components/matchResult/Commentary";
import MatchInfo from "@/components/matchResult/MatchInfo";
import MatchRoster from "@/components/matchResult/MatchRoster";

const MatchResult = memo(() => {
  const { slugId, gameId } = useParams();

  const { data: matchResultData } = useSuspenseQuery({
    queryKey: ["matchResultData", slugId, gameId],
    queryFn: () => fetchMatchResultData(slugId, gameId),
  });

  const tabArrays = [
    {
      id: 1,
      name: "Match Roster",
      component: <MatchRoster matchResultData={matchResultData} />,
    },
    {
      id: 2,
      name: "Match Graph",
      component: <MatchResultTable matchResultData={matchResultData} />,
    },
    {
      id: 3,
      name: "Commentary",
      component: <Commentary matchResultData={matchResultData} />,
    },
  ];
  return (
    <div className="inner">
      <MatchInfo data={matchResultData} />

      <div role="tablist" className="tabs tabs-lifted tabs-lg">
        {tabArrays.map((item) => (
          <React.Fragment key={item.id}>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab min-w-36"
              aria-label={item.name}
              defaultChecked={item.id === 1}
            />

            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              {item.component}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

export default MatchResult;
