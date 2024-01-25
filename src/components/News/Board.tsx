import { memo, useEffect, useState } from 'react';

import axios from 'axios';

import { useParams } from 'react-router-dom';

import useNewsStore from '../../store/news-store';


const Board = memo(() => {
  const { newsId } = useParams<string>();
  const { newsData, fetchData } = useNewsStore()
  const [dataLinks, setDataLinks] = useState("");
  const [data, setData] = useState<boardType>()

  if (newsData.length <= 0) fetchData();
  const fetchDataUseLink = async () => {
    try {
      const response = await axios.get(dataLinks);
      setData(response.data.headlines[0])
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (newsData.length > 0) setDataLinks(newsData[Number(newsId) - 1].links.api.news.href)
  }, [newsData])

  useEffect(() => {
    if (dataLinks) fetchDataUseLink()
  }, [dataLinks])

  return (
    <div>
      {newsId}번
      {data &&
        <div>
          <p>{data.title}</p>
          <p>{data.byline}</p>
          <p>{data.published}</p>
          <p>{data.story}</p>
        </div>

      }
    </div>
  );
});

export default Board;