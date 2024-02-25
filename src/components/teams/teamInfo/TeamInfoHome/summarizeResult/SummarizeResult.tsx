import { memo, useState } from 'react';

import { useParams } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import { leagueSelectArray } from '../../../../../assets/ArrayData';

import useTeamDataStore from '../../../../../store/teamData-store';

import ResultList from './ResultList';

const SummarizeResult = memo(() => {
  const { teamData } = useTeamDataStore();

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
            const data = filterMatchCurrentYear.concat(filterMatchNextYear).sort((a, b) => parseInt(b.id) - parseInt(a.id));
            return data
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

  const isCompletedMatch = recentMatchResult && recentMatchResult.filter(item => item.status.type.completed === true)
  const displayedMatches = recentMatchResult && isCompletedMatch ? isCompletedMatch.slice(0, 5) : [];

  return (
    <div className='w-64 rounded-t-lg'>

      <div className='p-2 rounded-t-lg border'>
        <h2 className='text-[20px] text-center text-white text-bold'>Recent Match Result</h2>
      </div>

      {displayedMatches && <ul>
        {displayedMatches.map((item, index) => {
          return (
            <ResultList
              key={index}
              item={item}
              index={index}
              matchDivision={matchDivision}
              teamData={teamData}
            />
          )
        })}
      </ul>}

    </div>
  );
});

export default SummarizeResult;