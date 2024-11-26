import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegQuestionCircle } from "react-icons/fa";

import dateFormat from "@/utils/dateFormat";

const ResultList = memo(
  ({
    item,
    index,
    matchDivision,
  }: {
    item: ResultType;
    index: number;
    matchDivision: string | undefined;
    teamData: TeamInfoType | null;
  }) => {
    const navigate = useNavigate();

    const matchInfo = item.competitions[0];
    const homeTeamData = item.competitions[0].competitors[0];
    const awayTeamData = item.competitions[0].competitors[1];

    return (
      <li
        key={index}
        className="cursor-pointer hover:bg-base-300 w-1/5 border"
        onClick={() => navigate(`/match/${matchDivision}/${item.id}`)}
      >
        <div className="text-center p-2 font-bold">
          {dateFormat(matchInfo.date)}
        </div>

        <div className="flex items-center justify-center p-2">
          <span className="font-bold mr-2">
            {homeTeamData?.team.abbreviation}
          </span>

          {homeTeamData?.team.logo ? (
            <img src={homeTeamData?.team.logo} className="h-8 mr-1" />
          ) : (
            <i className="text-[32px] mr-1">
              <FaRegQuestionCircle />
            </i>
          )}

          <div className="p-1 text-bold border">
            <span>
              {homeTeamData?.score} - {awayTeamData?.score}
            </span>
          </div>

          {awayTeamData?.team.logo ? (
            <img src={awayTeamData?.team.logo} className="h-8 ml-1" />
          ) : (
            <i className="text-[32px] mr-1">
              <FaRegQuestionCircle />
            </i>
          )}

          <span className="font-bold ml-2">
            {awayTeamData?.team.abbreviation}
          </span>
        </div>
      </li>
    );
  }
);

export default ResultList;
