import { memo } from "react";
import { useNavigate } from "react-router-dom";

import dateFormat from "@/utils/dateFormat";

const ResultList = memo(
  ({
    item,
    index,
    matchDivision,
    round,
  }: {
    item: ResultType;
    index: number;
    matchDivision: string | undefined;
    round: number;
  }) => {
    const navigate = useNavigate();

    const matchInfo = item.competitions[0];
    const homeTeamData = item.competitions[0].competitors[1];
    const awayTeamData = item.competitions[0].competitors[1];

    return (
      <tr
        key={index}
        className="cursor-pointer p-1 hover:bg-base-300 py-3"
        onClick={() => navigate(`/match/${matchDivision}/${item.id}`)}
      >
        <td className="text-[16px] font-bold">{round}R</td>

        <td className="text-[16px]">{dateFormat(matchInfo.date)}</td>

        {/* 스코어 */}
        <td className="flex items-center">
          <span className="font-bold mr-2">
            {homeTeamData?.team.abbreviation}
          </span>
          <img src={homeTeamData?.team.logo} className="h-8 mr-2" />
          <div className="p-1 text-bold">
            <span>
              {homeTeamData?.score} - {awayTeamData?.score}
            </span>
          </div>
          <img src={awayTeamData?.team.logo} className="h-8 ml-2" />
          <span className="font-bold ml-2">
            {awayTeamData?.team.abbreviation}
          </span>
        </td>

        {/* 경기장 */}
        <td className="w-96 font-bold">
          {matchInfo.venue && <span>{matchInfo.venue.fullName}</span>}
        </td>

        {/* 시즌 */}
        <td className="text-[14px] font-medium">{item.season.slug}</td>
      </tr>
    );
  }
);

export default ResultList;
