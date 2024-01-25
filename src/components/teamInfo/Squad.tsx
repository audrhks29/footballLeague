import { memo } from 'react';

import GoalKeeper from './Squad/GoalKeeper';
import OutfieldPlayer from './Squad/OutfieldPlayer';

interface Props {
  data: PlayerDataType[];
}

const Squad = memo(({ data }: Props) => {

  const goalKeeperTh = [
    { id: 1, text: "NAME", title: "Player's Name" },
    { id: 2, text: "NO", title: "Player's Jersey" },
    { id: 3, text: "AGE", title: "Player's Age" },
    { id: 4, text: "HT", title: "Player's height" },
    { id: 5, text: "WT", title: "Player's Weight" },
    { id: 6, text: "NAT", title: "Player's nation" },
    { id: 7, text: "APP", title: "The number of times a player has made an appearance in a match." },
    { id: 8, text: "SUB", title: "The number of times a player has come on a sub in a match." },
    { id: 9, text: "SV", title: "The number of times a goalkeeper makes a save." },
    { id: 10, text: "GA", title: "The number of goals allowed by the goalkeeper." },
    { id: 11, text: "A", title: "The number of assists." },
    { id: 12, text: "FC", title: "The number of fouls committed by a player or team." },
    { id: 13, text: "FA", title: "The number of fouls suffered by a player or team." },
    { id: 14, text: "YC", title: "The number of yellow cards accumulated." },
    { id: 15, text: "RC", title: "The number of red cards that have been issued." },
  ]

  const outfieldPlayerTh = [
    { id: 1, text: "NAME", title: "Player's Name" },
    { id: 2, text: "NO", title: "Player's Jersey" },
    { id: 3, text: "AGE", title: "Player's Age" },
    { id: 4, text: "HT", title: "Player's height" },
    { id: 5, text: "WT", title: "Player's Weight" },
    { id: 6, text: "NAT", title: "Player's nation" },
    { id: 7, text: "APP", title: "The number of times a player has made an appearance in a match." },
    { id: 8, text: "SUB", title: "The number of times a player has come on a sub in a match." },
    { id: 9, text: "G", title: "The number of goals scored against the opposing team." },
    { id: 10, text: "A", title: "The number of assists." },
    { id: 11, text: "SH", title: "The number of shots attempted." },
    { id: 12, text: "ST", title: "The number of shots that are on goal." },
    { id: 13, text: "FC", title: "The number of fouls committed by a player or team." },
    { id: 14, text: "FA", title: "The number of fouls suffered by a player or team." },
    { id: 15, text: "YC", title: "The number of yellow cards accumulated." },
    { id: 16, text: "RC", title: "The number of red cards that have been issued." },
  ]

  return (
    <div>
      <h2 className='text-[20px] font-semibold mb-2'>GoalKeepers</h2>
      <table className='w-full text-center'>
        <colgroup>
          <col width={190} />
          <col width={60} />
          <col width={60} />
          <col width={75} />
          <col width={75} />
          <col width={190} />
        </colgroup>
        <thead className='border-y border-black h-8'>
          <tr>
            {goalKeeperTh.map((item, index) => (
              <th className='font-medium' key={index} title={item.title}>
                {item.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => {
            return (
              <GoalKeeper item={item} index={index} />
            )
          })}
        </tbody>
      </table>

      <h2 className='text-[20px] font-semibold mt-6 mb-2'>OutfieldPlayers</h2>
      <table className='w-full text-center'>
        <colgroup>
          <col width={190} />
          <col width={60} />
          <col width={60} />
          <col width={75} />
          <col width={75} />
          <col width={190} />
        </colgroup>
        <thead className='border-y border-black h-8'>
          <tr>
            {outfieldPlayerTh.map((item, index) => (
              <th className='font-medium' key={index} title={item.title}>
                {item.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => {
            return (
              <OutfieldPlayer item={item} index={index} />
            )
          })}
        </tbody>
      </table>

    </div>
  );
});

export default Squad;