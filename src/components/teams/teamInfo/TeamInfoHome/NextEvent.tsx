import { memo } from "react";

import { FaRegQuestionCircle } from "react-icons/fa";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchTeamData } from "@/services/fetchData";
import dateFormat from "@/utils/dateFormat";

const NextEvent = memo(() => {
  const { slugId, teamId } = useParams();

  const { data: teamData } = useSuspenseQuery({
    queryKey: ["teamData", slugId, teamId],
    queryFn: () => fetchTeamData(slugId, teamId),
  });

  return (
    <article className="w-full">
      <h2 className="text-[20px] font-semibold mb-2">Next Match</h2>

      <ul className="flex">
        {teamData && teamData.nextEvent.length > 0 ? (
          teamData.nextEvent.map((item: NextEvent, index: number) => {
            const homeTeamData = item.competitions[0].competitors[0];
            const awayTeamData = item.competitions[0].competitors[1];

            return (
              <li key={index}>
                <div className="text-[18px] text-center p-2 font-bold">
                  {dateFormat(item.date)}
                </div>

                <div className="flex items-center justify-center p-2">
                  <span className="font-bold mr-2">
                    {homeTeamData?.team.abbreviation}
                  </span>

                  {homeTeamData?.team.logos ? (
                    <img
                      src={homeTeamData?.team.logos[1].href}
                      className="h-8 mr-1"
                    />
                  ) : (
                    <i className="text-[32px] mr-1">
                      <FaRegQuestionCircle />
                    </i>
                  )}

                  <div className="p-1 text-bold border">
                    <span>{item.date.substr(11, 5)}</span>
                  </div>

                  {awayTeamData?.team.logos ? (
                    <img
                      src={awayTeamData?.team.logos[1].href}
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
              </li>
            );
          })
        ) : (
          <li className="text-[18px] text-center p-2 font-bold border">
            There is no information on the Next Match
          </li>
        )}
      </ul>
    </article>
  );
});

export default NextEvent;
