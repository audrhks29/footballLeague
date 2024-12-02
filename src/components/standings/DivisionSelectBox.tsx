import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { leagueSelectArray } from "../../assets/ArrayData";

import getCurrentYear from "@/utils/getCurrentDate";

const DivisionSelectBox = memo(
  ({
    paramsNation,
    paramsDivision,
  }: {
    paramsNation: string | undefined;
    paramsDivision: string | undefined;
  }) => {
    const currentYear = getCurrentYear();
    const navigate = useNavigate();

    const nation = leagueSelectArray.find((item) => item.value == paramsNation);
    const division = nation?.league.find(
      (item) => item.division === paramsDivision
    );

    return (
      <select
        className="select select-bordered w-40"
        onChange={(e) => {
          navigate(
            `/standings/${paramsNation}.${e.target.value}/${currentYear}`
          );
        }}
        value={division?.division}
      >
        {leagueSelectArray.map((item) => {
          if (item.value === paramsNation) {
            return item.league.map((league, idx) => (
              <option key={idx} value={league.division}>
                {league.name}
              </option>
            ));
          }
        })}
      </select>
    );
  }
);

export default DivisionSelectBox;
