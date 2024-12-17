import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchSquadData } from "@/services/fetchData";

const OtherPlayer = memo(() => {
  const navigate = useNavigate();

  const { slugId, teamId, playerId } = useParams();

  const { data: otherPlayerData } = useSuspenseQuery({
    queryKey: ["otherPlayerData", playerId],
    queryFn: () => fetchSquadData(slugId, teamId),
    select: (data: AthletesDataTypes[]) =>
      data.filter((item) => item.id !== playerId),
  });

  return (
    <section className="card w-[300px] row-span-5 row-start-1">
      <div className="card-body p-0">
        <div className="card-title">
          <h2 className="text-center">Same Position Player</h2>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Jersey</th>
            </tr>
          </thead>
          <tbody>
            {otherPlayerData.map((item) => (
              <tr
                key={item.id}
                onClick={() =>
                  navigate(`/teams/${slugId}/${teamId}/player/${item.id}`)
                }
                className="hover:bg-base-300 cursor-pointer"
              >
                <td>{item.displayName}</td>
                <td className="text-right">#{item.jersey}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
});

export default OtherPlayer;
