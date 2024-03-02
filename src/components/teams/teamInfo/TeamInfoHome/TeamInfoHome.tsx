import { memo } from 'react';

import SummarizeStats from './SummarizeStats';
import NextEvent from './NextEvent';
import SummarizeResult from './summarizeResult/SummarizeResult';
import useTeamDataStore from '../../../../store/teamData-store';

const TeamInfoHome = memo(() => {
  const { teamData } = useTeamDataStore()
  console.log(teamData);
  return (
    <>
      {/* top */}
      <SummarizeStats />
      {/* left */}
      <SummarizeResult />
      <NextEvent />
    </>
  );
});

export default TeamInfoHome;