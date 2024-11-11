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
import getCurrentYear from "@/utils/getCurrentDate";

interface Props {
  paramsNation: string | undefined;
  paramsDivision: string | undefined;
}

const DivisionSelectBox = memo((props: Props) => {
  const currentYear = getCurrentYear();
  const navigate = useNavigate();

  const nation = leagueSelectArray.find(
    (item) => item.value == props.paramsNation
  );
  const division = nation?.league.find(
    (item) => item.division === props.paramsDivision
  );

  const changeDivision = (division: string) => {
    navigate(`/standings/${props.paramsNation}.${division}/${currentYear}`);
  };

  return (
    <Select onValueChange={changeDivision} value={division?.division}>
      <SelectTrigger className="w-[220px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {leagueSelectArray.map((item) => {
          if (item.value === props.paramsNation) {
            return item.league.map((league, idx) => (
              <SelectItem key={idx} value={league.division}>
                {league.name}
              </SelectItem>
            ));
          }
        })}
      </SelectContent>
    </Select>
  );
});

export default DivisionSelectBox;
