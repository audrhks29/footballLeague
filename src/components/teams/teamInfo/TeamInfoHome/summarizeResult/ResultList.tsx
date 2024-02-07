import { memo, useCallback, useState } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: ResultType,
  index: number,
  matchDivision: string | undefined,
  teamData: TeamInfoType | null
}

const ResultList = memo(({ item, index, matchDivision, teamData }: Props) => {
  const navigate = useNavigate()

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => setHoveredIndex(index), [])

  const handleMouseLeave = useCallback(() => setHoveredIndex(null), [])

  const goToMatchIdPage = (gameId: string) => navigate(`/match/${matchDivision}/${gameId}`)

  const isHovered = index === hoveredIndex;

  const matchInfo = item.competitions[0]
  const homeTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "home");
  const awayTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "away");

  const date = new Date(matchInfo.date);
  const options: DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const outputDateString = date.toLocaleDateString('en-US', options)
  return (

    <li
      key={index}
      className='border cursor-pointer'
      onClick={() => goToMatchIdPage(item.id)}
      style={{
        background: isHovered
          ? `linear-gradient(to bottom right, #${teamData?.color}, #${teamData?.alternateColor})`
          : "",
        color: isHovered ? "white" : "black"
      }}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      <div className='text-[18px] text-center p-2 font-bold'>{outputDateString}</div>
      <div className='flex items-center justify-center p-2'>
        <span className='font-bold mr-2'>{homeTeamData?.team.abbreviation}</span>
        {homeTeamData?.team.logo
          ? <img src={homeTeamData?.team.logo} className='h-8 mr-1' />
          : <i className='text-[32px] mr-1'><FaRegQuestionCircle /></i>}
        <div
          className='p-1 text-bold'
          style={{
            border: isHovered ? '' : '1px solid',
            background: isHovered ? 'white' : 'black',
            color: isHovered ? "black" : "white"
          }}
        >
          <span>{homeTeamData?.score} - {awayTeamData?.score}</span>
        </div>
        {awayTeamData?.team.logo
          ? <img src={awayTeamData?.team.logo} className='h-8 ml-1' />
          : <i className='text-[32px] mr-1'><FaRegQuestionCircle /></i>}
        <span className='font-bold ml-2'>{awayTeamData?.team.abbreviation}</span>
      </div>
    </li>
  )
});

export default ResultList;