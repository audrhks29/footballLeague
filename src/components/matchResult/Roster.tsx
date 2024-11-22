import { memo } from "react";

interface Props {
  matchResultData: RosterDataTypes;
}

const RosterTable = ({
  players,
  statsTh,
}: {
  players: RosterDataTypes["roster"];
  statsTh: string[];
}) => {
  return (
    <table className="table text-center">
      <colgroup>
        <col width={45} />
        <col width={32} />
        <col width={"auto"} />
        {players[0]?.stats && (
          <>
            <col width={28} />
            <col width={28} />
            <col width={28} />
            <col width={28} />
            <col width={28} />
            <col width={28} />
            <col width={28} />
          </>
        )}
      </colgroup>

      <thead>
        <tr>
          <th className="p-1" title="position">
            POS
          </th>
          <th className="p-1" title="jersey">
            NO
          </th>
          <th className="text-center p-1">Name</th>
          {players[0]?.stats &&
            players[0].stats.map(
              (item, index) =>
                statsTh.includes(item.abbreviation) && (
                  <th title={item.displayName} key={index} className="p-1">
                    {item.abbreviation}
                  </th>
                )
            )}
        </tr>
      </thead>

      <tbody>
        {players.map((player, index) => (
          <tr key={index}>
            <td className="p-1">{player.position.abbreviation}</td>
            <td className="p-1">{player.jersey}</td>
            <td className="p-1">{player.athlete.fullName}</td>

            {player.stats &&
              player.stats.map(
                (stat, idx) =>
                  statsTh.includes(stat.abbreviation) && (
                    <td key={idx} className="p-1">
                      {stat.value}
                    </td>
                  )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Roster = memo(({ matchResultData }: Props) => {
  const goalkeepers = matchResultData.roster.filter(
    (item) => item.position.name === "Goalkeeper"
  );

  const fieldPlayers = matchResultData.roster.filter(
    (item) => item.position.name !== "Goalkeeper"
  );

  const gkTh = ["APP", "RC", "YC", "GA", "SV", "SHF"];
  const fieldTh = ["APP", "RC", "YC", "A", "ST", "G", "SH"];

  return (
    <div>
      <RosterTable players={goalkeepers} statsTh={gkTh} />
      <RosterTable players={fieldPlayers} statsTh={fieldTh} />
    </div>
  );
});

export default Roster;
