import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchTeamsData } from "@/services/fetchData";
import useThemeStore from "@/store/theme-store";

const TeamList = memo(() => {
  const { theme } = useThemeStore();
  const { slugId } = useParams();
  const navigate = useNavigate();

  const { data: teamsData } = useSuspenseQuery({
    queryKey: ["teamsData", slugId],
    queryFn: () => fetchTeamsData(slugId ? slugId : "eng.1"),
  });

  return (
    <article className="card">
      <div className="card-body">
        <div className="card-title">{teamsData && teamsData.name}</div>

        <ul className="grid grid-cols-5 gap-2">
          {teamsData.teams.map((item: Teams, index: number) => {
            const teamLogos =
              theme === "dark"
                ? item.team.logos[1]
                  ? item.team.logos[1]
                  : item.team.logos[0]
                : item.team.logos[0];

            return (
              <li
                key={index}
                className="w-auto items-center flex flex-col p-3 cursor-pointer hover:bg-base-300"
                onClick={() => navigate(`/teams/${slugId}/${item.team.id}`)}
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
                <span className="text-base font-semibold">
                  {item.team.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
});

export default TeamList;
