import axios from 'axios';

import { Suspense, memo, useEffect, useState } from 'react';

import { FaRegQuestionCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import { leagueSelectArray } from '../assets/ArrayData';

const Teams = memo(() => {
  const [teamsData, setTeamsData] = useState<TeamDataType | null>(null)

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedNation, setSelectedNation] = useState("eng");
  const [selectedDivision, setSelectedDivision] = useState("1");

  const handleMouseEnter = (index: number) => setHoveredIndex(index);

  const handleMouseLeave = () => setHoveredIndex(null);

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
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${selectedNation}.${selectedDivision}/teams`);
        const data = response.data.sports[0].leagues[0]
        setTeamsData(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    setTeamsData(null)
    fetchData()
  }, [selectedNation, selectedDivision])

  return (
    <Suspense fallback={<div>loading</div>}>
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
              <Link to={`${selectedNation}.${selectedDivision}/${item.team.id}`} key={index}>
                <li
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
    </Suspense>
  );
});

export default Teams;