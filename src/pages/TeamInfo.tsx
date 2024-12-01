import React, { memo, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Banner from "../components/teams/layout/Banner";
import Squad from "../components/teams/Squad/Squad";
import Result from "../components/teams/teamInfo/result/Result";
import TeamInfoHome from "../components/teams/teamInfo/TeamInfoHome/TeamInfoHome";

import { fetchTeamData } from "@/services/fetchData";

const TeamInfo = memo(() => {
  const { slugId, teamId } = useParams<string>();
  const navigate = useNavigate();

  const { data: teamData } = useSuspenseQuery({
    queryKey: ["teamData", slugId, teamId],
    queryFn: () => fetchTeamData(slugId, teamId),
  });

  // standingData에서 클릭시 현 시즌 slugId와 안맞으면 slugId params 수정
  useEffect(() => {
    if (teamData.defaultLeague.slug !== slugId) {
      navigate(`/teams/${teamData.defaultLeague.slug}/${teamId}`);
    }
  }, [navigate, slugId, teamData.defaultLeague.slug, teamId]);

  const tabArray = [
    { id: 1, component: <TeamInfoHome />, label: "Home" },
    { id: 2, component: <Squad />, label: "Squad" },
    { id: 3, component: <Result />, label: "Result" },
  ];

  return (
    <div className="inner">
      <Banner data={teamData} />

      <div role="tablist" className="tabs tabs-lifted mt-6">
        {tabArray.map((tab) => (
          <React.Fragment key={tab.id}>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label={tab.label}
              defaultChecked={tab.id === 1}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              {tab.component}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

export default TeamInfo;
