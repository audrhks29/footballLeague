import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { leagueSelectArray } from "../../assets/ArrayData";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  paramsNation: string | undefined;
}

const NationSelectBox = memo((props: Props) => {
  const navigate = useNavigate();

  const nation = leagueSelectArray.find(
    (item) => item.value == props.paramsNation
  );

  const changeNation = (nation: string) => {
    navigate(`/standings/${nation}.1/2023`);
  };

  return (
    <Select onValueChange={changeNation} value={nation?.value}>
      <SelectTrigger className="w-[220px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {leagueSelectArray.map((item, idx) => {
          return (
            <SelectItem key={idx} value={item.value}>
              {item.nation}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
});

export default NationSelectBox;
