import { memo } from "react";

import { Link, useParams } from "react-router-dom";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchSquadData } from "@/server/fetchData";

const OtherPlayer = memo(() => {
  const { slugId, teamId, playerId } = useParams();

  const { data: otherPlayerData } = useSuspenseQuery({
    queryKey: ["otherPlayerData", playerId],
    queryFn: () => fetchSquadData(slugId, teamId),
    select: (data: AthletesDataTypes[]) =>
      data.filter((item) => item.id !== playerId),
  });

  return (
    <div className="w-[300px] border rounded-3xl p-5 row-span-4">
      <h3 className="border-b border-hoverColor text-[22px] text-center">
        Same Position Player
      </h3>

      <ul className="p-2">
        {otherPlayerData.map((item) => (
          <li key={item.id}>
            <Link
              to={`/teams/${slugId}/${teamId}/player/${item.id}`}
              className="flex justify-between items-center h-8 hover:bg-hoverColor"
            >
              <span>{item.displayName}</span>
              <span>#{item.jersey}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default OtherPlayer;
