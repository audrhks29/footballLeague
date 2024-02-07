import { memo, useCallback, useState } from 'react';

import { FaRegQuestionCircle } from 'react-icons/fa';

import useTeamDataStore from '../../../../store/teamData-store';

const NextEvent = memo(() => {
  const { teamData } = useTeamDataStore();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => setHoveredIndex(index), [])

  const handleMouseLeave = useCallback(() => setHoveredIndex(null), [])
  return (
    <div className='w-64 rounded-t-lg pb-5'>

      <div
        className='p-2 rounded-t-lg'
        style={{
          background: `linear-gradient(to bottom right, #${teamData && teamData.color}, #${teamData && teamData.alternateColor})`
        }}
      >
        <h2 className='text-[20px] text-center text-white text-bold'>Next Match</h2>
      </div>

      <ul>
        {teamData && teamData.nextEvent.map((item, index) => {
          const homeTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "home");
          const awayTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "away");

          const date = new Date(item.date);
          const options: DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
          const outputDateString = date.toLocaleDateString('en-US', options);
          const outputTime = item.date.substr(11, 5);

          const isHovered = index === hoveredIndex;

          return (
            <li key={index}
              className='border cursor-pointer'
              style={{
                background: isHovered
                  ? `linear-gradient(to bottom right, #${teamData?.color}, #${teamData?.alternateColor})`
                  : "",
                color: isHovered ? "white" : "black",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className='text-[18px] text-center p-2 font-bold'>{outputDateString}</div>
              <div className='flex items-center justify-center p-2'>
                <span className='font-bold mr-2'>{homeTeamData?.team.abbreviation}</span>
                {homeTeamData?.team.logos
                  ? <img src={homeTeamData?.team.logos[0].href} className='h-8 mr-1' />
                  : <i className='text-[32px] mr-1'><FaRegQuestionCircle /></i>}
                <div
                  className='p-1 text-bold'
                  style={{
                    border: isHovered ? '' : '1px solid',
                    background: isHovered ? 'white' : 'black',
                    color: isHovered ? "black" : "white"
                  }}
                >
                  <span>{outputTime}</span>
                </div>
                {awayTeamData?.team.logos
                  ? <img src={awayTeamData?.team.logos[0].href} className='h-8 ml-1' />
                  : <i className='text-[32px] ml-1'><FaRegQuestionCircle /></i>}
                <span className='font-bold ml-2'>{awayTeamData?.team.abbreviation}</span>
              </div>
            </li>
          )
        })}
      </ul>

    </div>
  );
});

export default NextEvent;