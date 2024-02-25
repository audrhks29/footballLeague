import { memo } from 'react';

import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

interface Props {
  handleSelectBox: () => void;
  change: (year: number) => void;
  seasonData: SeasonDataType[] | null,
  isSelectBox: boolean;
}

const YearSelectBox = memo((props: Props) => {
  const { yearId } = useParams()
  return (
    <div className='relative w-56 h-10 border mr-3'>

      <div
        onClick={props.handleSelectBox}
        className='w-full h-full flex items-center p-3 justify-between cursor-pointer'
      >
        <span>{yearId}</span>
        <span>{props.isSelectBox ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}</span>
      </div>

      {props.isSelectBox &&
        <ul className='absolute top-11 border w-56 bg-[#282828] max-h-[200px] overflow-y-auto'>
          {props.seasonData && props.seasonData.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => props.change(item.year)}
                className='w-full text-left hover:bg-hoverColor'
              >
                <button type="button"
                  className='w-full text-left h-10 px-3'
                >
                  {item.year}
                </button>
              </li>
            )
          })}
        </ul>}
    </div>
  );
});

export default YearSelectBox;