import { memo, useEffect, useState } from 'react';

import axios from 'axios';

import { useParams } from 'react-router-dom';

import useNewsStore from '../../store/news-store';

import { useSuspenseQuery } from '@tanstack/react-query';

const Board = memo(() => {
  const { slugId, newsId } = useParams()
  const { fetchNewsData, newsData } = useNewsStore()

  const [dataLinks, setDataLinks] = useState(newsData.length !== 0 ? newsData[Number(newsId) - 1].links.api.news.href : "");

  useEffect(() => {
    if (newsData.length == 0) {
      fetchNewsData(slugId);
    }
    setDataLinks(newsData[Number(newsId) - 1]?.links.api.news.href)
  }, [fetchNewsData, newsData, newsId, slugId]);
  // console.log(dataLinks);
  const fetchDataUseLink = async () => {
    try {
      const response = await axios.get(dataLinks);
      return response.data.headlines[0]
    } catch (error) {
      console.error('Error fetching data:', error);
      return []
    }
  }

  const { data: boardData } = useSuspenseQuery({
    queryKey: ['boardData', dataLinks],
    queryFn: () => fetchDataUseLink()
  });

  console.log(boardData);
  return (
    <div>
      {boardData &&
        <div>
          <p>{boardData.title}</p>
          <p><img src={boardData.images[0].url} /></p>
          <p>{boardData.byline}</p>
          <p>{boardData.published}</p>
          <p>{boardData.story}</p>
        </div>

      }
    </div>
  );
});

export default Board;