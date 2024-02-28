import { memo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import useNewsStore from '../store/news-store';

import { useSuspenseQuery } from '@tanstack/react-query';

import LeagueList from '../components/news/LeagueList';

const News = memo(() => {
  const { slugId } = useParams();
  const navigate = useNavigate();

  const { fetchNewsData } = useNewsStore();

  const { data: newsData } = useSuspenseQuery({
    queryKey: ['newsData', slugId],
    queryFn: () => fetchNewsData(slugId)
  });

  const clickNews = (index: number) => {
    const url = newsData[index].links.api.news.href
    const pattern = /news\/(.+)/;
    const result = url.match(pattern);
    if (result) navigate(`/news/${slugId}/${result[1]}`)
    else alert("Could not find Board")
  }

  return (
    <div className='inner flex relative'>
      <LeagueList />
      <ul className='w-[900px] ml-auto'>
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
    </div>
  );
});

export default News;