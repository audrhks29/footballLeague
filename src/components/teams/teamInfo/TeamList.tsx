import { useSuspenseQuery } from '@tanstack/react-query';

import axios from 'axios';

import { memo } from 'react';

import TeamListItem from './TeamListItem';

interface Props {
  selectedNationValue: string;
  selectedDivisionValue: string;
}

const TeamList = memo(({ selectedNationValue, selectedDivisionValue }: Props) => {

  const fetchTeamData = async (selectedNationValue: string, selectedDivisionValue: string) => {
    const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${selectedNationValue}.${selectedDivisionValue}/teams`);
    return response.data.sports[0].leagues[0]
  }

  const { data: teamsData }
    = useSuspenseQuery({ queryKey: ['teamsData', selectedNationValue, selectedDivisionValue], queryFn: () => fetchTeamData(selectedNationValue, selectedDivisionValue) });

  return (
    <>
      <h2 className='text-[30px] p-5'>{teamsData && teamsData.name}</h2>
      <ul className='grid grid-cols-5'>
        {teamsData.teams.map((item: Teams, index: number) => {
          // const isHovered = index === hoveredIndex;
          return (
            <TeamListItem
              item={item}
              key={index}
              index={index}
              selectedNationValue={selectedNationValue}
              selectedDivisionValue={selectedDivisionValue}
            />
          )
        })}
      </ul>
    </>
  );
});

export default TeamList;