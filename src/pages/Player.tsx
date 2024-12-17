import { memo } from "react";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

import Transactions from "../components/teams/Squad/player/Transactions";
import OtherPlayer from "../components/teams/Squad/player/OtherPlayer";
import ErrorTransactions from "../components/teams/Squad/player/error/ErrorTransactions";
import NextMatch from "../components/teams/Squad/player/NextMatch";
import AllSeasonStats from "../components/teams/Squad/player/AllSeasonStats";
import ErrorAllSeasonStats from "../components/teams/Squad/player/error/ErrorAllSeasonStats";

import PlayerInfo from "@/components/teams/Squad/player/PlayerInfo";

import { fetchPlayerData } from "@/services/fetchData";

const Player = memo(() => {
  const { slugId, teamId, playerId } = useParams();

  const getTeamLogo = async () => {
    const url = `http://sports.core.api.espn.com/v2/sports/soccer/teams/${teamId}?lang=en&region=us`;
    const response = await axios.get(url);
    return response.data;
  };

  const [{ data: playerData }, { data: playerTeamData }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["playerData", slugId, teamId, playerId],
        queryFn: () => fetchPlayerData(slugId, playerId),
      },
      {
        queryKey: ["playerTeamData", slugId, teamId],
        queryFn: () => getTeamLogo(),
      },
    ],
  });

  return (
    <div className="inner">
      <PlayerInfo playerData={playerData} playerTeamData={playerTeamData} />

      <div className="grid grid-cols-[350px_950px] gap-3 mt-6">
        <OtherPlayer />

        <div className="flex flex-col gap-3">
          {playerData.transactions ? (
            <Transactions
              fetchUrl={playerData.transactions.$ref}
              playerData={playerData}
            />
          ) : (
            <ErrorTransactions />
          )}

          <div className="divider m-0 h-0"></div>

          <NextMatch fetchUrl={playerData.events.$ref} />

          <div className="divider m-0 h-0"></div>

          {playerData.transactions ? (
            <AllSeasonStats
              fetchUrl={playerData.seasons.$ref}
              position={playerData.position.id}
            />
          ) : (
            <ErrorAllSeasonStats />
          )}
        </div>
      </div>
    </div>
  );
});

export default Player;
