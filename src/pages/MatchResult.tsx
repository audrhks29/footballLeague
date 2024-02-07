import { memo, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { useSuspenseQuery } from '@tanstack/react-query';

import MatchResultTable from '../components/matchResult/MatchResultTable';
import Commentary from '../components/matchResult/Commentary';
import HomeTeam from '../components/matchResult/roster/HomeTeam';
import AwayTeam from '../components/matchResult/roster/AwayTeam';

import useMatchResultDataStore from '../store/matchResult-store';

const MatchResult = memo(() => {
  const { fetchMatchResultData } = useMatchResultDataStore()
  const { slugId, gameId } = useParams()

  const [isCommentary, SetIsCommentary] = useState(false)

  const { data: matchResultData } = useSuspenseQuery({
    queryKey: ['matchResultData', slugId, gameId],
    queryFn: () => fetchMatchResultData(slugId, gameId)
  });

  const toggleViewCommentary = () => {
    SetIsCommentary(!isCommentary)
  }

  const date = new Date(matchResultData.header.competitions[0].date);
  const options: DateTimeFormatOptions = { year: 'numeric', weekday: 'long', month: 'long', day: 'numeric' };
  const outputDateString = date.toLocaleDateString('en-US', options)

  return (
    <div className='w-[1300px] m-auto'>

      {matchResultData && <div><h2 className='text-[26px] font-bold text-center py-4'>{matchResultData.header.season.name}</h2></div>}

      {matchResultData &&
        <div className='flex justify-between items-end'>
          <h2 className=' text-[16px]'>{matchResultData.gameInfo.venue.fullName}, {matchResultData.gameInfo.venue.address.city}</h2>
          <div className='text-right'>
            <h2>{outputDateString}</h2>
            <h2 className=''>Attendance : {matchResultData.gameInfo.attendance.toLocaleString()}</h2>
          </div>
        </div>
      }

      {matchResultData &&
        <ul className='flex py-5 border-y mb-5 h-48 shadow-slate-300 shadow-md'>

          <Link to={`/teams/${matchResultData.header.league.slug}/${matchResultData.boxscore.teams[0].team.id}`} className='flex'>
            <li className='w-[600px] flex justify-center items-center'>
              <span className='text-[22px]'>{matchResultData.boxscore.teams[0].team.displayName}</span>
              <img
                src={matchResultData.boxscore.teams[0].team.logo}
                alt={matchResultData.boxscore.teams[0].team.shortDisplayName}
                title={matchResultData.boxscore.teams[0].team.displayName}
                className='w-20 ml-3'
              />
            </li>
          </Link>

          <li className='w-[100px] text-center flex items-center justify-center text-[24px] font-bold'>
            {matchResultData.header.competitions[0].competitors[0].score} : {matchResultData.header.competitions[0].competitors[1].score}
          </li>

          <Link to={`/teams/${matchResultData.header.league.slug}/${matchResultData.boxscore.teams[1].team.id}`} className='flex'>
            <li className='w-[600px] flex justify-center items-center'>
              <img
                src={matchResultData.boxscore.teams[1].team.logo}
                alt={matchResultData.boxscore.teams[1].team.shortDisplayName}
                title={matchResultData.boxscore.teams[1].team.displayName}
                className='w-20 mr-3'
              />
              <span className='text-[22px]'>{matchResultData.boxscore.teams[1].team.displayName}</span>
            </li>
          </Link>

        </ul>}

      <div className='flex justify-between'>
        <HomeTeam data={matchResultData.rosters[0]} />
        {matchResultData.boxscore.teams[0].statistics
          ? <MatchResultTable data={matchResultData} />
          : <p>Sorry, There is No Statistics Data</p>
        }
        <AwayTeam data={matchResultData.rosters[1]} />
      </div>

      <div
        className='w-full text-center border h-10 leading-10 cursor-pointer my-10'
        onClick={toggleViewCommentary}
      >
        <span>{!isCommentary ? "View Commentary" : "Hide Commentary"}</span>
      </div>
      {matchResultData && matchResultData.keyEvents && isCommentary && <Commentary data={matchResultData} />}

    </div >
  );
});

export default MatchResult;