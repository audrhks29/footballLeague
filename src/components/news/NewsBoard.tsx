import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import LeagueList from './LeagueList';

const NewsBoard = memo(() => {
  const { newsId } = useParams<string>();

  const fetchDataUseLink = async () => {
    const url = `http://now.core.api.espn.com/v1/sports/news/${newsId}`
    try {
      const response = await axios.get(url);
      return response.data.headlines[0]
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const { data: boardData } = useSuspenseQuery({
    queryKey: ['boardData', newsId],
    queryFn: () => fetchDataUseLink()
  });

  return (
    <div className='inner flex relative'>
      <LeagueList />
      <div className='bg-hoverColor w-[900px] ml-auto'>
        {boardData &&
          <div className='p-6'>

            <div className='border-b border-tableBorderColor'>
              <p className='text-[30px] pb-3'>{boardData.headline}</p>
              <p>{boardData.byline}</p>
              <p>{boardData.published}</p>
            </div>

            {boardData.images.length > 0 &&
              <div className='border-b border-tableBorderColor'>
                <img
                  src={boardData.images[0].url}
                  className='w-[800px] m-auto my-4'
                />
              </div>
            }
            <div
              className="text-[16px]"
              dangerouslySetInnerHTML={{ __html: boardData.story }}
            />
          </div>
        }
      </div>
    </div>

  );
});

export default NewsBoard;