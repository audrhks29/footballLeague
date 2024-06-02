import { memo } from "react";

import TeamList from "../components/teams/teamInfo/TeamList";
import { leagueSelectArray } from "@/assets/ArrayData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";

const Teams = memo(() => {
  const navigate = useNavigate();
  const { slugId } = useParams();

  const paramsNation = slugId?.slice(0, 3);
  const paramsDivision = slugId?.slice(4, 5);

  const nation = leagueSelectArray.find((item) => item.value == paramsNation);
  const division = nation?.league.find(
    (item) => item.division === paramsDivision
  );

  const changeNation = (nation: string) => {
    navigate(`/teams/${nation}.1`);
  };

  const changeDivision = (division: string) => {
    navigate(`/teams/${paramsNation}.${division}`);
  };

  return (
    <div className="inner">
      <div className="flex gap-2">
        {/* 국가 선택 */}
        <Select value={nation?.value} onValueChange={changeNation}>
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {leagueSelectArray.map((item, idx) => (
              <SelectItem key={idx} value={item.value}>
                {item.nation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 리그 선택 */}
        <Select value={division?.division} onValueChange={changeDivision}>
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {leagueSelectArray.map((item) => {
              if (item.value === paramsNation) {
                return item.league.map((league, idx) => (
                  <SelectItem key={idx} value={league.division}>
                    {league.name}
                  </SelectItem>
                ));
              }
            })}
          </SelectContent>
        </Select>
      </div>

      <TeamList />
    </div>
  );
});

export default Teams;
