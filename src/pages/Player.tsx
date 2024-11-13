import { useSuspenseQueries } from "@tanstack/react-query";

import axios from "axios";

import { memo } from "react";

import { useParams } from "react-router-dom";

import { FaRegQuestionCircle } from "react-icons/fa";

import CurrentSeasonStats from "../components/teams/Squad/player/CurrentSeasonStats";
import Transactions from "../components/teams/Squad/player/Transactions";
import OtherPlayer from "../components/teams/Squad/player/OtherPlayer";
import ErrorCurrentSeasonStats from "./../components/teams/Squad/player/error/ErrorCurrentSeasonStats";
import ErrorTransactions from "../components/teams/Squad/player/error/ErrorTransactions";
import NextMatch from "../components/teams/Squad/player/NextMatch";
import AllSeasonStats from "../components/teams/Squad/player/AllSeasonStats";
import ErrorAllSeasonStats from "../components/teams/Squad/player/error/ErrorAllSeasonStats";
import { fetchPlayerData } from "@/services/fetchData";
import { Card } from "@/components/ui/card";

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

  const logoImage = playerTeamData.logos[0];

  const height = isNaN(playerData.height)
    ? "-"
    : (playerData.height * 2.54).toFixed(1);

  const weight = isNaN(playerData.weight)
    ? "-"
    : (playerData.weight * 0.453592).toFixed(1);

  const name = playerData.displayName.split(" ");

  return (
    <div className="inner">
      <Card className="h-48 py-3 px-5 flex overflow-hidden">
        {logoImage ? (
          <img
            src={logoImage.href}
            alt={logoImage.displayName}
            title={logoImage.displayName}
          />
        ) : (
          <i className="text-[96px]">
            <FaRegQuestionCircle />
          </i>
        )}

        <ul className="px-7 py-5 flex flex-col justify-around">
          <li className="text-[40px] leading-[44px]">
            <p>{name[0]}</p>
            <p>{name[1]}</p>
          </li>
          <li>
            {playerTeamData.shortDisplayName} / #{playerData.jersey} /{" "}
            {playerData.position.displayName}
          </li>
        </ul>

        <div className="flex flex-col justify-center px-7 w-[350px] text-[16px] gap-2">
          <div className="flex justify-between">
            <p className="w-[130px]">HT(cm) / WT(kg)</p>
            <span>
              {height} / {weight}
            </span>
          </div>
          <div className="flex justify-between">
            <p className="w-[130px]">BIRTHDATE</p>
            <span>
              {playerData.dateOfBirth.slice(0, 10)}({playerData.age})
            </span>
          </div>
          <div className="flex justify-between">
            <p className="w-[130px]">NATIONALITY</p>
            <span>{playerData.citizenship}</span>
          </div>
        </div>
        {playerData.statistics ? (
          <CurrentSeasonStats fetchUrl={playerData.statistics.$ref} />
        ) : (
          <ErrorCurrentSeasonStats />
        )}
      </Card>

      <div className="grid grid-cols-[350px_minmax(950px, 2fr)] gap-4 grid-rows-[280px_minmax(300px, 3fr)] items-start mt-6">
        <OtherPlayer />

        {playerData.transactions ? (
          <Transactions
            fetchUrl={playerData.transactions.$ref}
            playerData={playerData}
          />
        ) : (
          <ErrorTransactions />
        )}

        <NextMatch fetchUrl={playerData.events.$ref} />

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
  );
});

export default Player;
