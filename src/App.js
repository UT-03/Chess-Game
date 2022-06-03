import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GameLocal from './pages/GameLocal';
import GameOnline from './pages/GameOnline';
import Menu from './pages/Menu';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/game-local" element={<GameLocal />} />
      <Route path="/game-online" element={<GameOnline />} />
    </Routes>
  );
};

export default App;