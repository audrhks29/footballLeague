import { memo } from 'react';

import useRosterDataStore from '../../../../store/rosterData-store';

import { Link, useParams } from 'react-router-dom';

import { useSuspenseQuery } from '@tanstack/react-query';

interface Props {
  playerData: {
    id: string;
  }
}

const OtherPlayer = memo((props: Props) => {
  const { fetchRosterData } = useRosterDataStore()

  const { slugId, teamId } = useParams()

  const { data: otherPlayerData }
    = useSuspenseQuery({
      queryKey: ['otherPlayerData', props.playerData],
      queryFn: () => fetchRosterData(slugId, teamId),
      select: (data) => data.filter(item => item.id !== props.playerData.id)
    })

  return (
    <div className='w-[300px] border rounded-3xl p-5 row-span-4'>
      <h3 className='border-b border-hoverColor text-[22px] text-center'>Same Position Player</h3>
      <ul className='p-2'>
        {otherPlayerData.map(item => (
          <li key={item.id}>
            <Link
              to={`/teams/${slugId}/${teamId}/player/${item.id}`}
              className='flex justify-between items-center h-8 hover:bg-hoverColor'
            >
              <span>{item.displayName}</span>
              <span>#{item.jersey}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default OtherPlayer;