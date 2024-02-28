import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { memo } from 'react';

const Stats = memo((props) => {
  const fetchStatsData = async () => {
    const url = props.fetchUrl
    try {
      const response = await axios.get(url);
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const { data: playerStatsData }
    = useSuspenseQuery({
      queryKey: ['playerStatsData', props.fetchUrl],
      queryFn: () => fetchStatsData()
    });

  console.log(playerStatsData);
  // const fetchData = async () => {
  //   try {
  //     const responses = await Promise.all(playerStatsData.items.map(item => axios.get(item.$ref)));
  //     const responseData = responses.map(response => response.data);
  //     return responseData;
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
  // const { data: ddd }
  //   = useSuspenseQuery({
  //     queryKey: ['ddd', props.fetchUrl],
  //     queryFn: () => fetchData(),
  //   });


  // console.log(ddd);
  return (
    <div>
      이번시즌스탯임
    </div>
  );
});

export default Stats;