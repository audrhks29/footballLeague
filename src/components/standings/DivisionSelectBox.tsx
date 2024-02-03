import { memo } from 'react';

import { leagueSelectArray } from '../../assets/ArrayData';

import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

interface Props {
  handleSelectBox: () => void;
  change: (division: string, name: string) => void;
  selectedName: string;
  isSelectBox: boolean;
  nationValue: string;
}

const DivisionSelectBox = memo((props: Props) => {
  return (
    <div className='relative w-56 h-10 border mr-3'>

      <div
        onClick={props.handleSelectBox}
        className='w-full h-full flex items-center p-3 justify-between cursor-pointer'
      >
        <span>{props.selectedName}</span>
        <span>{props.isSelectBox ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}</span>
      </div>

      {props.isSelectBox &&
        <ul className='absolute top-11 border w-56 bg-white max-h-[200px] overflow-y-auto'>
          {leagueSelectArray.map(item => {
            if (item.value === props.nationValue) {
              return (
                item.league.map((league, idx) => (
                  <li
                    key={idx}
                    onClick={() => props.change(league.division, league.name)}
                    className='w-full text-left hover:bg-slate-300'
                  >
                    <button
                      type="button"
                      className='w-full text-left h-10 px-3'
                    >
                      {league.name}
                    </button>
                  </li>
                ))
              )
            }
          })}
        </ul>}
    </div>
  );
});

export default DivisionSelectBox;