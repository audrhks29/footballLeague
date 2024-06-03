import { memo, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Banner from "../components/teams/layout/Banner";
import Squad from "../components/teams/Squad/Squad";
import Result from "../components/teams/teamInfo/result/Result";
import TeamInfoHome from "../components/teams/teamInfo/TeamInfoHome/TeamInfoHome";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchTeamData } from "@/server/fetchData";

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

  return (
    <div className="inner">
      <Banner data={teamData} />

      <Tabs defaultValue="home">
        <TabsList className="my-3">
          <TabsTrigger value="home" className="w-24">
            Home
          </TabsTrigger>
          <TabsTrigger value="squad" className="w-24">
            Squad
          </TabsTrigger>
          <TabsTrigger value="result" className="w-24">
            Result
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <TeamInfoHome />
        </TabsContent>

        <TabsContent value="squad">
          <Squad />
        </TabsContent>

        <TabsContent value="result">
          <Result />
        </TabsContent>
      </Tabs>
    </div>
  );
});

export default TeamInfo;
