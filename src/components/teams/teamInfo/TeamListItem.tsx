import { memo, useCallback, useState } from 'react';

import { FaRegQuestionCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';

interface Props {
  item: Teams;
  index: number;
  selectedNationValue: string;
  selectedDivisionValue: string;
}

const TeamListItem = memo(({ item, index, selectedNationValue, selectedDivisionValue }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, [])

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
  );
});

export default TeamListItem;