import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPath = memo(() => {
  const navigate = useNavigate()

  const clickGoHome = () => navigate('/')

  return (
    <div className='absolute w-full bg-[#282828] top-0 left-0 h-full z-50'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <p className='text-[200px] leading-[200px]'>404</p>
        <p className='text-[30px]'>Sorry, Did Not Found Page</p>
        <button
          className='w-[150px] h-[50px] bg-[#000] mt-6 rounded-2xl hover:bg-hoverColor hover:transition-colors text-[24px]'
          onClick={clickGoHome}
        >Home</button>
      </div>
    </div>
  );
});

export default NotFoundPath;