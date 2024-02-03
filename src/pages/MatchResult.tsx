import { memo, useState } from 'react';

import { useParams } from 'react-router-dom';

import MatchResultTable from '../components/matchResult/MatchResultTable';
import Commentary from '../components/matchResult/Commentary';
import HomeTeam from '../components/matchResult/roster/HomeTeam';
import AwayTeam from '../components/matchResult/roster/AwayTeam';
import { useSuspenseQuery } from '@tanstack/react-query';
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
  console.log(matchResultData);
  return (
    <div className='w-[1300px] m-auto'>
      {matchResultData && <div><h2 className='text-[26px] font-bold text-center py-4'>{matchResultData.header.season.name}</h2></div>}
      {matchResultData &&
        <div className='flex justify-between items-end'>
          <h2 className=' text-[20px]'>{matchResultData.gameInfo.venue.fullName}, {matchResultData.gameInfo.venue.address.city}</h2>
          <div>
            <h2>{matchResultData.header.competitions[0].date}</h2>
            <h2 className=''>Attendance : {matchResultData.gameInfo.attendance.toLocaleString()}</h2>
          </div>
        </div>
      }
      {matchResultData &&
        <ul className='flex py-5 border-y mb-5'>
          <li className='w-[600px] flex justify-center items-center'>
            <span className='text-[22px]'>{matchResultData.boxscore.teams[0].team.displayName}</span>
            <img
              src={matchResultData.boxscore.teams[0].team.logo}
              alt={matchResultData.boxscore.teams[0].team.shortDisplayName}
              title={matchResultData.boxscore.teams[0].team.displayName}
              className='w-20 ml-3'
            />
          </li>
          <li className='w-[100px] text-center flex items-center justify-center text-[24px] font-bold'>
            {matchResultData.header.competitions[0].competitors[0].score} : {matchResultData.header.competitions[0].competitors[1].score}
          </li>
          <li className='w-[600px] flex justify-center items-center'>
            <img
              src={matchResultData.boxscore.teams[1].team.logo}
              alt={matchResultData.boxscore.teams[1].team.shortDisplayName}
              title={matchResultData.boxscore.teams[1].team.displayName}
              className='w-20 mr-3'
            />
            <span className='text-[22px]'>{matchResultData.boxscore.teams[1].team.displayName}</span>
          </li>
        </ul>}


      <div className='flex'>
        <HomeTeam data={matchResultData.rosters[0]} />
        <MatchResultTable data={matchResultData} />
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