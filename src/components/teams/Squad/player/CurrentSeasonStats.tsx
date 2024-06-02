import { memo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import axios from 'axios';

interface Props {
  fetchUrl: string;
}

const CurrentSeasonStats = memo((props: Props) => {
  const fetchStatsData = async () => {
    const url = props.fetchUrl
    try {
      const response = await axios.get(url);
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const { data: playerStatsData }: { data: Statistics }
    = useSuspenseQuery({
      queryKey: ['playerStatsData', props.fetchUrl],
      queryFn: () => fetchStatsData()
    });

  const playerGeneralStats = playerStatsData.splits.categories.find(item => item.name === "general")
  const playerOffensiveStats = playerStatsData.splits.categories.find(item => item.name === "offensive")

  const thisSeasonStats = [
    { id: 1, name: "APP", value: playerGeneralStats?.stats.find(item => item.name === "appearances")?.value },
    { id: 2, name: "G", value: playerOffensiveStats?.stats.find(item => item.name === "totalGoals")?.value },
    { id: 3, name: "A", value: playerOffensiveStats?.stats.find(item => item.name === "goalAssists")?.value },
    { id: 4, name: "T", value: playerGeneralStats?.stats.find(item => item.name === "minutes")?.value },
  ]

  return (
    <div className='w-[400px] border border-white rounded-2xl ml-auto'>
      <p className='text-center text-[20px] py-3 rounded-t-2xl'>Current Season</p>
      <ul className='flex justify-around p-3'>
        {props.fetchUrl && thisSeasonStats.map(item => (
          <li
            key={item.id}
            className='w-20 border text-center p-1'
          >
            <p className='text-[12px]'>{item.name}</p>
            <p className='text-[20px]'>{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default CurrentSeasonStats;