import { memo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

const CurrentSeasonStats = memo(({ fetchUrl }: { fetchUrl: string }) => {
  const fetchStatsData = async () => {
    const url = fetchUrl;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: playerStatsData }: { data: Statistics } = useSuspenseQuery({
    queryKey: ["playerStatsData", fetchUrl],
    queryFn: () => fetchStatsData(),
  });

  const playerGeneralStats = playerStatsData.splits.categories.find(
    (item) => item.name === "general"
  );
  const playerOffensiveStats = playerStatsData.splits.categories.find(
    (item) => item.name === "offensive"
  );

  const thisSeasonStats = [
    {
      id: 1,
      name: "APP",
      value: playerGeneralStats?.stats.find(
        (item) => item.name === "appearances"
      )?.value,
    },
    {
      id: 2,
      name: "G",
      value: playerOffensiveStats?.stats.find(
        (item) => item.name === "totalGoals"
      )?.value,
    },
    {
      id: 3,
      name: "A",
      value: playerOffensiveStats?.stats.find(
        (item) => item.name === "goalAssists"
      )?.value,
    },
    {
      id: 4,
      name: "T",
      value: playerGeneralStats?.stats.find((item) => item.name === "minutes")
        ?.value,
    },
  ];

  return (
    <div className="card w-[400px] border ml-auto">
      <p className="card-title justify-center py-2">Current Season</p>

      <div className="divider m-0 h-0"></div>

      <ul className="p-2">
        {fetchUrl &&
          thisSeasonStats.map((item, index) => (
            <li
              key={item.id}
              className={`${
                index === thisSeasonStats.length - 1
                  ? `border-none`
                  : `border-r`
              } stat w-1/4`}
            >
              <p className="stat-title">{item.name}</p>
              <p className="stat-value text-right text-[24px]">{item.value}</p>
            </li>
          ))}
      </ul>
    </div>
  );
});

export default CurrentSeasonStats;
