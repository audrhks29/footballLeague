import { memo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';

import { leagueSelectArray } from '../../../assets/ArrayData';

import useTeamDataStore from '../../../store/teamData-store';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FaRegQuestionCircle } from 'react-icons/fa';


const SummarizeResult = memo(() => {
  const { teamData } = useTeamDataStore();

  const navigate = useNavigate()

  const { teamId, slugId } = useParams<string>();

  const [matchDivision, setMatchDivision] = useState<string | undefined>(slugId)

  const fetchRecentMatchResultData = async (teamId: string | undefined, slugId: string | undefined) => {
    try {
      const selectedYear = 2023
      const nextYear = selectedYear + 1
      const findDivision = leagueSelectArray.find(item => slugId?.includes(item.value))
      const divisionArray: string[] = findDivision ? findDivision.league.map(item => `${findDivision.value}.` + item.division) : [];

      for (const id of divisionArray) {
        const currentYearScoreboard: AxiosResponse<ResponseScoreboard> = await axios.get(`http://site.api.espn.com/apis/site/v2/sports/soccer/${id}/scoreboard?dates=${selectedYear}&limit=500`);
        const nextYearScoreboard: AxiosResponse<ResponseScoreboard> = await axios.get(`http://site.api.espn.com/apis/site/v2/sports/soccer/${id}/scoreboard?dates=${nextYear}&limit=500`)

        if (currentYearScoreboard.data.events && nextYearScoreboard.data.events) {
          const filterCurrentYearMatchedTeam = currentYearScoreboard.data.events.filter(item =>
            item.competitions[0].competitors.some(competitor => competitor.id === teamId)
          );

          const filterNextYearMatchedTeam = nextYearScoreboard.data.events.filter(item =>
            item.competitions[0].competitors.some(competitor => competitor.id === teamId)
          );

          const filterMatchCurrentYear = filterCurrentYearMatchedTeam.filter(item => item.season.year === selectedYear)
          const filterMatchNextYear = filterNextYearMatchedTeam.filter(item => item.season.year === selectedYear)

          if (filterMatchCurrentYear.length > 0 && filterMatchNextYear.length > 0) {
            setMatchDivision(currentYearScoreboard.data.leagues[0].slug);
            return filterMatchCurrentYear.concat(filterMatchNextYear)
          }
        }
      }
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  const { data: recentMatchResult }
    = useSuspenseQuery({ queryKey: ['recentMatchResult', teamId, slugId], queryFn: () => fetchRecentMatchResultData(teamId, slugId) });

  const goToMatchIdPage = (gameId: string) => {
    navigate(`/match/${matchDivision}/${gameId}`)
  }

  const isCompletedMatch = recentMatchResult && recentMatchResult.filter(item => item.status.type.completed === true)
  const displayedMatches = recentMatchResult && isCompletedMatch ? recentMatchResult.slice(isCompletedMatch.length - 5, isCompletedMatch.length) : [];

  return (
    <div className='w-64 rounded-t-lg'>

      <div
        className='p-2 rounded-t-lg'
        style={{
          background: `linear-gradient(to bottom right, #${teamData && teamData.color}, #${teamData && teamData.alternateColor})`
        }}
      >
        <h2 className='text-[20px] text-center text-white text-bold'>Recent Match Result</h2>
      </div>

      {displayedMatches && <ul>
        {displayedMatches.map((item, index) => {

          const matchInfo = item.competitions[0]
          const homeTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "home");
          const awayTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "away");

          const date = new Date(matchInfo.date);
          const options: DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
          const outputDateString = date.toLocaleDateString('en-US', options)

          return (
            <li
              key={index}
              className='border hover:border-black cursor-pointer'
              onClick={() => goToMatchIdPage(item.id)}
            >
              <div className='text-[18px] text-center p-2 font-bold'>{outputDateString}</div>
              <div className='flex items-center justify-center p-2'>
                <span className='font-bold mr-2'>{homeTeamData?.team.abbreviation}</span>
                {homeTeamData?.team.logo
                  ? <img src={homeTeamData?.team.logo} className='h-8 mr-1' />
                  : <i className='text-[32px] mr-1'><FaRegQuestionCircle /></i>}
                <div className='border p-1 bg-black text-white text-bold'>
                  <span>{homeTeamData?.score} - {awayTeamData?.score}</span>
                </div>
                {awayTeamData?.team.logo
                  ? <img src={awayTeamData?.team.logo} className='h-8 ml-1' />
                  : <i className='text-[32px] mr-1'><FaRegQuestionCircle /></i>}
                <span className='font-bold ml-2'>{awayTeamData?.team.abbreviation}</span>
              </div>
            </li>
          )
        })}
      </ul>}

    </div>
  );
});

export default SummarizeResult;