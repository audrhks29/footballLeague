import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamList from "../components/teams/teamInfo/TeamList";
import { leagueSelectArray } from "@/assets/ArrayData";

const Teams = memo(() => {
  const navigate = useNavigate();
  const { slugId } = useParams();

  const paramsNation = slugId?.slice(0, 3) || leagueSelectArray[0].value;
  const paramsDivision = slugId?.slice(4, 5);

  const [defaultNation, setDefaultNation] = useState(paramsNation);
  const [defaultDivision, setDefaultDivision] = useState(
    paramsDivision ||
      leagueSelectArray.find((item) => item.value === paramsNation)?.league[0]
        .division
  );

  useEffect(() => {
    navigate(`/teams/${defaultNation}.${defaultDivision}`);
  }, [defaultNation, defaultDivision, navigate]);

  const currentLeague = leagueSelectArray.find(
    (item) => item.value === defaultNation
  );

  return (
    <div className="inner">
      <div className="flex gap-2">
        <select
          className="select select-bordered w-[200px] max-w-xs"
          onChange={(e) => {
            const newNation = e.target.value;
            const firstDivision = leagueSelectArray.find(
              (item) => item.value === newNation
            )?.league[0].division;

            setDefaultNation(newNation);
            setDefaultDivision(firstDivision);
          }}
          value={defaultNation}
        >
          {leagueSelectArray.map((item, idx) => (
            <option key={idx} value={item.value}>
              {item.nation}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-[200px] max-w-xs"
          onChange={(e) => {
            setDefaultDivision(e.target.value);
          }}
          value={defaultDivision}
        >
          {currentLeague?.league.map((item) => (
            <option key={item.id} value={item.division}>
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
