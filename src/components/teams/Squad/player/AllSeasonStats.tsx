import { useSuspenseQuery } from '@tanstack/react-query';

import axios from 'axios';

import { memo } from 'react';

import { useParams } from 'react-router-dom';

interface Props {
  fetchUrl: string;
  position: string
}

const AllSeasonStats = memo((props: Props) => {
  const { playerId } = useParams();

  const fetchSeasonsData = async () => {
    const url = `http://sports.core.api.espn.com/v2/sports/soccer/leagues/all/athletes/${playerId}/seasons?lang=en&region=us&limit=1000`
    const response = await axios.get(url);
    return response.data.items
  }

  const { data: playerSeasonsData }
    = useSuspenseQuery({
      queryKey: ['playerSeasonsData', playerId],
      queryFn: () => fetchSeasonsData()
    });

  const fetchData = async () => {
    try {
      const promises = playerSeasonsData.map((obj: { $ref: string; }) => {
        const url = obj.$ref.replace('?lang=en&region=us', `/types/1/athletes/${playerId}/statistics?lang=en&region=us`);
        return axios.get(url);
      });
      const resolvedResponses = await Promise.allSettled(promises);
      return resolvedResponses
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const { data: fetchedData }: { data: fetchedDataTypes[] | undefined }
    = useSuspenseQuery({
      queryKey: ['fetchedData', playerId],
      queryFn: () => fetchData(),
      select: data => data?.filter(item => item.value).map(item => item.value.data)
    });

  const fetchSeasonName = async () => {
    try {
      if (!fetchedData) return [];
      const promises = fetchedData?.map(obj => {
        const url = obj.season.$ref
        return axios.get(url);
      });
      const resolvedResponses = await Promise.allSettled(promises);
      return resolvedResponses
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  // console.log(fetchedData);
  const { data: seasonNameData }
    = useSuspenseQuery({
      queryKey: ['seasonNameData', playerId],
      queryFn: () => fetchSeasonName(),
      select: data => data?.filter((item) => item.value).map(item => item.value.data)
    });

  const goalKeeperTh = [
    { id: 1, name: "Season" },
    { id: 2, name: "App" },
    { id: 3, name: "Sub" },
    { id: 4, name: "Save" },
    { id: 5, name: "Goals Conceded" },
    { id: 6, name: "Assists" },
    { id: 7, name: "Foul" },
    { id: 8, name: "Yellow Card" },
    { id: 9, name: "Red Card" },
  ]

  const fieldTh = [
    { id: 1, name: "Season" },
    { id: 2, name: "App" },
    { id: 3, name: "Sub" },
    { id: 4, name: "Goals" },
    { id: 4, name: "Assists" },
    { id: 6, name: "Shots" },
    { id: 7, name: "Shot On Target" },
    { id: 8, name: "Foul" },
    { id: 9, name: "Yellow Card" },
    { id: 10, name: "Red Card" },
  ]

  return (
    <div className='border w-[950px] rounded-2xl p-5 mb-6'>
      <h3 className='border-b border-hoverColor text-[22px]'>All Season Stats</h3>
      <table className='text-center w-full'>
        <thead>
          <tr className='h-11 border-b text-[15px] thFont'>
            {props.position === "1"
              ? goalKeeperTh.map(item =>
                <th key={item.id}>{item.name}</th>
              )
              : fieldTh.map(item =>
                <th key={item.id}>{item.name}</th>
              )}
          </tr>
        </thead>
        <tbody>
          {fetchedData?.map((item, index) => {
            const generalData = item.splits.categories.find(category => category.name == "general")
            const offensiveData = item.splits.categories.find(category => category.name == "offensive")
            const app = generalData?.stats.find(stat => stat.name === 'appearances');
            const subIn = generalData?.stats.find(stat => stat.name === 'subIns');
            const totalGoals = offensiveData?.stats.find(stat => stat.name === 'totalGoals');
            const goalAssists = offensiveData?.stats.find(stat => stat.name === 'goalAssists');
            const totalShots = offensiveData?.stats.find(stat => stat.name === 'totalShots');
            const shotsOnTarget = offensiveData?.stats.find(stat => stat.name === 'shotsOnTarget');
            const foulsCommitted = generalData?.stats.find(stat => stat.name === 'foulsCommitted');
            const yellowCard = generalData?.stats.find(stat => stat.name === 'yellowCards');
            const redCard = generalData?.stats.find(stat => stat.name === 'redCards');
            const seasonName = seasonNameData[index].displayName
            if (props.position === "1") {
              const goalKeepingData = item.splits.categories.find(category => category.name == "goalKeeping")
              const goalsConceded = goalKeepingData?.stats.find(stat => stat.name === 'goalsConceded');
              const save = goalKeepingData?.stats.find(stat => stat.name === 'saves');
              return (
                <tr key={index} className='h-8 border-b border-tableBorderColor last:border-b-0'>
                  <td className='text-left'>{seasonName}</td>
                  <td>{app?.value}</td>
                  <td>{subIn?.value}</td>
                  <td>{save?.value}</td>
                  <td>{goalsConceded?.value}</td>
                  <td>{goalAssists?.value}</td>
                  <td>{foulsCommitted?.value}</td>
                  <td>{yellowCard?.value}</td>
                  <td>{redCard?.value}</td>
                </tr>
              )
            }
            else {
              return (
                <tr key={index} className='h-8 border-b border-tableBorderColor last:border-b-0'>
                  <td className='text-left'>{seasonName}</td>
                  <td>{app?.value}</td>
                  <td>{subIn?.value}</td>
                  <td>{totalGoals?.value}</td>
                  <td>{goalAssists?.value}</td>
                  <td>{totalShots?.value}</td>
                  <td>{shotsOnTarget?.value}</td>
                  <td>{foulsCommitted?.value}</td>
                  <td>{yellowCard?.value}</td>
                  <td>{redCard?.value}</td>
                </tr>
              )
            }
          })}

        </tbody>
      </table>
    </div>
  );
});

export default AllSeasonStats;