import { memo } from 'react';

const ErrorTransactions = memo(() => {
  return (
    <div className='border w-[950px] min-h-[150px] rounded-2xl p-5 mb-6 col-start-2'>
      <h3 className='border-b border-hoverColor text-[22px]'>Player's Transactions</h3>
      <p className='text-[16px] font-semibold text-center p-5'>There is No Data</p>
    </div>
  );
});

export default ErrorTransactions;