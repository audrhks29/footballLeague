import { memo } from 'react';

const ErrorCurrentSeasonStats = memo(() => {
  return (
    <div className='w-[400px] border border-white rounded-2xl ml-auto'>
      <p className='text-center text-[20px] py-3 rounded-t-2xl'>Current Season</p>
      <ul className='flex justify-around p-3'>
        <li className='w-20 border text-center p-1'>
          <p className='text-[12px]'>APP</p>
          <p className='text-[20px]'>0</p>
        </li>
        <li className='w-20 border text-center p-1'>
          <p className='text-[12px]'>G</p>
          <p className='text-[20px]'>0</p>
        </li>
        <li className='w-20 border text-center p-1'>
          <p className='text-[12px]'>A</p>
          <p className='text-[20px]'>0</p>
        </li>
        <li className='w-20 border text-center p-1'>
          <p className='text-[12px]'>T</p>
          <p className='text-[20px]'>0</p>
        </li>
      </ul>
    </div>
  );
});

export default ErrorCurrentSeasonStats;