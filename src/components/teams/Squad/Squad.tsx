import { memo } from 'react';

import useRosterDataStore from '../../../store/rosterData-store';
import { goalKeeperTh, outfieldPlayerTh } from '../../../assets/ArrayData';

import OutfieldPlayer from './OutfieldPlayer';
import GoalKeeper from './GoalKeeper';

const Squad = memo(() => {
  const { rosterData } = useRosterDataStore()

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
        <thead className='border-y h-8'>
          <tr>
            {goalKeeperTh.map((item, index) => (
              <th className='font-medium' key={index} title={item.title}>
                {item.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rosterData && rosterData.map((item, index) => {
            return (
              <GoalKeeper item={item} index={index} key={index} />
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
        <thead className='border-y h-8'>
          <tr>
            {outfieldPlayerTh.map((item, index) => (
              <th className='font-medium' key={index} title={item.title}>
                {item.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rosterData && rosterData.map((item, index) => {
            return (
              <OutfieldPlayer item={item} index={index} key={index} />
            )
          })}
        </tbody>
      </table>

    </div>
  );
});

export default Squad;