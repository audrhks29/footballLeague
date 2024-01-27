import { memo } from 'react';

interface Props {
  data: TeamInfoType;
}

const Banner = memo(({ data }: Props) => {

  return (
    <div className='bg-white h-48'>
      <div className='w-full h-full flex relative'>
        <div
          style={{ backgroundColor: `#${data.alternateColor}` }}
          className='w-1/2 h-full rounded-tl-[70px]'
        >
        </div>
        <div
          style={{ backgroundColor: `#${data.color}` }}
          className='w-1/2 h-full rounded-tr-[70px]'
        >
        </div>
        <img
          src={data.logos[0].href}
          alt={data.displayName}
          title={data.displayName}
          className='w-24 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 '
        />
        <div className='w-full text-center absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h2 className='text-[44px] text-white font-bold'>
            {data.displayName}
          </h2>
        </div>
      </div>

    </div>
  );
});

export default Banner;