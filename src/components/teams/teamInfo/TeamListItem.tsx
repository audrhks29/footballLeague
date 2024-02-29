import { memo } from 'react';

import { FaRegQuestionCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';

interface Props {
  item: Teams;
  index: number;
  selectedNationValue: string;
  selectedDivisionValue: string;
}

const TeamListItem = memo(({ item, index, selectedNationValue, selectedDivisionValue }: Props) => {
  const teamLogos = item.team.logos[1] ? item.team.logos[1] : item.team.logos[0]

  return (
    <Link to={`${selectedNationValue}.${selectedDivisionValue}/${item.team.id}`} key={index}>
      <li className={`w-auto items-center flex flex-col p-3 cursor-pointer hover:bg-hoverColor`}>
        {teamLogos
          ? <img src={teamLogos.href}
            alt={item.team.displayName}
            title={item.team.displayName}
            className='w-24 mb-3'
          />
          : <i className='text-[96px] mr-2 mb-3'><FaRegQuestionCircle /></i>}
        <span className='text-base font-semibold'>
          {item.team.name}
        </span>
      </li>
    </Link>
  );
});

export default TeamListItem;