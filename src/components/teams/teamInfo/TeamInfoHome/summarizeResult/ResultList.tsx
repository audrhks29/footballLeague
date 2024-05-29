import { Card } from "@/components/ui/card";
import { memo } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  item: ResultType;
  index: number;
  matchDivision: string | undefined;
  teamData: TeamInfoType | null;
}

const ResultList = memo(({ item, index, matchDivision }: Props) => {
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
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const outputDateString = date.toLocaleDateString("en-US", options);
  return (
    <Card
      key={index}
      className="cursor-pointer w-1/5 hover:bg-muted"
      onClick={() => goToMatchIdPage(item.id)}
    >
      <div className="text-[18px] text-center p-2 font-bold">
        {outputDateString}
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
    </Card>
  );
});

export default ResultList;
