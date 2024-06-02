import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

import axios from 'axios';

import React, { memo } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';

interface Props {
  fetchUrl: string;
  playerData: PlayerDataType
}

const Transactions = memo((props: Props) => {
  const fetchTransactionsData = async () => {
    const url = props.fetchUrl
    const response = await axios.get(url);
    return response.data
  }

  const { data: playerTransactionsData }: { data: playerTransactionsTypes }
    = useSuspenseQuery({
      queryKey: ['playerTransactionsData', props.fetchUrl],
      queryFn: () => fetchTransactionsData()
    });

  const fetchFromTeamData = async () => {
    const responses = await Promise.all(playerTransactionsData.items.map(item => axios.get(item.from.$ref)));
    const responseData = responses.map(response => response.data);
    return responseData;
  }

  const fetchToTeamData = async () => {
    const responses = await Promise.all(playerTransactionsData.items.map(item => axios.get(item.to.$ref)));
    const responseData = responses.map(response => response.data);
    return responseData;
  }

  const [{ data: fromData }, { data: toData }]
    = useSuspenseQueries({
      queries: [
        {
          queryKey: ['fromData', props.fetchUrl],
          queryFn: () => fetchFromTeamData()
        },
        {
          queryKey: ['toData', props.fetchUrl],
          queryFn: () => fetchToTeamData()
        },
      ]
    });

  return (
    <div className='border w-[950px] rounded-2xl p-5 mb-6 col-start-2'>
      <h3 className='border-b border-hoverColor text-[22px]'>Player's Transactions</h3>
      <div className='grid grid-cols-4 p-2'>
        <p className='text-center h-8 leading-8 border-b text-[16px]'>Date</p>
        <p className='text-center h-8 leading-8 border-b text-[16px]'>From</p>
        <p className='text-center h-8 leading-8 border-b text-[16px]'>To</p>
        <p className='text-center h-8 leading-8 border-b text-[16px]'>Type</p>
        {fromData && toData && playerTransactionsData.items.map((item, index) => {
          const fromTeamLogo = Array.isArray(fromData[index].logos) ? fromData[index].logos[1] : fromData[index].logos;
          const toTeamLogo = Array.isArray(toData[index].logos) ? toData[index].logos[1] : toData[index].logos;
          const type = item.displayAmount;
          const date = item.date.slice(0, 10);

          return (
            <React.Fragment key={index} >
              <p className='flex items-center px-2 h-[36px] justify-center'>{date}</p>
              <p className='flex items-center px-2 h-[36px]'>
                {fromTeamLogo ?
                  <img
                    src={fromTeamLogo.href}
                    className='w-6 h-6 mr-2' />
                  : <i className='text-[24px] mr-2'>
                    <FaRegQuestionCircle />
                  </i>
                }
                <span>{fromData[index].displayName}</span>
              </p>

              <p className='flex items-center px-2 h-[36px]'>
                {toTeamLogo ?
                  <img src={toTeamLogo.href}
                    className='w-6 h-6 mr-2' />
                  : <i className='text-[24px] mr-2'>
                    <FaRegQuestionCircle />
                  </i>}
                <span>{toData[index].displayName}</span>
              </p>

              <p className='flex items-center px-2 h-[36px] justify-center'>
                {type}
              </p>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  );
});

export default Transactions;