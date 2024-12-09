import { memo } from "react";
import { Link, Outlet } from "react-router-dom";

import getCurrentYear from "@/utils/getCurrentDate";

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
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="dark"
                className="toggle theme-controller"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </li>
        </ul>
      </header>

      <Outlet />
    </>
  );
});

export default Header;
