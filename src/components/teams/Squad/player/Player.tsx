import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import Stats from './Stats';

const Player = memo(() => {
  const { slugId, teamId, playerId } = useParams()

  const fetchPlayerData = async () => {
    const url = `http://sports.core.api.espn.com/v2/sports/soccer/leagues/${slugId}/athletes/${playerId}`
    try {
      const response = await axios.get(url);
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const { data: playerData }
    = useSuspenseQuery({
      queryKey: ['playerData', slugId, teamId, playerId],
      queryFn: () => fetchPlayerData()
    });

  // const { data: playersTeamData } = useSuspenseQuery({
  //   queryKey: ['playersTeamData', slugId, teamId, playerId],
  //   queryFn: () => fetchPlayerData()
  // });
  const height = (playerData.height * 2.54).toFixed(1);
  const weight = (playerData.weight * 0.453592).toFixed(1);
  return (
    <div className='inner'>
      <div className='h-48 flex flex-col items-center justify-center shadow-[#ffffff] shadow-md'>
        {/* {data.logos
        ? <img
          src={teamLogo.href}
          alt={data.displayName}
          title={data.displayName}
          className='w-24 '
        />
        : <i className='text-[96px]'><FaRegQuestionCircle /></i>} */}
        이름 {playerData.fullName}
        키{height} cm
        몸무게{weight} kg
        나이{playerData.age}
        <h2 className='text-[44px] font-bold'>
          {/* {data.displayName} */}
        </h2>
      </div>
      <Stats
        fetchUrl={playerData.statistics.$ref} />
    </div>
  );
});

export default Player;