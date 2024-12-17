import { memo } from "react";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

import { FaRegQuestionCircle } from "react-icons/fa";

import dateFormat from "@/utils/dateFormat";

interface Props {
  fetchUrl: string;
}
const NextMatch = memo((props: Props) => {
  const fetchNextEventDatas = async () => {
    const url = props.fetchUrl;
    const response = await axios.get(url);
    return response.data;
  };

  const { data: nextEventDatas } = useSuspenseQuery({
    queryKey: ["nextEventDatas", props.fetchUrl],
    queryFn: () => fetchNextEventDatas(),
    select: (data) => data.items[0],
  });

  const fetchNextEventData = async () => {
    const url = nextEventDatas.$ref;
    const response = await axios.get(url);
    return response.data;
  };

  const { data: nextEventData } = useSuspenseQuery({
    queryKey: ["nextEventData", props.fetchUrl],
    queryFn: () => fetchNextEventData(),
  });

  const teamData = nextEventData.competitions[0];
  const homeTeamData: {
    homeAway: string;
    team: {
      $ref: string;
    };
  } = teamData.competitors.find(
    (item: { homeAway: string }) => item.homeAway === "home"
  );

  const awayTeamData = teamData.competitors.find(
    (item: { homeAway: string }) => item.homeAway === "away"
  );

  const fetchTeamData = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  const [{ data: fetchedHomeTeamData }, { data: fetchedAwayTeamData }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: ["homeTeamData", props.fetchUrl],
          queryFn: () => fetchTeamData(homeTeamData.team.$ref),
        },
        {
          queryKey: ["awayTeamData", props.fetchUrl],
          queryFn: () => fetchTeamData(awayTeamData.team.$ref),
        },
      ],
    });
  // console.log(teamData);
  const homeTeamLogo = fetchedHomeTeamData.logos[1]
    ? fetchedHomeTeamData.logos[1]
    : fetchedHomeTeamData.logos;
  const awayTeamLogo = fetchedAwayTeamData.logos[1]
    ? fetchedAwayTeamData.logos[1]
    : fetchedHomeTeamData.logos;

  return (
    <section className="card">
      <div className="card-body">
        <div className="card-title">
          <h3>Next Match</h3>
        </div>
        <p className="text-center h-9 leading-9">{dateFormat(teamData.date)}</p>
        <div className="flex items-center w-4/5 m-auto">
          <div className="flex items-center justify-center w-1/2">
            <span className="mr-2">{fetchedHomeTeamData.displayName}</span>
            {homeTeamLogo ? (
              <img src={homeTeamLogo.href} className="w-9 h-9 mr-4" />
            ) : (
              <i className="text-[24px] mr-4">
                <FaRegQuestionCircle />
              </i>
            )}
          </div>
          <span>|</span>
          <div className="flex items-center justify-center w-1/2">
            {awayTeamLogo ? (
              <img src={awayTeamLogo.href} className="w-9 h-9 ml-4" />
            ) : (
              <i className="text-[24px] ml-4">
                <FaRegQuestionCircle />
              </i>
            )}
            <span className="ml-2">{fetchedAwayTeamData.displayName}</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default NextMatch;
