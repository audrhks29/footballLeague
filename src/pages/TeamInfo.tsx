import axios from 'axios';

import { memo, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Banner from '../components/teamInfo/layout/Banner';
import Menu from '../components/teamInfo/layout/Menu';
import TeamInfoHome from '../components/teamInfo/TeamInfoHome';
import Squad from '../components/teamInfo/Squad';
import Fixtures from '../components/teamInfo/Fixtures';
import Result from '../components/teamInfo/Result';

const TeamInfo = memo(() => {
  const { teamId, slugId } = useParams<string>();

  // data관련 state
  const [playerData, setPlayerData] = useState(null)
  const [coachData, setCoachData] = useState(null)
  const [teamData, setTeamData] = useState<TeamInfoType | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResultType[]>([]);

  // menu관련 state
  const [selectedMenu, setSelectedMenu] = useState<number>(1)

  const fetchData = async () => {
    // 팀 관련
    try {
      const responseTeam = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/teams/${teamId}`);
      const data = responseTeam.data.team
      setTeamData(data)


      // 팀 경기결과 관련
      const responseScoreboard = await axios.get(`http://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/scoreboard?dates=2024&limit=1000`)
      if (responseScoreboard.data.events) {
        const attachData = responseScoreboard.data.events.filter(item =>
          item.competitions[0].competitors.some(competitor => competitor.id === teamId)
        );
        setMatchResult(attachData);
      }

      // 선수 로스터 관련
      const responseRoster = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/teams/${teamId}/roster`);
      const player = responseRoster.data.athletes;
      const coach = responseRoster.data.coach;
      setPlayerData(player)
      setCoachData(coach)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  // console.log(matchResult);
  useEffect(() => {
    fetchData();
  }, [])

  // console.log(matchResult);
  return (
    <div className='inner'>
      {teamData && <Banner data={teamData} />}
      <Menu setSelectedMenu={setSelectedMenu} />
      {/* <MatchResult data={matchResult} /> */}
      {selectedMenu === 1 && <TeamInfoHome teamData={teamData} matchResult={matchResult} />}
      {selectedMenu === 2 && <Squad data={playerData} />}
      {selectedMenu === 3 && <Fixtures data={matchResult} />}
      {selectedMenu === 4 && <Result data={matchResult} />}
    </div>
  );
});

export default TeamInfo;