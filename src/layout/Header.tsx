import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = memo(() => {
  const location = useLocation();

  const headerArray = [
    { id: 1, text: "standings", link: "standings/eng.1/2023" },
    { id: 2, text: "news", link: "news" },
    { id: 3, text: "teams", link: "teams" },
  ]

  return (
    <div className='inner'>
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
                className='headerLi'>
                <span
                  style={{ borderBottom: isAttachStyle ? '1px solid #000' : 'none' }}
                  className='p-1'>
                  {item.text}
                </span>
              </li>
            </Link>
          )
        })}
      </ul>
    </div >
  );
});

export default Header;