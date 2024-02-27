import { memo, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import useNewsStore from '../store/news-store';
import { useSuspenseQuery } from '@tanstack/react-query';
import { leagueSelectArray } from '../assets/ArrayData';
import NewsPopup from './../components/news/NewsPopup';

const News = memo(() => {
  const { slugId } = useParams();

  const { fetchNewsData } = useNewsStore();

  const [isNewsPopup, setIsNewsPopup] = useState(false);
  const [newsPopupLink, setNewsPopupLink] = useState<string>("");

  const { data: newsData } = useSuspenseQuery({
    queryKey: ['newsData', slugId],
    queryFn: () => fetchNewsData(slugId)
  });

  const clickNews = (index: number) => {
    setIsNewsPopup(true)
    setNewsPopupLink(newsData[index].links.api.news.href);
  }

  return (
    <div className='inner flex relative'>
      <div className='w-[200px]'>
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
                    to={`/news/${country.value}.${league.division}`}
                    className='w-full block'>
                    {league.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ul className='w-[900px] m-auto'>
        {
          newsData.map((item: NewsItemType, index: number) => (
            <li
              className='m-auto bg-hoverColor mb-5 cursor-pointer'
              key={index}
              onClick={() => clickNews(index)}
            >
              {item.images.length > 0 && <img
                src={item.images[0].url}
                alt={item.images[0].art}
                title={item.images[0].caption}
                className='w-[900px] m-auto' />}
              <div className='w-[900px] m-auto px-3'>
                <h3 className='text-[20px] py-2'>{item.headline}</h3>
                <h4 className='pb-2'>{item.description}</h4>
              </div>
            </li>
          ))
        }
      </ul>
      {isNewsPopup && <NewsPopup
        newsPopupLink={newsPopupLink} />}
    </div>
  );
});

export default News;