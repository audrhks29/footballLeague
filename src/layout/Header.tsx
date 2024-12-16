import { memo } from "react";
import { Link, Outlet } from "react-router-dom";

import getCurrentYear from "@/utils/getCurrentDate";
import ThemeController from "./ThemeController";

const Header = memo(() => {
  const currentYear = getCurrentYear();
  const headerArray = [
    { id: 1, text: "standings", link: `standings/eng.1/${currentYear}` },
    { id: 2, text: "news", link: "news/eng.1/page=1" },
    { id: 3, text: "teams", link: "teams/eng.1" },
  ];

  return (
    <>
      <header className="inner">
        <ul className="navbar fixed bg-base-100 z-10 items-center w-[1300px]">
          <Link to={"/"}>
            <li>
              <img src="/logo.png" className="h-16 cursor-pointer mr-5" />
            </li>
          </Link>

          {headerArray.map((item) => (
            <Link
              to={`${item.link}`}
              key={item.id}
              className="btn btn-ghost text-xl w-40 uppercase"
            >
              {item.text}
            </Link>
          ))}

          <li className="ml-auto">
            <ThemeController />
          </li>
        </ul>
      </header>

      <Outlet />
    </>
  );
});

export default Header;
