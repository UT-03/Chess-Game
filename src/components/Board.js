import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import { findKingsPath, findQueensPath, findBishopsPath, findKnightsPath, findRooksPath, findPawnsPath, isKingSafe, isPlayerCheckmated } from '../util/helperFunctions';
import BoardGrid from './BoardGrids';
import PawnPromoteChoiceModal from './PawnPromoteChoiceModal';
import Header from './Header';
import SettingsModal from './SettingsModal';
import SaveGameModal from './SaveGameModal';
import { useNavigate } from 'react-router-dom';
import { getSavedGames } from '../util/util';

const Board = (props) => {
    const [boardArray, setBoardArray] = useState(null);
    const [activePlayer, setActivePlayer] = useState(null);
    const [whiteKingPosition, setWhiteKingPosition] = useState(null);
    const [blackKingPosition, setBlackKingPosition] = useState(null);
    const [isWhiteUnderCheck, setIsWhiteUnderCheck] = useState(null);
    const [isBlackUnderCheck, setIsBlackUnderCheck] = useState(null);

    const [showPathArray, setShowPathArray] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    const [showPath, setShowPath] = useState(false);
    const [activePiece, setActivePiece] = useState();
    const [data, setData] = useState();
    const [isPlayerCheckmatedStatus, setIsPlayerCheckmatedStatus] = useState(0);
    const [isRotateOn, setIsRotateOn] = useState(true);
    const [showPromotePawnChoiceModal, setShowPromotePawnChoiceModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showSaveGameModal, setShowSaveGameModal] = useState(false);

    const [isBoardReady, setIsBoardReady] = useState(false);

    const navigate = useNavigate();

    // to populate states after the component mounts
    useEffect(() => {
        if (props.isLoadedGame) {
            setWhiteKingPosition(props.loadedGameData.gameData.whiteKingPosition);
            setBlackKingPosition(props.loadedGameData.gameData.blackKingPosition);
            setIsWhiteUnderCheck(props.loadedGameData.gameData.isWhiteUnderCheck);
            setIsBlackUnderCheck(props.loadedGameData.gameData.isBlackUnderCheck);
            setActivePlayer(props.loadedGameData.gameData.activePlayer);
            setBoardArray(props.loadedGameData.gameData.boardArray);
        }
        else {
            setActivePlayer(1);
            setWhiteKingPosition({
                row: 7,
                col: 4
            });
            setBlackKingPosition({
                row: 0,
                col: 4
            });
            setIsWhiteUnderCheck(false);
            setIsBlackUnderCheck(false);
            setBoardArray([
                [25, 24, 23, 22, 21, 23, 24, 25],
                [26, 26, 26, 26, 26, 26, 26, 26],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [16, 16, 16, 16, 16, 16, 16, 16],
                [15, 14, 13, 12, 11, 13, 14, 15],
            ]);
        }
    }, []);

    // to validate the state 'isBoardReady' if all other states are properly initialised
    useEffect(() => {
        if (boardArray !== null && activePlayer !== null && whiteKingPosition !== null && blackKingPosition !== null && isWhiteUnderCheck !== null && isBlackUnderCheck !== null)
            setIsBoardReady(true);
        else
            setIsBoardReady(false);
    }, [boardArray, activePlayer, whiteKingPosition, blackKingPosition, isWhiteUnderCheck, isBlackUnderCheck]);

    // to check if player is checkmated if under check
    useEffect(() => {
        // check if white is checkmated
        if (isWhiteUnderCheck) {
            if (isPlayerCheckmated(1, boardArray)) {
                setIsPlayerCheckmatedStatus(1);
            }
        }

        // check if black is checkmated
        if (isBlackUnderCheck) {
            if (isPlayerCheckmated(2, boardArray)) {
                setIsPlayerCheckmatedStatus(2);
            }
        }
    }, [isBlackUnderCheck, isWhiteUnderCheck]);

    // function to save game to local storage
    const saveGame = (e, whitePlayerName, blackPlayerName, slotNumber) => {
        e.preventDefault();

        setShowSaveGameModal(false);

        let savedGames = getSavedGames();

        savedGames[slotNumber - 1] = {
            slot: slotNumber,
            whitePlayerName: whitePlayerName,
            blackPlayerName: blackPlayerName,
            gameData: {
                boardArray: boardArray,
                activePlayer: activePlayer,
                whiteKingPosition: whiteKingPosition,
                blackKingPosition: blackKingPosition,
                isWhiteUnderCheck: isWhiteUnderCheck,
                isBlackUnderCheck: isBlackUnderCheck
            },
            isGameSavedinThisSlot: true
        }

        localStorage.setItem('chessGames', JSON.stringify(savedGames));

        navigate('/');
    }

    // function to check if player is under check
    const checkHandler = () => {
        if (isKingSafe(whiteKingPosition.row, whiteKingPosition.col, boardArray)) {
            setIsWhiteUnderCheck(false);
        }
        else {
            setIsWhiteUnderCheck(true);
        }

        if (isKingSafe(blackKingPosition.row, blackKingPosition.col, boardArray)) {
            setIsBlackUnderCheck(false);
        }
        else {
            setIsBlackUnderCheck(true);
        }
    }

    // to check if player is under check after every change in boardArray
    useEffect(() => {
        if (isBoardReady)
            checkHandler();
    }, [boardArray, isBoardReady]);

    // function to toggle activePlayer
    const toggleActivePlayer = () => {
        setActivePlayer(prevState => {
            if (prevState === 1)
                return 2;
            else if (prevState === 2)
                return 1;
        })
    }

    const findPathFuncs = (param, x, y) => {
        switch (param) {
            case 1:
                return findKingsPath(x, y, boardArray, showPathArray);
            case 2:
                return findQueensPath(x, y, boardArray, showPathArray);
            case 3:
                return findBishopsPath(x, y, boardArray, showPathArray);
            case 4:
                return findKnightsPath(x, y, boardArray, showPathArray);
            case 5:
                return findRooksPath(x, y, boardArray, showPathArray);
            case 6:
                return findPawnsPath(x, y, boardArray, showPathArray);
        }
    }

    // show path for the piece at (x,y)
    const showPathFunc = (x, y) => {
        setActivePiece({
            row: x,
            col: y
        })

        const showPathArray$ = findPathFuncs(Math.floor(boardArray[x][y] % 10), x, y);
        setShowPath(true);
        setShowPathArray(showPathArray$);
    }

    // show path
    const hidePathFunc = () => {
        setShowPathArray([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]);
        setShowPath(false);
    }

    //  move the active piece to (x,y)
    const movePiece = (x, y) => {
        let boardArray$ = [...boardArray];

        // if active piece is king
        if (Math.floor(boardArray$[activePiece.row][activePiece.col]) % 10 === 1) {
            if (activePlayer === 1)
                setWhiteKingPosition(() => {
                    return {
                        row: x,
                        col: y
                    }
                });
            else
                setBlackKingPosition(() => {
                    return {
                        row: x,
                        col: y
                    }
                });
        }

        boardArray$[x][y] = boardArray$[activePiece.row][activePiece.col];
        boardArray$[activePiece.row][activePiece.col] = 0;

        setBoardArray(() => boardArray$);
    }

    // remove the piece at (x,y)
    const removePiece = (x, y) => {
        let boardArray$ = [...boardArray];

        boardArray$[x][y] = 0;

        setBoardArray(() => boardArray$);
    }

    // function to promote Pawn
    const promotePawn = (event, choice) => {
        event.preventDefault();

        movePiece(data.row, data.col);

        const boardArray$ = [...boardArray];
        boardArray$[data.row][data.col] = activePlayer + choice;
        setBoardArray(() => boardArray$);

        hidePathFunc();
        setShowPromotePawnChoiceModal(false);
        setActivePiece(null);
        setData(null);
        toggleActivePlayer();
    }

    // function to handler gridbox click
    const gridBoxClickHandler = (x, y) => {
        if (isPlayerCheckmatedStatus !== 0)
            return;
        if (!showPath) {
            if (boardArray[x][y] !== 0 && (Math.floor(boardArray[x][y] / 10) === activePlayer))
                showPathFunc(x, y);
        }
        else {
            if (showPathArray[x][y] === 1) {
                movePiece(x, y);
                toggleActivePlayer();
                hidePathFunc();
                setActivePiece(null);
            }
            else if (showPathArray[x][y] === -1) {
                removePiece(x, y);
                movePiece(x, y);
                toggleActivePlayer();
                hidePathFunc();
                setActivePiece(null);
            }
            else if (showPathArray[x][y] === 2) {
                setShowPromotePawnChoiceModal(true);
                setData({
                    row: x,
                    col: y
                });
            }
            else {
                hidePathFunc();
                setActivePiece(null);
            }
        }
    }

    return (
        <React.Fragment>
            {isBoardReady && (
                <React.Fragment>
                    <PawnPromoteChoiceModal
                        show={showPromotePawnChoiceModal}
                        onSubmit={promotePawn}
                    />
                    <SettingsModal
                        show={showSettingsModal}
                        onHide={() => setShowSettingsModal(false)}
                        changeRotateStatus={(status) => setIsRotateOn(status)}
                        isRotateOn={isRotateOn}
                    />
                    <SaveGameModal
                        show={showSaveGameModal}
                        onHide={() => setShowSaveGameModal(false)}
                        onSubmit={saveGame} />
                    <Header
                        showSettingsModal={() => setShowSettingsModal(true)}
                        showSaveGameModal={() => setShowSaveGameModal(true)} />
                    <Container
                        style={{
                            transform: `${isRotateOn ? `rotate(${activePlayer === 2 ? 180 : 0}deg)` : 'rotate(0deg)'}`,
                            transition: "all 1s"
                        }}
                    >
                        <BoardGrid
                            boardArray={boardArray}
                            showPath={showPath}
                            showPathArray={showPathArray}
                            activePlayer={activePlayer}
                            onGridClick={gridBoxClickHandler}
                            isWhiteUnderCheck={isWhiteUnderCheck}
                            whiteKingPosition={whiteKingPosition}
                            isBlackUnderCheck={isBlackUnderCheck}
                            blackKingPosition={blackKingPosition}
                            isRotateOn={isRotateOn} />
                    </Container>
                    <Card
                        style={{ width: '18rem' }}
                        className="my-3 mx-auto shadow-lg"
                    >
                        <Card.Body>
                            <Card.Title>
                                {props.isLoadedGame ?
                                    activePlayer === 1 ? `White's${` (${props.loadedGameData.whitePlayerName}'s)`} turn` : activePlayer === 2 ? `Black's${` (${props.loadedGameData.blackPlayerName}'s)`} turn` : null
                                    :
                                    activePlayer === 1 ? "White's turn" : activePlayer === 2 ? "Black's turn" : null
                                }
                            </Card.Title>
                            <Card.Text>
                                {(isWhiteUnderCheck || isBlackUnderCheck) && isPlayerCheckmatedStatus === 0 && "Check"}
                                {isPlayerCheckmatedStatus === 1 && "CHECKMATE- Black wins"}
                                {isPlayerCheckmatedStatus === 2 && "CHECKMATE- White wins"}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default Board;