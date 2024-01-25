import axios from 'axios';

import { memo, useEffect, useState } from 'react';

import { FaRegQuestionCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const Teams = memo(() => {
  const [teamsData, setTeamsData] = useState<TeamDataType | null>(null)

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedNation, setSelectedNation] = useState("eng");
  const [selectedDivision, setSelectedDivision] = useState("1");

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${selectedNation}.${selectedDivision}/teams`);
      const data = response.data.sports[0].leagues[0]
      setTeamsData(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleMouseEnter = (index: number) => setHoveredIndex(index);

  const handleMouseLeave = () => setHoveredIndex(null);

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

  const changeNation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nationValue = e.target.value;
    setSelectedNation(nationValue)
    setSelectedDivision("1")
  }

  const changeDivision = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const divisionValue = e.target.value;
    setSelectedDivision(divisionValue)
  }

  useEffect(() => {
    setTeamsData(null)
    fetchData()
  }, [selectedNation, selectedDivision])

  return (
    <div className='inner'>
      <div className='m-auto'>
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
      </div>

      <h2 className='text-[30px] p-5'>{teamsData && teamsData.name}</h2>
      <ul className='grid grid-cols-5'>
        {teamsData && teamsData.teams && teamsData.teams.map((item, index) => {
          const isHovered = index === hoveredIndex;
          return (
            <Link to={`${selectedNation}.${selectedDivision}/${item.team.id}`}>
              <li key={index}
                className={`w-auto items-center flex flex-col p-3 cursor-pointer`}
                style={{ background: `${isHovered ? 'linear-gradient(to bottom right, #' + item.team.color + ', #' + item.team.alternateColor + ')' : ''}` }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  className='mb-3 text-base font-semibold'
                  style={{ color: `${isHovered ? "white" : "black"}` }}
                >
                  {item.team.name}
                </span>
                {item.team.logos[0] ? <img src={item.team.logos[0].href}
                  alt={item.team.displayName}
                  title={item.team.displayName}
                  className='w-24'
                /> : <i className='text-[96px] mr-2'><FaRegQuestionCircle /></i>}
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  );
});

export default Teams;