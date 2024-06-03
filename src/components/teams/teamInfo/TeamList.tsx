import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchTeamsData } from "@/server/fetchData";
import { FaRegQuestionCircle } from "react-icons/fa";

import { Card, CardDescription } from "@/components/ui/card";

const TeamList = memo(() => {
  const { slugId } = useParams();
  const navigate = useNavigate();
  const { data: teamsData } = useSuspenseQuery({
    queryKey: ["teamsData", slugId],
    queryFn: () => fetchTeamsData(slugId ? slugId : "eng.1"),
  });

  const handleClickTeam = (item: Teams) => {
    navigate(`/teams/${slugId}/${item.team.id}`);
  };

  return (
    <>
      <h2 className="text-[30px] p-5">{teamsData && teamsData.name}</h2>

      <div className="grid grid-cols-5 gap-2">
        {teamsData.teams.map((item: Teams, index: number) => {
          const teamLogos = item.team.logos[0];

          return (
            <Card
              key={index}
              className="w-auto items-center flex flex-col p-3 cursor-pointer hover:bg-muted"
              onClick={() => handleClickTeam(item)}
            >
              {teamLogos ? (
                <img
                  src={teamLogos.href}
                  alt={item.team.displayName}
                  title={item.team.displayName}
                  className="w-24 mb-3"
                />
              ) : (
                <i className="text-[96px] mr-2 mb-3">
                  <FaRegQuestionCircle />
                </i>
              )}
              <CardDescription className="text-base font-semibold text-primary">
                {item.team.name}
              </CardDescription>
            </Card>
          );
        })}
      </div>
    </>
  );
});

export default TeamList;
