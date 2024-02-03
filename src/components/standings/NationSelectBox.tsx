import { memo } from 'react';

import { leagueSelectArray } from '../../assets/ArrayData';

import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

interface Props {
  handleSelectBox: () => void;
  change: (value: string, name: string, firstDivision: string) => void;
  selectedName: string;
  isSelectBox: boolean;
}

const NationSelectBox = memo((props: Props) => {

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
          {leagueSelectArray.map((item, index) => {
            const firstDivision = item.league[0].name
            return (
              <li
                key={index}
                onClick={() => props.change(item.value, item.nation, firstDivision)}
                className='w-full text-left hover:bg-slate-300'
              >
                <button type="button"
                  className='w-full text-left h-10 px-3'
                >
                  {item.nation}
                </button>
              </li>
            )
          })}
        </ul>}
    </div>
  );
});

export default NationSelectBox;