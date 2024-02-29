import { useSuspenseQueries } from '@tanstack/react-query';
import axios from 'axios';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import Stats from './Stats';
import { FaRegQuestionCircle } from 'react-icons/fa';

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
  const getTeamLogo = async () => {
    const url = `http://sports.core.api.espn.com/v2/sports/soccer/teams/${teamId}?lang=en&region=us`
    const response = await axios.get(url);
    return response.data
  }
  const [{ data: playerData }, { data: playerTeamData }]
    = useSuspenseQueries({
      queries: [
        {
          queryKey: ['playerData', slugId, teamId, playerId],
          queryFn: () => fetchPlayerData()
        },
        {
          queryKey: ['playerTeamData', slugId, teamId],
          queryFn: () => getTeamLogo()
        },

      ]
    });

  const logoImage = playerTeamData.logos[1] ? playerTeamData.logos[1] : playerTeamData.logos[0]
  const height = (playerData.height * 2.54).toFixed(1);
  const weight = (playerData.weight * 0.453592).toFixed(1);
  const name = playerData.displayName.split(" ")

  return (
    <div className='inner'>
      <div className='h-48 py-3 px-5 flex shadow-[#ffffff] shadow-md overflow-hidden'>

        {logoImage
          ? <img
            src={logoImage.href}
            alt={logoImage.displayName}
            title={logoImage.displayName}
          />
          : <i className='text-[96px]'><FaRegQuestionCircle /></i>}

        <ul className='px-7 py-5 flex flex-col justify-around'>
          <li className='text-[40px] leading-[44px]'>
            <p>{name[0]}</p>
            <p>{name[1]}</p>
          </li>
          <li>{playerTeamData.shortDisplayName} / #{playerData.jersey} / {playerData.position.displayName}</li>
        </ul>

        <div className='flex flex-col justify-center px-7 w-[350px] text-[16px]'>
          <div className='flex justify-between'>
            <p className='w-[130px]'>HT(cm) / WT(kg)</p>
            <span>{height} / {weight}</span>
          </div>
          <div className='flex justify-between'>
            <p className='w-[130px]'>BIRTHDATE</p>
            <span>{playerData.dateOfBirth.slice(0, 10)}({playerData.age})</span>
          </div>
          <div className='flex justify-between'>
            <p className='w-[130px]'>NATIONALITY</p>
            <span>{playerData.citizenship}</span>
          </div>
        </div>

        <Stats
          fetchUrl={playerData.statistics.$ref} />
      </div>

    </div >
  );
});

export default Player;