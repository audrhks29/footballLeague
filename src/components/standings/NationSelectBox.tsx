import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { leagueSelectArray } from "../../assets/ArrayData";

import getCurrentYear from "@/utils/getCurrentDate";

const NationSelectBox = memo(
  ({ paramsNation }: { paramsNation: string | undefined }) => {
    const currentYear = getCurrentYear();
    const navigate = useNavigate();

    const nation = leagueSelectArray.find((item) => item.value == paramsNation);

    return (
      <select
        className="select select-bordered w-40"
        value={nation?.value}
        onChange={(e) => {
          navigate(`/standings/${e.target.value}.1/${currentYear}`);
        }}
      >
        {leagueSelectArray.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.nation}
          </option>
        ))}
      </select>
    );
  }
);

export default NationSelectBox;
