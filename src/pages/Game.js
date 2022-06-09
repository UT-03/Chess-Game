import React from 'react';
import Board from '../components/Board';

const Game = (props) => {
    return (
        <Board
            isLoadedGame={props.isLoadedGame}
            loadedGameData={props.loadedGameData} />
    );
};

export default Game;