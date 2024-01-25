import { memo, useEffect, useState } from 'react';

import axios from 'axios';

import { FaRegQuestionCircle } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Standings = memo(() => {
  const [standingsData, setStandingsData] = useState([]);
  const [selectedNation, setSelectedNation] = useState("eng");
  const [selectedDivision, setSelectedDivision] = useState("1");
  const [selectedYear, setSelectedYear] = useState(2023);
  const [seasonData, setSeasonData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://site.web.api.espn.com/apis/v2/sports/soccer/${selectedNation}.${selectedDivision}/standings?season=${selectedYear}`);
      if (response.data.children) {
        const data = response.data.children[0].standings
        setStandingsData(data)
      }
      else setStandingsData([])
      const season = response.data.seasons
      setSeasonData(season);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedNation, selectedDivision, selectedYear])

  const changeNation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nationValue = e.target.value;
    setSelectedNation(nationValue)
    setSelectedDivision("1")
    setSelectedYear(2023)
  }

  const changeDivision = (e: React.ChangeEvent<HTMLInputElement>) => {
    const divisionValue = e.target.value;
    setSelectedDivision(divisionValue)
    setSelectedYear(2023)
  }

  const changeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = Number(e.target.value);
    setSelectedYear(year)
  }

  const handleCountYear = (num: number) => {
    if (num > 0 && seasonData[0].year <= selectedYear) return
    else if (num < 0 && seasonData[seasonData.length - 1].year >= selectedYear) return
    else setSelectedYear(selectedYear + num)
  }

  const leagueSelectArray = [
    {
      id: 1, nation: "England", abbreviation: "ENG", value: "eng",
      league: [
        { id: 1, name: "Premier League", division: "1", },
        { id: 2, name: "EFL Championship", division: "2", },
        { id: 3, name: "EFL League One", division: "3", },
        { id: 4, name: "EFL League Two", division: "4", },
      ]
    },
    {
      id: 2, nation: "Spain", abbreviation: "ESP", value: "esp",
      league: [
        { id: 1, name: "Laliga", division: "1", },
        { id: 2, name: "Laliga 2", division: "2", },
      ]
    },
    {
      id: 3, nation: "Germany", abbreviation: "GER", value: "ger",
      league: [
        { id: 1, name: "Bundesliga", division: "1", },
      ]
    },
    {
      id: 4, nation: "Italy", abbreviation: "ITA", value: "ita",
      league: [
        { id: 1, name: "Serie A", division: "1", },
        { id: 2, name: "Serie B", division: "2", },
      ]
    },
    {
      id: 5, nation: "France", abbreviation: "FRA", value: "fra",
      league: [
        { id: 1, name: "Ligue 1", division: "1", },
        { id: 2, name: "Ligue 2", division: "2", },
      ]
    },
    {
      id: 6, nation: "Netherlands", abbreviation: "NED", value: "ned",
      league: [
        { id: 1, name: "Eredivisie", division: "1", },
        { id: 2, name: "Eerste Divisie", division: "2", },
      ]
    },
    {
      id: 7, nation: "Portugal", abbreviation: "POR", value: "por",
      league: [
        { id: 1, name: "Primeira Liga", division: "1", },
      ]
    },
    {
      id: 8, nation: "Belgium", abbreviation: "BEL", value: "bel",
      league: [
        { id: 1, name: "Belgian Pro League", division: "1", },
      ]
    },
  ]

  const thArray = ["Rank", "Team Name", "P", "GP", "W", "D", "L", "GD", "NOTE"]

  const filter = seasonData.filter(item => item.year == selectedYear)

  return (
    <div className='inner'>
      <div className='w-[1030px] m-auto'>
        <select
          onChange={changeNation}
          value={selectedNation}
          className='w-28 h-6 border border-black mr-2'
        >
          {leagueSelectArray.map((item, index) => (
            <option value={item.value} key={index}>{item.nation}</option>
          ))}
        </select>

        <select
          onChange={changeDivision}
          value={selectedDivision}
          className='w-40 h-6 border border-black mr-2'
        >
          {leagueSelectArray.map(item => {
            if (item.value === selectedNation)
              return (
                item.league.map((item, index) => (
                  <option value={item.division} key={index}>{item.name}</option>
                ))
              )
          })}
        </select>

        {seasonData &&
          <select
            onChange={changeYear}
            value={selectedYear}
            className='w-20 h-6 border border-black'
          >
            {seasonData.map((item, index) => (
              <option value={item.year} key={index}>{item.year}</option>
            ))
            }
          </select>}
      </div>
      <div className='flex items-center text-3xl justify-around w-[700px] m-auto p-5'>
        <span onClick={() => handleCountYear(-1)} className='cursor-pointer'><MdKeyboardArrowLeft /></span>
        {filter.length > 0 && filter[0].displayName && <h2>{filter[0].displayName}</h2>}
        <span onClick={() => handleCountYear(1)} className='cursor-pointer'><MdKeyboardArrowRight /></span>
      </div>

      {
        standingsData.entries && Array.isArray(standingsData.entries) ? (
          <table className='text-center m-auto'>
            <colgroup>
              <col width={70} />
              <col width={300} />
              <col width={60} />
              <col width={60} />
              <col width={60} />
              <col width={60} />
              <col width={60} />
              <col width={60} />
              <col width={300} />
            </colgroup>
            <thead>
              <tr>
                {thArray.map((item, index) => (
                  <th key={index} className='p-2 border-y border-black'>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                standingsData.entries.map((entry, entryIndex) => {
                  const rankArray = Array.from({ length: standingsData.entries.length }, (_, index) => index + 1);
                  const statsOrderArray = ["points", "gamesPlayed", "wins", "ties", "losses", "pointDifferential", "note"];
                  return (
                    <tr key={entryIndex} className='border-b h-9'>
                      <td className='font-bold'>{rankArray[entryIndex]}</td>
                      {entry.team &&
                        <td className='flex items-center px-3 h-9'>
                          {entry.team.logos ?
                            <img src={entry.team.logos[0].href} alt={entry.team.name} title={entry.team.name} className='h-7 mr-2' />
                            : <i className='text-[28px] mr-2'><FaRegQuestionCircle /></i>}
                          {entry.team.name}
                        </td>}
                      {entry.stats && (
                        <>
                          {statsOrderArray.map((statName, index) => {
                            const stat = entry.stats.find(stat => stat.name === statName);
                            return (
                              stat && (
                                <td key={index}>
                                  {stat.value}
                                </td>
                              )
                            );
                          })}
                        </>
                      )}
                      {entry.note && <td style={{ backgroundColor: `${entry.note.color}` }}>{entry.note.description}</td>}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        ) : (
          <p>Invalid standingsData structure</p>
        )
      }
    </div >
  );
});

export default Standings;