import { useSuspenseQueries } from '@tanstack/react-query';

import axios from 'axios';

import { memo } from 'react';

import { useParams } from 'react-router-dom';

import { FaRegQuestionCircle } from 'react-icons/fa';

import CurrentSeasonStats from '../components/teams/Squad/player/CurrentSeasonStats';
import Transactions from '../components/teams/Squad/player/Transactions';
import OtherPlayer from '../components/teams/Squad/player/OtherPlayer';
import ErrorCurrentSeasonStats from './../components/teams/Squad/player/error/ErrorCurrentSeasonStats';
import ErrorTransactions from '../components/teams/Squad/player/error/ErrorTransactions';
import NextMatch from '../components/teams/Squad/player/NextMatch';

const Player = memo(() => {
  const { slugId, teamId, playerId } = useParams()

  const fetchPlayerData = async () => {
    const url = `http://sports.core.api.espn.com/v2/sports/soccer/leagues/${slugId}/athletes/${playerId}`
    const response = await axios.get(url);
    return response.data
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

  // console.log(playerData);
  const logoImage = playerTeamData.logos.length > 0 ? playerTeamData.logos[1] : playerTeamData.logos[0]
  const height = isNaN(playerData.height) ? "-" : (playerData.height * 2.54).toFixed(1)
  const weight = isNaN(playerData.weight) ? "-" : (playerData.weight * 0.453592).toFixed(1);
  const name = playerData.displayName.split(" ")
  // console.log(playerData);
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
        {
          playerData.statistics
            ? <CurrentSeasonStats
              fetchUrl={playerData.statistics.$ref}
            /> : <ErrorCurrentSeasonStats />
        }
      </div>
      <div className='grid grid-cols-[350px_minmax(950px,_5fr)] items-start mt-6'>
        <OtherPlayer
          playerData={playerData}
        />

        {playerData.transactions
          ? <Transactions
            fetchUrl={playerData.transactions.$ref}
            playerData={playerData}
          /> : <ErrorTransactions />}

        <NextMatch
          fetchUrl={playerData.events.$ref} />
      </div>


    </div >
  );
});

export default Player;