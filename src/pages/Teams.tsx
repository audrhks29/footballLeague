import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TeamList from "../components/teams/teamInfo/TeamList";

import { leagueSelectArray } from "@/assets/ArrayData";

const Teams = memo(() => {
  const navigate = useNavigate();
  const { slugId } = useParams();
  // console.log(slugId);
  const paramsNation = slugId?.slice(0, 3);
  const paramsDivision = slugId?.slice(4, 5);
  const divisionArray =
    paramsNation &&
    leagueSelectArray.find((a) => a.value.includes(paramsNation));
  console.log(paramsNation);

  // console.log(division);
  return (
    <div className="inner">
      <div className="flex gap-2">
        <select
          className="select select-bordered w-[200px] max-w-xs"
          onChange={(e) => navigate(`/teams/${e.target.value}.1`)}
        >
          {leagueSelectArray.map((item, idx) => (
            <option
              key={idx}
              value={item.value}
              selected={item.value === paramsNation}
            >
              {item.nation}
            </option>
          ))}
        </select>

        {/* 리그 선택 */}
        <select
          className="select select-bordered w-[200px] max-w-xs"
          onChange={(e) => navigate(`/teams/${paramsNation}.${e.target.value}`)}
        >
          {divisionArray !== "" &&
            divisionArray?.league.map((item) => (
              <option
                key={item.id}
                value={item.division}
                selected={item.division === paramsDivision}
              >
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <TeamList />
    </div>
  );
});

export default Teams;
