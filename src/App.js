import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Menu from './pages/Menu';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default App;