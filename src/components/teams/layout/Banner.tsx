import { memo } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';


interface Props {
  data: TeamInfoType;
}

const Banner = memo(({ data }: Props) => {
  return (
    <div
      className='h-48 flex flex-col items-center justify-center shadow-orange-300 shadow-xl'
    // style={{ background: `linear-gradient(to bottom right, #${data.color}, #${data.alternateColor})` }}
    >
      {data.logos
        ? <img
          src={data.logos[0].href}
          alt={data.displayName}
          title={data.displayName}
          className='w-24 '
        />
        : <i className='text-[96px]'><FaRegQuestionCircle /></i>}
      <h2 className='text-[44px] font-bold'>
        {data.displayName}
      </h2>
    </div>
  );
});

export default Banner;