import { memo, useCallback, useState } from 'react';

import { MdArrowForwardIos } from 'react-icons/md';

import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  item: ResultType, index: number, matchDivision: string | undefined, round: number
}

const ResultList = memo(({ item, index, matchDivision, round }: Props) => {
  const { teamId } = useParams()

  const navigate = useNavigate()

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => setHoveredIndex(index), [])

  const handleMouseLeave = useCallback(() => setHoveredIndex(null), [])

  const goToMatchIdPage = (gameId: string) => navigate(`/match/${matchDivision}/${gameId}`)

  const isHovered = index === hoveredIndex;

  const matchInfo = item.competitions[0];

  const matchTeamId = item.competitions[0].competitors.find(competitor => competitor.id === teamId);

  const homeTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "home");
  const awayTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "away");

  const date = new Date(matchInfo.date);
  const options: DateTimeFormatOptions = { year: 'numeric', weekday: 'long', month: 'long', day: 'numeric' };
  const outputDateString = date.toLocaleDateString('en-US', options);

  return (
    <li
      key={index}
      className='border-b hover:bg-slate-300 cursor-pointer p-1'
      onClick={() => goToMatchIdPage(item.id)}
      style={{
        background: isHovered
          ? `linear-gradient(to bottom right, #${matchTeamId?.team.color}, #${matchTeamId?.team.alternateColor})`
          : "",
        color: isHovered ? "white" : "black"
      }}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      <div className='text-[16px] p-2 font-bold flex justify-between'>
        <span>{outputDateString}</span>
        <span className='text-[14px] font-medium'>{item.season.slug}</span>
      </div>
      <div className='flex items-center p-2 justify-between'>
        <span className='text-[16px] font-bold'>{round}R</span>
        <div className='flex items-center '>
          <span className='font-bold mr-2'>{homeTeamData?.team.abbreviation}</span>
          <img src={homeTeamData?.team.logo} className='h-8 mr-2' />
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
          <img src={awayTeamData?.team.logo} className='h-8 ml-2' />
          <span className='font-bold ml-2'>{awayTeamData?.team.abbreviation}</span>
        </div>
        <div className='w-96 font-bold'>
          {matchInfo.venue && <span>{matchInfo.venue.fullName}</span>}
        </div>
        <div className='w-10'>
          <i><MdArrowForwardIos /></i>
        </div>
      </div>
    </li>
  );
});

export default ResultList;