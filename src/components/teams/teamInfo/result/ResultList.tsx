import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
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
    const homeTeamData = item.competitions[0].competitors[0];
    const awayTeamData = item.competitions[0].competitors[1];

    return (
      <li
        key={index}
        className="cursor-pointer p-1 hover:bg-base-300 border-b py-3"
        onClick={() => navigate(`/match/${matchDivision}/${item.id}`)}
      >
        <div className="text-[16px] p-2 font-bold flex justify-between">
          <span>{dateFormat(matchInfo.date)}</span>
          <span className="text-[14px] font-medium">{item.season.slug}</span>
        </div>

        <div className="flex items-center p-2 justify-between">
          <span className="text-[16px] font-bold">{round}R</span>

          {/* 스코어 */}
          <div className="flex items-center">
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
          </div>

          {/* 경기장 */}
          <div className="w-96 font-bold">
            {matchInfo.venue && <span>{matchInfo.venue.fullName}</span>}
          </div>

          <div className="w-10">
            <i>
              <MdArrowForwardIos />
            </i>
          </div>
        </div>
      </li>
    );
  }
);

export default ResultList;
