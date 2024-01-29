import { memo } from 'react';

interface Props {
  data: MatchResultType;
}

const MatchResultTable = memo(({ data }: Props) => {

  // homeTeam, awayTeam Stat
  const teamStatTableData: {
    name: string;
    homeTeamValue: string;
    label: string;
    awayTeamValue?: string;
  }[] = [];

  data && data.boxscore.teams[0].statistics.forEach(stat => {
    teamStatTableData.push({
      name: stat.name,
      homeTeamValue: stat.displayValue,
      label: stat.label
    })
  });

  data && data.boxscore.teams[1].statistics.forEach((stat, index) => {
    teamStatTableData[index]['awayTeamValue'] = stat.displayValue;
  });
  // ----------------------------
  return (
    <table className='m-auto'>
      <thead>
        <tr>
          <th className='flex flex-col items-center justify-around h-20'>
            <img
              src={data.boxscore.teams[0].team.logo}
              alt={data.boxscore.teams[0].team.shortDisplayName}
              title={data.boxscore.teams[0].team.displayName}
              className='w-10'
            />
            <span>{data.boxscore.teams[0].team.displayName}</span>
          </th>
          <th className='text-[16px]'>
            <div className='border border-black py-2'>
              {data.header.competitions[0].competitors[0].score} : {data.header.competitions[0].competitors[1].score}
            </div>
          </th>
          <th className='flex flex-col items-center justify-around h-20'>
            <img
              src={data.boxscore.teams[1].team.logo}
              alt={data.boxscore.teams[1].team.shortDisplayName}
              title={data.boxscore.teams[1].team.displayName}
              className='w-10'
            />
            {data.boxscore.teams[1].team.displayName}
          </th>
        </tr>
      </thead>
      <tbody>
        {teamStatTableData.map((item, index) => {
          if (item.label.includes("%")) {
            return
          }
          else {
            return (
              <tr key={index} className='h-6'>
                <td className='w-52 text-right px-4'>{item.homeTeamValue}</td>
                <td className='px-4 w-40 text-center'>{item.label}</td>
                <td className='w-52 text-left px-4'>{item.awayTeamValue}</td>
              </tr>
            )
          }
        })}
      </tbody>
    </table>
  );
});

export default MatchResultTable;