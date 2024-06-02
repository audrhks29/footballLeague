import { CardContent } from "@/components/ui/card";
import { memo } from "react";

import { MdArrowForwardIos } from "react-icons/md";

import { useNavigate } from "react-router-dom";

interface Props {
  item: ResultType;
  index: number;
  matchDivision: string | undefined;
  round: number;
}

const ResultList = memo(({ item, index, matchDivision, round }: Props) => {
  const navigate = useNavigate();

  const goToMatchIdPage = (gameId: string) =>
    navigate(`/match/${matchDivision}/${gameId}`);

  const matchInfo = item.competitions[0];

  const homeTeamData = item.competitions[0].competitors.find(
    (competitor) => competitor.homeAway === "home"
  );
  const awayTeamData = item.competitions[0].competitors.find(
    (competitor) => competitor.homeAway === "away"
  );

  const date = new Date(matchInfo.date);
  const options: DateTimeFormatOptions = {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const outputDateString = date.toLocaleDateString("en-US", options);

  return (
    <CardContent
      key={index}
      className="cursor-pointer p-1 hover:bg-muted"
      onClick={() => goToMatchIdPage(item.id)}
    >
      <div className="text-[16px] p-2 font-bold flex justify-between">
        <span>{outputDateString}</span>
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
    </CardContent>
  );
});

export default ResultList;
