import { memo } from 'react';

import { leagueSelectArray } from '../../assets/ArrayData';

import { Link, useParams } from 'react-router-dom';

const LeagueList = memo(() => {
  const { slugId } = useParams();

  return (
    <div className='w-[200px] row-span-2'>
      {leagueSelectArray.map(country => (
        <div key={country.id}>
          <h3 className='text-[20px] h-11 leading-[44px] border-b border-tableBorderColor'>{country.nation}</h3>
          <ul className='text-[16px]'>

            {country.league.map(league => (
              <li
                key={league.id}
                className='h-7 leading-7 indent-3 cursor-pointer hover:bg-hoverColor'
                style={{ background: country.value + "." + league.division === slugId ? "#575757" : "" }}
              >
                <Link
                  to={`/news/${country.value}.${league.division}/page=1`}
                  className='w-full block'>
                  {league.name}
                </Link>
              </li>
            ))}

          </ul>
        </div>
      ))}
    </div>
  );
});

export default LeagueList;