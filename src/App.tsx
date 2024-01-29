import { memo } from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';

import Header from './layout/Header';
import Main from './pages/Main';
import Standings from './pages/Standings';
import News from './pages/News';
import Board from './components/News/Board';
import Teams from './pages/Teams';
import TeamInfo from './pages/TeamInfo';
import Match from './pages/Match';
import MatchResult from './pages/MatchResult';

const App = memo(() => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:newsId" element={<Board />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:slugId/:teamId" element={<TeamInfo />} />
        <Route path='/match' element={<Match />} />
        <Route path='/match/:slugId/:gameId' element={<MatchResult />} />
      </Routes>
    </HashRouter>
  );
});

export default App;