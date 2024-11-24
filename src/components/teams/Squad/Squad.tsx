import { memo } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { goalKeeperTh, outfieldPlayerTh } from "../../../assets/ArrayData";

import PlayerLists from "./PlayerLists";

import { fetchSquadData } from "@/services/fetchData";

const SquadTable = memo(
  ({
    position,
    thArray,
    playerPosition,
  }: {
    position: string;
    thArray: { id: number; text: string; title: string }[];
    playerPosition: PlayerDataType[];
  }) => {
    return (
      <article>
        <h2 className="text-[20px] font-semibold mb-2">{position}</h2>

        <table className="table text-center">
          <colgroup>
            <col width={190} />
            <col width={60} />
            <col width={60} />
            <col width={75} />
            <col width={75} />
            <col width={190} />
          </colgroup>

          <thead>
            <tr>
              {thArray.map((item, index) => (
                <th className="text-center" key={index} title={item.title}>
                  {item.text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {playerPosition &&
              playerPosition.map((player: PlayerDataType, index: number) => {
                return (
                  <PlayerLists player={player} index={index} key={index} />
                );
              })}
          </tbody>
        </table>
      </article>
    );
  }
);

const Squad = memo(() => {
  const { slugId, teamId } = useParams();

  const { data: squadData } = useSuspenseQuery({
    queryKey: ["squadData", slugId, teamId],
    queryFn: () => fetchSquadData(slugId, teamId),
  });

  const goalkeepers = squadData?.filter(
    (player: PlayerDataType) => player.position.displayName === "Goalkeeper"
  );

  const fieldPlayers = squadData?.filter(
    (player: PlayerDataType) => player.position.displayName !== "Goalkeeper"
  );

  return (
    <section>
      <SquadTable
        position={"GoalKeepers"}
        thArray={goalKeeperTh}
        playerPosition={goalkeepers}
      />

      <div className="divider"></div>

      <SquadTable
        position={"FieldPlayers"}
        thArray={outfieldPlayerTh}
        playerPosition={fieldPlayers}
      />
    </section>
  );
});

export default Squad;
