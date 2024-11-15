import { memo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import getCurrentYear from "@/utils/getCurrentDate";

const Header = memo(() => {
  const location = useLocation();
  const currentYear = getCurrentYear();
  const headerArray = [
    { id: 1, text: "standings", link: `standings/eng.1/${currentYear}` },
    { id: 2, text: "news", link: "news/eng.1/page=1" },
    { id: 3, text: "teams", link: "teams/eng.1" },
  ];

  return (
    <>
      <header className="inner">
        <ul className="flex text-center items-center mb-9 h-24 leading-[96px] absolute top-0 z-20">
          <Link to={"/"}>
            <li>
              <img
                src="/images/loading/soccerBall.webp"
                className="h-16 cursor-pointer mr-5"
              />
            </li>
          </Link>
          {headerArray.map((item) => {
            const isAttachStyle = location.pathname.includes(item.text);
            return (
              <Link to={`${item.link}`} key={item.id}>
                <li className="w-40 text-[18px] uppercase hover:border-b">
                  <span
                    style={{
                      borderBottom: isAttachStyle ? "1px solid #fff" : "none",
                    }}
                    className="p-1"
                  >
                    {item.text}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </header>
      <Outlet />
    </>
  );
});

export default Header;
