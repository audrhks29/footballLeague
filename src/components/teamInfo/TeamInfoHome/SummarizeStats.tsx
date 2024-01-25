import { memo } from 'react';

interface Props {
  data: TeamInfoType;
}

const SummarizeStats = memo(({ data }: Props) => {
  console.log(data);
  const statList = ["rank", "gamesPlayed", "wins", "ties", "losses", "points",]
  return (
    <div className='pb-5'>

      <ul className='w-full flex justify-around'>
        <li className='p-2 w-40 flex justify-center items-center h-20 border rounded-2xl'>
          <img src={data.defaultLeague.logos[0].href} alt="" className='w-16' />
        </li>
        {/* {data.standingSummary} */}
        {data.record.items.map((item) => (
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
        <span className='cursor-pointer'>more +</span>
      </div>

    </div>
  );
});

export default SummarizeStats;