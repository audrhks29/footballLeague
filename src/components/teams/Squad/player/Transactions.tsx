import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

import axios from 'axios';

import { memo } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';

interface Props {
  fetchUrl: string;
  playerData: PlayerDataType
}

const Transactions = memo((props: Props) => {
  const fetchTransactionsData = async () => {
    const url = props.fetchUrl
    try {
      const response = await axios.get(url);
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const { data: playerTransactionsData }: { data: Statistics }
    = useSuspenseQuery({
      queryKey: ['playerTransactionsData', props.fetchUrl],
      queryFn: () => fetchTransactionsData()
    });

  // console.log(playerTransactionsData.items);

  const fetchFromTeamData = async () => {
    try {
      const responses = await Promise.all(playerTransactionsData.items.map(item => axios.get(item.from.$ref)));
      const responseData = responses.map(response => response.data);
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const fetchToTeamData = async () => {
    try {
      const responses = await Promise.all(playerTransactionsData.items.map(item => axios.get(item.to.$ref)));
      const responseData = responses.map(response => response.data);
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const [{ data: fromData }, { data: toData }]
    = useSuspenseQueries({
      queries: [
        {
          queryKey: ['fromData'],
          queryFn: () => fetchFromTeamData()
        },
        {
          queryKey: ['toData'],
          queryFn: () => fetchToTeamData()
        },

      ]
    });
  console.log(fromData);
  console.log(toData);
  return (
    <div className='border'>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {playerTransactionsData.items.map((item, index) => {
            const fromTeamLogo = fromData[index].logos[1] ? fromData[index].logos[1] : fromData[index].logos[0]
            const toTeamLogo = toData[index].logos[1] ? toData[index].logos[1] : toData[index].logos[0]
            const fromTeamLink = fromData[index].id
            const toTeamLink = toData[index].id

            return (
              <tr key={index}>
                <td>{item.date}</td>
                <td>
                  {fromTeamLogo ?
                    <img src={fromTeamLogo.href} alt="" />
                    : <i className='text-[96px] mr-2 mb-3'>
                      <FaRegQuestionCircle />
                    </i>}
                  {fromData[index].displayName}
                </td>

                <td>
                  {toTeamLogo ?
                    <img src={toTeamLogo.href} alt="" />
                    : <i className='text-[96px] mr-2 mb-3'>
                      <FaRegQuestionCircle />
                    </i>}
                  {toData[index].displayName}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
});

export default Transactions;