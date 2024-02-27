import { Suspense, memo } from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './layout/Header';
import Main from './pages/Main';
import Standings from './pages/Standings';
import News from './pages/News';
import Teams from './pages/Teams';
import TeamInfo from './pages/TeamInfo';
import Match from './pages/Match';
import MatchResult from './pages/MatchResult';
import Loading from './components/Loading';

const queryClient = new QueryClient()

const App = memo(() => {

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/standings/:slugId/:yearId" element={<Standings />} />
            <Route path="/news/:slugId" element={<News />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:slugId/:teamId" element={<TeamInfo />} />
            <Route path='/match' element={<Match />} />
            <Route path='/match/:slugId/:gameId' element={<MatchResult />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </QueryClientProvider>
  );
});

export default App;