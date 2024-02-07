
import { Suspense, memo, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import Banner from '../components/teams/layout/Banner';
import Menu from '../components/teams/layout/Menu';
import Loading from '../components/Loading';
import Squad from '../components/teams/Squad/Squad';
import Fixtures from '../components/teams/teamInfo/Fixtures';
import Result from '../components/teams/teamInfo/result/Result';
import TeamInfoHome from '../components/teams/teamInfo/TeamInfoHome/TeamInfoHome';

import { useSuspenseQuery } from '@tanstack/react-query';
import useTeamDataStore from '../store/teamData-store';

const TeamInfo = memo(() => {
  const { slugId, teamId } = useParams<string>()
  const navigate = useNavigate()

  const { fetchTeamData } = useTeamDataStore()

  const [selectedMenu, setSelectedMenu] = useState<number>(1)

  const { data: teamData } = useSuspenseQuery({
    queryKey: ['teamData', slugId, teamId],
    queryFn: () => fetchTeamData(slugId, teamId)
  });

  // standingData에서 클릭시 현 시즌 slugId와 안맞으면 slugId params 수정
  useEffect(() => {
    if (teamData.defaultLeague.slug !== slugId) {
      navigate(`/teams/${teamData.defaultLeague.slug}/${teamId}`);
    }
  }, [navigate, slugId, teamData.defaultLeague.slug, teamId])

  return (
    <div className='inner'>
      <Banner data={teamData} />
      <Menu setSelectedMenu={setSelectedMenu} />
      <Suspense fallback={<Loading />}>
        {selectedMenu === 1 && <TeamInfoHome />}
        {selectedMenu === 2 && <Squad />}
        {selectedMenu === 3 && <Fixtures />}
        {selectedMenu === 4 && <Result />}
      </Suspense>
    </div>
  );
});

export default TeamInfo;