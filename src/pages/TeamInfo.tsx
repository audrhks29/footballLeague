import { memo, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Banner from "../components/teams/layout/Banner";
import Squad from "../components/teams/Squad/Squad";
import Result from "../components/teams/teamInfo/result/Result";
import TeamInfoHome from "../components/teams/teamInfo/TeamInfoHome/TeamInfoHome";

import { useSuspenseQueries } from "@tanstack/react-query";
import useTeamDataStore from "../store/teamData-store";
import useStandingsDataStore from "../store/standings-store";
import useRosterDataStore from "../store/rosterData-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TeamInfo = memo(() => {
  const { slugId, teamId } = useParams<string>();
  const navigate = useNavigate();

  const { fetchTeamData } = useTeamDataStore();
  const { fetchSummarizeStatsData } = useStandingsDataStore();
  const { fetchRosterData } = useRosterDataStore();

  const [{ data: teamData }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["teamData", slugId, teamId],
        queryFn: () => fetchTeamData(slugId, teamId),
      },
      {
        queryKey: ["summarizeStatsData", slugId, teamId],
        queryFn: () => fetchSummarizeStatsData(slugId, teamId),
      },
      {
        queryKey: ["rosterData", slugId, teamId],
        queryFn: () => fetchRosterData(slugId, teamId),
      },
    ],
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
            result
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
