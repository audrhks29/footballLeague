import { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';

const Header = memo(() => {
  const location = useLocation();

  const headerArray = [
    { id: 1, text: "standings", link: "standings/eng.1/2023" },
    { id: 2, text: "news", link: "news/eng.1" },
    { id: 3, text: "teams", link: "teams" },
  ]

  return (
    <header className='inner'>
      <ul className='flex text-center items-center mb-9 h-24 leading-[96px]'>
        <Link to={"/"}>
          <li>
            <img
              src="images/loading/soccerBall.webp"
              className='h-16 cursor-pointer mr-5'
            />
          </li>
        </Link>
        {headerArray.map(item => {
          const isAttachStyle = location.pathname.includes(item.text);
          return (
            <Link to={`${item.link}`} key={item.id}>
              <li
                className='w-40 text-[18px] uppercase hover:border-b'>
                <span
                  style={{ borderBottom: isAttachStyle ? '1px solid #fff' : 'none' }}
                  className='p-1'>
                  {item.text}
                </span>
              </li>
            </Link>
          )
        })}
      </ul>
    </header >
  );
});

export default Header;