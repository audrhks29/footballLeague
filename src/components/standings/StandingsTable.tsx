import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegQuestionCircle } from "react-icons/fa";

const StandingsTable = memo(
  ({
    paramsNation,
    paramsDivision,
    standingsData,
  }: {
    paramsNation: string | undefined;
    paramsDivision: string | undefined;
    standingsData: StandingsDataTypes;
  }) => {
    const navigate = useNavigate();

    const thArray = [
      "Rank",
      "Team Name",
      "P",
      "GP",
      "W",
      "D",
      "L",
      "GD",
      "NOTE",
    ];

    const statsOrderArray = [
      "points",
      "gamesPlayed",
      "wins",
      "ties",
      "losses",
      "pointDifferential",
      "note",
    ];

    return (
      <table className="table text-center m-auto">
        <colgroup>
          <col width={70} />
          <col width={300} />
          <col width={60} />
          <col width={60} />
          <col width={60} />
          <col width={60} />
          <col width={60} />
          <col width={60} />
          <col width={300} />
        </colgroup>

        <thead>
          <tr>
            {thArray.map((item, index) => (
              <th className="text-center" key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {standingsData.entries.map((entry: Entries, entryIndex: number) => {
            const rankArray = Array.from(
              { length: standingsData.entries.length },
              (_, index) => index + 1
            );

            return (
              <tr
                key={entryIndex}
                onClick={() =>
                  navigate(
                    `/teams/${paramsNation}.${paramsDivision}/${entry.team.id}`
                  )
                }
                className="cursor-pointer hover:bg-base-300"
              >
                <td className="font-bold">{rankArray[entryIndex]}</td>

                {/* 팀 네임 */}
                {entry.team && (
                  <td className="flex items-center px-3">
                    {entry.team.logos ? (
                      <img
                        src={entry.team.logos[0].href}
                        alt={entry.team.name}
                        title={entry.team.name}
                        className="h-7 mr-2"
                      />
                    ) : (
                      <i className="text-[28px] mr-2">
                        <FaRegQuestionCircle />
                      </i>
                    )}
                    {entry.team.name}
                  </td>
                )}

                {/* 팀 스탯 */}
                {entry.stats && (
                  <>
                    {statsOrderArray.map((statName, index) => {
                      const stat = entry.stats.find(
                        (stat) => stat.name === statName
                      );

                      return stat && <td key={index}>{stat.value}</td>;
                    })}
                  </>
                )}

                {/* 노트 */}
                {entry.note ? (
                  <td
                    style={{ backgroundColor: `${entry.note.color}` }}
                    className="text-[#282828]"
                  >
                    {entry.note.description}
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
);

export default StandingsTable;
