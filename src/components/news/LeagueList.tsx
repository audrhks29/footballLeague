import { memo } from "react";
import { useParams } from "react-router-dom";

import { leagueSelectArray } from "../../assets/ArrayData";

const LeagueList = memo(() => {
  const { slugId } = useParams();

  return (
    <ul className="menu bg-base-200 rounded-box w-[250px] row-span-2">
      {leagueSelectArray.map((nation) => (
        <li key={nation.id}>
          <a className="font-bold">{nation.nation}</a>
          <ul>
            {nation.league.map((league) => (
              <li key={league.name}>
                <a
                  href={`/news/${nation.value}.${league.division}/page=1`}
                  className={`${
                    slugId === `${nation.value}.${league.division}`
                      ? "active"
                      : ""
                  }`}
                >
                  {league.name}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
});

export default LeagueList;
