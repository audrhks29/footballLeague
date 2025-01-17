import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchStandingSeasonData } from "@/services/fetchData";

import getCurrentYear from "@/utils/getCurrentDate";

const theadArray = ["Rank", "Name", "GP", "W", "D", "L", "P"];

const StandingSummary = memo(({ slugId }: { slugId: string }) => {
  const navigate = useNavigate();

  const currentYear = getCurrentYear();

  const { data: standingsData } = useSuspenseQuery({
    queryKey: ["standingData", slugId],
    queryFn: () => fetchStandingSeasonData(slugId, currentYear.toString()),
    select: (data: StandingSeasonDataTypes) =>
      data.children[0].standings.entries,
  });

  return (
    <section className="card border bg-base shadow-xl row-span-2">
      <div className="card-body">
        <h2 className="card-title flex justify-between">
          <span>Standings</span>
          <span
            onClick={() => navigate(`/standings/${slugId}/${currentYear}`)}
            className="link link-hover text-[12px] font-normal"
          >
            more +
          </span>
        </h2>

        <table className="table">
          <thead>
            <tr>
              {theadArray.map((thead, index) => (
                <td key={index} className="text-center">
                  {thead}
                </td>
              ))}
            </tr>
          </thead>

          <tbody className="text-center">
            {standingsData?.map((item, index) => (
              <tr
                key={index}
                onClick={() => navigate(`/teams/${slugId}/${item.team.id}`)}
                className="cursor-pointer hover:bg-base-300"
              >
                <td>
                  {item.stats.find((stat) => stat.name === "rank")?.value}
                </td>
                <td className="flex gap-3">
                  <img
                    src={item.team.logos[0].href}
                    alt={item.team.displayName}
                    width={20}
                    height={20}
                  />
                  <span>{item.team.abbreviation}</span>
                </td>
                <td>
                  {
                    item.stats.find((stat) => stat.name === "gamesPlayed")
                      ?.value
                  }
                </td>
                <td>
                  {item.stats.find((stat) => stat.name === "wins")?.value}
                </td>
                <td>
                  {item.stats.find((stat) => stat.name === "ties")?.value}
                </td>
                <td>
                  {item.stats.find((stat) => stat.name === "losses")?.value}
                </td>
                <td>
                  {item.stats.find((stat) => stat.name === "points")?.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
});

export default StandingSummary;
