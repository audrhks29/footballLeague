import { memo } from 'react';

const SummarizeResult = memo(({ data, matchResult }) => {
  // console.log(matchResult);
  const displayedMatches = matchResult ? matchResult.slice(0, 5) : [];
  return (
    <div className='w-60 rounded-t-lg'>

      <div
        className='p-2 rounded-t-lg'
        style={{
          background: `linear-gradient(to bottom right, #${data.color}, #${data.alternateColor})`
        }}
      >
        <h2 className='text-[20px] text-center text-white text-bold'>Match Result</h2>
      </div>

      <ul>
        {matchResult && displayedMatches.map((item, index) => {
          const matchInfo = item.competitions[0]
          const homeTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "home");
          const awayTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "away");

          const date = new Date(matchInfo.date);
          const options = { weekday: 'long', month: 'long', day: 'numeric' };
          const outputDateString = date.toLocaleDateString('en-US', options)

          return (
            <li key={index} className='border hover:border-black'>
              <div className='text-[18px] text-center p-2 font-bold'>{outputDateString}</div>
              <div className='flex items-center justify-center p-2'>
                <span className='font-bold mr-2'>{homeTeamData.team.abbreviation}</span>
                <img src={homeTeamData.team.logo} className='h-8 mr-1' />
                <div className='border p-1 bg-black text-white text-bold'>
                  <span>{homeTeamData.score} - {awayTeamData.score}</span>
                </div>
                <img src={awayTeamData.team.logo} className='h-8 ml-1' />
                <span className='font-bold ml-2'>{awayTeamData.team.abbreviation}</span>
              </div>
            </li>
          )
        })}
      </ul>

    </div>
  );
});

export default SummarizeResult;