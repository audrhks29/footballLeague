import { memo } from 'react';

import { Link } from 'react-router-dom';

import useNewsStore from '../store/news-store';

const News = memo(() => {
  const { newsData, fetchData } = useNewsStore()

  newsData.length <= 0 ? fetchData() : "";

  return (
    <div>
      <ul>
        {newsData && newsData.length > 0 &&
          newsData.map((item: NewsItemType, index: number) => (
            <Link to={`/news/${index + 1}`}>
              <li key={index}>
                <div>
                  <img
                    src={item.images[0].url}
                    alt={item.images[0].art}
                    title={item.images[0].caption}
                    className='w-40' />
                  <h3>{item.headline}</h3>
                  <h4>{item.description}</h4>
                </div>
              </li>
            </Link>
          ))
        }
      </ul>

    </div>
  );
});

export default News;