import axios from 'axios';

import { memo, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import MatchResultTable from '../components/teamInfo/matchResult/MatchResultTable';
import Commentary from '../components/teamInfo/matchResult/Commentary';

const MatchResult = memo(() => {
  const { slugId, gameId } = useParams()

  const [data, setData] = useState<MatchResultType>()
  const [isCommentary, SetIsCommentary] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/summary?event=${gameId}`)
        setData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    }

    fetchData()
  }, [slugId, gameId])

  const toggleViewCommentary = () => {
    SetIsCommentary(!isCommentary)
  }
  console.log(data);
  return (
    <div className='inner'>
      {data && <h2>Attendance : {data.gameInfo.attendance}</h2>}
      {data && <h2>Location : {data.gameInfo.venue.fullName}, {data.gameInfo.venue.address.city}</h2>}
      {data && <MatchResultTable data={data} />}
      <div
        className='w-full text-center border h-10 leading-10 cursor-pointer my-10'
        onClick={toggleViewCommentary}
      >
        <span>{!isCommentary ? "View Commentary" : "Hide Commentary"}</span>
      </div>
      {data && isCommentary && <Commentary data={data} />}

    </div>
  );
});

export default MatchResult;