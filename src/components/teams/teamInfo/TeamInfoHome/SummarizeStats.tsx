import { memo } from 'react';

import { Link, useParams } from 'react-router-dom';

import useTeamDataStore from '../../../../store/teamData-store';
import { useSuspenseQuery } from '@tanstack/react-query';
import useStandingsDataStore from '../../../../store/standings-store';

const SummarizeStats = memo(() => {
  const { slugId, teamId } = useParams()
  const { fetchSummarizeStatsData } = useStandingsDataStore()
  const { teamData } = useTeamDataStore()

  const statList = ["rank", "gamesPlayed", "wins", "ties", "losses", "points",]

  const { data: summarizeStatsData }
    = useSuspenseQuery({
      queryKey: ['summarizeStatsData', slugId, teamId],
      queryFn: () => fetchSummarizeStatsData(slugId, teamId)
    });

  return (
    <div className='pb-5'>

      <ul className='w-full flex justify-around'>
        <li className='p-2 w-40 flex justify-center items-center h-20 border rounded-2xl'>
          {teamData && <img src={teamData.defaultLeague.logos[0].href} alt="" className='w-16' />}
        </li>

        {teamData && teamData.record.items && teamData.record.items.map((item) => (
          statList.map((statName, index) => {
            const stats = item.stats.find(stat => stat.name === statName);
            if (stats) {
              return (
                <li key={index} className='p-4 w-40 flex flex-col justify-between  border rounded-2xl'>
                  <p className='text-[16px]'>{stats.name}</p>
                  <p className='text-[20px] font-bold'>{stats.value}</p>
                </li>
              );
            }
          })
        ))}

        {/* record.items가 없을때 standingsData에서 가져와야함 */}
        {teamData && summarizeStatsData && !teamData.record.items && summarizeStatsData.stats.map(item => (
          statList.map((statName, index) => {
            const findArray = item.name === statName
            // const stats = item.stats.find(stat => stat.name === statName);
            if (findArray) {
              return (
                <li key={index} className='p-4 w-40 flex flex-col justify-between  border rounded-2xl'>
                  <p className='text-[16px]'>{item.name}</p>
                  <p className='text-[20px] font-bold'>{item.value}</p>
                </li>
              );
            }
          })
        ))}
      </ul>

      <div className='text-right'>
        <Link to={`/standings/${slugId}/2023`} className='cursor-pointer'>more +</Link>
      </div>

    </div>
  );
});

export default SummarizeStats;