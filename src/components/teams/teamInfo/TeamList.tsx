import { useSuspenseQuery } from '@tanstack/react-query';

import axios from 'axios';

import { memo, useState } from 'react';

import { FaRegQuestionCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';

interface Props {
  selectedNationValue: string;
  selectedDivisionValue: string;
}

const TeamList = memo(({ selectedNationValue, selectedDivisionValue }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const fetchTeamData = async (selectedNationValue: string, selectedDivisionValue: string) => {
    const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${selectedNationValue}.${selectedDivisionValue}/teams`);
    return response.data.sports[0].leagues[0]
  }

  const { data: teamsData }
    = useSuspenseQuery({ queryKey: ['teamsData', selectedNationValue, selectedDivisionValue], queryFn: () => fetchTeamData(selectedNationValue, selectedDivisionValue) });

  const handleMouseEnter = (index: number) => setHoveredIndex(index);

  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <>
      <h2 className='text-[30px] p-5'>{teamsData && teamsData.name}</h2>
      <ul className='grid grid-cols-5'>
        {teamsData.teams.map((item: Teams, index: number) => {
          const isHovered = index === hoveredIndex;
          return (
            <Link to={`${selectedNationValue}.${selectedDivisionValue}/${item.team.id}`} key={index}>
              <li
                className={`w-auto items-center flex flex-col p-3 cursor-pointer`}
                style={{ background: `${isHovered ? 'linear-gradient(to bottom right, #' + item.team.color + ', #' + item.team.alternateColor + ')' : ''}` }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >

                {item.team.logos[0] ? <img src={item.team.logos[0].href}
                  alt={item.team.displayName}
                  title={item.team.displayName}
                  className='w-24 mb-3'
                /> : <i className='text-[96px] mr-2 mb-3'><FaRegQuestionCircle /></i>}
                <span
                  className='text-base font-semibold'
                  style={{ color: `${isHovered ? "white" : "black"}` }}
                >
                  {item.team.name}
                </span>
              </li>
            </Link>
          )
        })}
      </ul>
    </>
  );
});

export default TeamList;