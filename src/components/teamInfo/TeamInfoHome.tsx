import { memo } from 'react';

import SummarizeStats from './TeamInfoHome/SummarizeStats';
import NextEvent from './TeamInfoHome/NextEvent';
import SummarizeResult from './TeamInfoHome/SummarizeResult';

interface Props {
  teamData: TeamInfoType | null;
  matchResult: MatchResultType[];
}

const TeamInfoHome = memo(({ teamData, matchResult }: Props) => {
  // console.log(teamData);

  return (
    <>

      {/* top */}
      {teamData && <SummarizeStats data={teamData} />}

      {/* left */}
      {teamData && <NextEvent data={teamData} />}
      {teamData && <SummarizeResult data={teamData} matchResult={matchResult} />}
    </>
  );
});

export default TeamInfoHome;