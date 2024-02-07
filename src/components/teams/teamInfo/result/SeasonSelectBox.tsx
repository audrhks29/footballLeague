import { memo } from 'react';

import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

interface Props {
  handleSelectBox: () => void;
  change: (year: number) => void;
  seasonData: SeasonDataType[] | null,
  selectedYear: number;
  isSelectBox: boolean;
}

const SeasonSelectBox = memo((props: Props) => {

  return (
    <div className='relative w-56 h-10 border mr-3'>

      <div
        onClick={props.handleSelectBox}
        className='w-full h-full flex items-center p-3 justify-between cursor-pointer'
      >
        <span>{props.selectedYear}-{props.selectedYear + 1}</span>
        <span>{props.isSelectBox ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}</span>
      </div>

      {props.isSelectBox &&
        <ul className='absolute top-11 border w-56 bg-white max-h-[200px] overflow-y-auto'>
          {props.seasonData && props.seasonData.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => props.change(item.year)}
                className='w-full text-left hover:bg-slate-300'
              >
                <button type="button"
                  className='w-full text-left h-10 px-3'
                >
                  {item.year}-{item.year + 1}
                </button>
              </li>
            )
          })}
        </ul>}
    </div>
  );
});

export default SeasonSelectBox;