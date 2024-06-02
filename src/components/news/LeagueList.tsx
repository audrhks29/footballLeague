import { memo } from "react";

import { leagueSelectArray } from "../../assets/ArrayData";

import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

const LeagueList = memo(() => {
  const { slugId } = useParams();

  return (
    <Card className="w-[250px] row-span-2 pt-3">
      <CardContent>
        {leagueSelectArray.map((country) => (
          <div key={country.id}>
            <h3 className="text-[20px] h-11 leading-[44px]">
              {country.nation}
            </h3>

            <Card className="text-[16px]">
              {country.league.map((league) => (
                <div
                  key={league.id}
                  // className="h-7 leading-7 indent-3 cursor-pointer bg-muted"
                  className={`${
                    country.value + "." + league.division === slugId
                      ? "bg-muted h-7 leading-7 indent-3 cursor-pointer font-normal"
                      : "h-7 leading-7 indent-3 cursor-pointer"
                  }`}
                >
                  <Link
                    to={`/news/${country.value}.${league.division}/page=1`}
                    className="w-full block"
                  >
                    {league.name}
                  </Link>
                </div>
              ))}
            </Card>
          </div>
        ))}
      </CardContent>
    </Card>
  );
});

export default LeagueList;
