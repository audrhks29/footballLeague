import { memo, useState } from 'react';

import axios, { AxiosResponse } from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

import { MdArrowForwardIos } from 'react-icons/md';

import { leagueSelectArray } from '../../../assets/ArrayData';

import { useSuspenseQuery } from '@tanstack/react-query';

const Result = memo(() => {
  const navigate = useNavigate()

  const { teamId, slugId } = useParams()

  const [selectedYear, setSelectedYear] = useState(2023)
  const [matchDivision, setMatchDivision] = useState<string | undefined>(slugId)

  const fetchSeasonData = async (slugId: string | undefined, selectedYear: number) => {
    const response = await axios.get(`https://site.web.api.espn.com/apis/v2/sports/soccer/${slugId}/standings?season=${selectedYear}`);
    return response.data.seasons
  }

  const { data: seasonData }
    = useSuspenseQuery({ queryKey: ['seasonData', slugId, selectedYear], queryFn: () => fetchSeasonData(slugId, selectedYear) });

  const fetchTeamResultData = async (teamId: string | undefined, slugId: string | undefined, selectedYear: number) => {
    try {
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

  };

  const { data: resultData }
    = useSuspenseQuery({ queryKey: ['resultData', teamId, slugId, selectedYear], queryFn: () => fetchTeamResultData(teamId, slugId, selectedYear) });

  const changeYear: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = parseInt(e.target.value);
    setSelectedYear(value);
  }

  const goToMatchIdPage = (gameId: string) => {
    navigate(`/match/${matchDivision}/${gameId}`)
  }

  return (
    <div>
      <span className='font-bold'>Season</span>

      <select
        onChange={changeYear}
        value={selectedYear}
        className='w-28 h-6 border border-black ml-2'
      >
        {seasonData.map((item: TeamDataType, index: number) => (
          <option value={item.year} key={index}>{item.year}-{item.year + 1}</option>
        ))
        }
      </select>

      <ul className='mt-5'>
        {resultData && resultData.length === 0 && <li>there is no data, please retry</li>}
        {resultData && resultData.map((item, index) => {
          const isCompletedMatch = item.status.type.completed;

          const matchInfo = item.competitions[0];

          const homeTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "home");
          const awayTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "away");

          const date = new Date(matchInfo.date);
          const options: DateTimeFormatOptions = { year: 'numeric', weekday: 'long', month: 'long', day: 'numeric' };
          const outputDateString = date.toLocaleDateString('en-US', options);

          if (resultData && isCompletedMatch) {
            return (
              <li
                key={index}
                className='border-b hover:border-black cursor-pointer p-1'
                onClick={() => goToMatchIdPage(item.id)}
              >
                <div className='text-[16px] p-2 font-bold flex justify-between'>
                  <span>{outputDateString}</span>
                  <span className='text-[14px] font-medium'>{item.season.slug}</span>
                </div>
                <div className='flex items-center p-2 justify-between'>
                  <span className='text-[16px] font-bold'>{index + 1}R</span>
                  <div className='flex items-center '>
                    <span className='font-bold mr-2'>{homeTeamData?.team.abbreviation}</span>
                    <img src={homeTeamData?.team.logo} className='h-8 mr-2' />
                    <div className='border p-1 bg-black text-white text-bold'>
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
            )
          }
        })}

      </ul>
    </div>
  );
});

export default Result;