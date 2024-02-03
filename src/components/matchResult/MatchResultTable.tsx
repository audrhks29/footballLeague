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

  data.boxscore.teams[0].statistics && data.boxscore.teams[0].statistics.forEach(stat => {
    teamStatTableData.push({
      name: stat.name,
      homeTeamValue: stat.displayValue,
      label: stat.label
    })
  });

  data.boxscore.teams[1].statistics && data.boxscore.teams[1].statistics.forEach((stat, index) => {
    teamStatTableData[index]['awayTeamValue'] = stat.displayValue;
  });
  // ----------------------------
  return (
    <table className='m-auto'>
      <colgroup>
        <col width={120} />
        <col width={180} />
        <col width={120} />
      </colgroup>

      <tbody>
        {teamStatTableData.map((item, index) => {
          if (item.label.includes("%")) {
            return
          }
          else {
            return (
              <tr key={index} className='h-6'>
                <td className='text-right'>{item.homeTeamValue}</td>
                <td className='text-center'>{item.label}</td>
                <td className='text-left'>{item.awayTeamValue}</td>
              </tr>
            )
          }
        })}
      </tbody>
    </table>
  );
});

export default MatchResultTable;