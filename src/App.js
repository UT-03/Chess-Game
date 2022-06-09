import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Menu from './pages/Menu';
import './custom.scss';

const App = () => {
  const [isLoadedGame, setIsLoadedGame] = useState(false);
  const [loadedGameData, setLoadedGameData] = useState();

  return (
    <Routes>
      <Route path="/" element={
        <Menu
          setIsLoadedGame={setIsLoadedGame}
          setLoadedGameData={setLoadedGameData} />
      } />
      <Route
        path="/game"
        element={
          <Game
            isLoadedGame={isLoadedGame}
            loadedGameData={loadedGameData} />
        } />
    </Routes>
  );
};

export default App;