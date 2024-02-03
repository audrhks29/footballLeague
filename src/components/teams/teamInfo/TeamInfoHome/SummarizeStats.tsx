import { memo } from 'react';

import { Link } from 'react-router-dom';

import useTeamDataStore from '../../../../store/teamData-store';

const SummarizeStats = memo(() => {
  const { teamData } = useTeamDataStore()

  const statList = ["rank", "gamesPlayed", "wins", "ties", "losses", "points",]

  return (
    <div className='pb-5'>

      <ul className='w-full flex justify-around'>
        <li className='p-2 w-40 flex justify-center items-center h-20 border rounded-2xl'>
          {teamData && <img src={teamData.defaultLeague.logos[0].href} alt="" className='w-16' />}
        </li>
        {/* {data.standingSummary} */}
        {teamData && teamData.record.items.map((item) => (
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
            return null;
          })
        ))}
      </ul>

      <div className='text-right'>
        <Link to={"/standings"} className='cursor-pointer'>more +</Link>
      </div>

    </div>
  );
});

export default SummarizeStats;