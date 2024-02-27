import { useSuspenseQuery } from '@tanstack/react-query';

import axios from 'axios';

import { memo } from 'react';

interface Props {
  newsPopupLink: string;
}

const NewsPopup = memo((props: Props) => {
  const fetchDataUseLink = async () => {
    try {
      const response = await axios.get(props.newsPopupLink);
      return response.data.headlines[0]
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const { data: boardData } = useSuspenseQuery({
    queryKey: ['boardData'],
    queryFn: () => fetchDataUseLink()
  });

  console.log(boardData);
  return (
    <div className='absolute bg-hoverColor'>
      {boardData &&
        <div>
          <p>{boardData.title}</p>
          <p><img
            src={boardData.images[0].url}
            className='w-[800px]'
          /></p>
          <p>{boardData.byline}</p>
          <p>{boardData.published}</p>
          <p>{boardData.story}</p>
        </div>
      }
    </div>
  );
});

export default NewsPopup;