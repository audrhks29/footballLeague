import { memo } from 'react';

import SummarizeStats from './SummarizeStats';
import NextEvent from './NextEvent';
import SummarizeResult from './summarizeResult/SummarizeResult';

const TeamInfoHome = memo(() => {
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