import { memo } from 'react';


import { FaRegQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props {
  paramsNation: string | undefined,
  paramsDivision: string | undefined,
  standingsData: StandingsDataType
}

const StandingsTable = memo(({ paramsNation, paramsDivision, standingsData }: Props) => {
  const navigate = useNavigate()

  const thArray = ["Rank", "Team Name", "P", "GP", "W", "D", "L", "GD", "NOTE"]

  const goToTeamInfoPage = (teamId: string) => {
    navigate(`/teams/${paramsNation}.${paramsDivision}/${teamId}`)
  }

  return (
    <table className='text-center m-auto'>
      <colgroup>
        <col width={70} />
        <col width={300} />
        <col width={60} />
        <col width={60} />
        <col width={60} />
        <col width={60} />
        <col width={60} />
        <col width={60} />
        <col width={300} />
      </colgroup>
      <thead>
        <tr>
          {thArray.map((item, index) => (
            <th key={index} className='p-2 border-y border-black'>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          standingsData.entries.map((entry: Entries, entryIndex: number) => {
            const rankArray = Array.from({ length: standingsData.entries.length }, (_, index) => index + 1);
            const statsOrderArray = ["points", "gamesPlayed", "wins", "ties", "losses", "pointDifferential", "note"];

            return (
              <tr key={entryIndex} className='border-b h-9 cursor-pointer hover:bg-slate-300' onClick={() => goToTeamInfoPage(entry.team.id)}>
                <td className='font-bold'>{rankArray[entryIndex]}</td>
                {entry.team &&
                  <td className='flex items-center px-3 h-9'>
                    {entry.team.logos ?
                      <img src={entry.team.logos[0].href} alt={entry.team.name} title={entry.team.name} className='h-7 mr-2' />
                      : <i className='text-[28px] mr-2'><FaRegQuestionCircle /></i>}
                    {entry.team.name}
                  </td>}
                {entry.stats && (
                  <>
                    {statsOrderArray.map((statName, index) => {
                      const stat = entry.stats.find(stat => stat.name === statName);

                      return (
                        stat && (
                          <td key={index}>
                            {stat.value}
                          </td>
                        )
                      );
                    })}
                  </>
                )}
                {entry.note && <td style={{ backgroundColor: `${entry.note.color}` }}>{entry.note.description}</td>}
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
});

export default StandingsTable;