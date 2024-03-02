import { memo } from 'react';

import { FaRegQuestionCircle } from 'react-icons/fa';

import useTeamDataStore from '../../../../store/teamData-store';

const NextEvent = memo(() => {
  const { teamData } = useTeamDataStore();

  return (
    <div className='w-full rounded-t-lg bg-[#282828]'>

      <div className='p-2 rounded-t-lg border'>
        <h2 className='text-[20px] text-center text-white text-bold'>Next Match</h2>
      </div>

      <ul>
        {teamData && teamData.nextEvent.length > 0 ? teamData.nextEvent.map((item, index) => {
          const homeTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "home");
          const awayTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "away");

          const date = new Date(item.date);
          const options: DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
          const outputDateString = date.toLocaleDateString('en-US', options);
          const outputTime = item.date.substr(11, 5);

          return (
            <li key={index} className='border cursor-pointer hover:bg-hoverColor'            >

              <div className='text-[18px] text-center p-2 font-bold'>{outputDateString}</div>

              <div className='flex items-center justify-center p-2'>
                <span className='font-bold mr-2'>{homeTeamData?.team.abbreviation}</span>

                {homeTeamData?.team.logos
                  ? <img src={homeTeamData?.team.logos[0].href} className='h-8 mr-1' />
                  : <i className='text-[32px] mr-1'><FaRegQuestionCircle /></i>}

                <div className='p-1 text-bold border'>
                  <span>{outputTime}</span>
                </div>

                {awayTeamData?.team.logos
                  ? <img src={awayTeamData?.team.logos[0].href} className='h-8 ml-1' />
                  : <i className='text-[32px] ml-1'><FaRegQuestionCircle /></i>}

                <span className='font-bold ml-2'>{awayTeamData?.team.abbreviation}</span>
              </div>
            </li>
          )
        }) : <li className='text-[18px] text-center p-2 font-bold border'>There is no information on the Next Match</li>}
      </ul>

    </div>
  );
});

export default NextEvent;