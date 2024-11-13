import { memo } from "react";

import { FaRegQuestionCircle } from "react-icons/fa";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchTeamData } from "@/services/fetchData";

const NextEvent = memo(() => {
  const { slugId, teamId } = useParams();

  const { data: teamData } = useSuspenseQuery({
    queryKey: ["teamData", slugId, teamId],
    queryFn: () => fetchTeamData(slugId, teamId),
  });

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>Next Match</CardTitle>
      </CardHeader>

      <div>
        {teamData && teamData.nextEvent.length > 0 ? (
          teamData.nextEvent.map((item: NextEvent, index: number) => {
            const homeTeamData = item.competitions[0].competitors.find(
              (competitor) => competitor.homeAway === "home"
            );
            const awayTeamData = item.competitions[0].competitors.find(
              (competitor) => competitor.homeAway === "away"
            );

            const date = new Date(item.date);
            const options: DateTimeFormatOptions = {
              weekday: "long",
              month: "long",
              day: "numeric",
            };
            const outputDateString = date.toLocaleDateString("en-US", options);
            const outputTime = item.date.substr(11, 5);

            return (
              <Card key={index}>
                <div className="text-[18px] text-center p-2 font-bold">
                  {outputDateString}
                </div>

                <div className="flex items-center justify-center p-2">
                  <span className="font-bold mr-2">
                    {homeTeamData?.team.abbreviation}
                  </span>

                  {homeTeamData?.team.logos ? (
                    <img
                      src={homeTeamData?.team.logos[0].href}
                      className="h-8 mr-1"
                    />
                  ) : (
                    <i className="text-[32px] mr-1">
                      <FaRegQuestionCircle />
                    </i>
                  )}

                  <div className="p-1 text-bold border">
                    <span>{outputTime}</span>
                  </div>

                  {awayTeamData?.team.logos ? (
                    <img
                      src={awayTeamData?.team.logos[0].href}
                      className="h-8 ml-1"
                    />
                  ) : (
                    <i className="text-[32px] ml-1">
                      <FaRegQuestionCircle />
                    </i>
                  )}

                  <span className="font-bold ml-2">
                    {awayTeamData?.team.abbreviation}
                  </span>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="text-[18px] text-center p-2 font-bold border">
            There is no information on the Next Match
          </Card>
        )}
      </div>
    </Card>
  );
});

export default NextEvent;
