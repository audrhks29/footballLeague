import { memo } from 'react';

import SummarizeStats from '../TeamInfoHome/SummarizeStats';
import NextEvent from '../TeamInfoHome/NextEvent';
import SummarizeResult from '../TeamInfoHome/SummarizeResult';


const TeamInfoHome = memo(() => {
  return (
    <>
      {/* top */}
      <SummarizeStats />
      {/* left */}
      <NextEvent />
      <SummarizeResult />
    </>
  );
});

export default TeamInfoHome;