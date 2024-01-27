import { memo } from 'react';

interface Props {
  data: TeamInfoType;
}

const NextEvent = memo(({ data }: Props) => {
  return (
    <div className='w-60 rounded-t-lg pb-5'>

      <div
        className='p-2 rounded-t-lg'
        style={{
          background: `linear-gradient(to bottom right, #${data.color}, #${data.alternateColor})`
        }}
      >
        <h2 className='text-[20px] text-center text-white text-bold'>Next Match</h2>
      </div>

      <ul>
        {data.nextEvent.map((item, index) => {
          const homeTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "home");
          const awayTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "away");

          const date = new Date(item.date);
          const options: DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
          const outputDateString = date.toLocaleDateString('en-US', options)
          const outputTime = item.date.substr(11, 5)
          return (
            <li key={index} className='border hover:border-black'>
              <div className='text-[18px] text-center p-2 font-bold'>{outputDateString}</div>
              <div className='flex items-center justify-center p-2'>
                <span className='font-bold mr-2'>{homeTeamData?.team.abbreviation}</span>
                <img src={homeTeamData?.team.logos[0].href} className='h-8 mr-1' />
                <div className='border p-1'>
                  <span>{outputTime}</span>
                </div>
                <img src={awayTeamData?.team.logos[0].href} className='h-8 ml-1' />
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