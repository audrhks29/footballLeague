import { memo } from 'react';

const ErrorAllSeasonStats = memo(() => {
  return (
    <div className='border w-[950px] rounded-2xl p-5 mb-6'>
      <h3 className='border-b border-hoverColor text-[22px]'>All Season Stats</h3>
      <p className='text-[16px] font-semibold text-center p-5'>There is No Data</p>
    </div>
  );
});

export default ErrorAllSeasonStats;