import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import { findKingsPath, findQueensPath, findBishopsPath, findKnightsPath, findRooksPath, findPawnsPath, isKingSafe, isPlayerCheckmated } from '../util/helperFunctions';
import BoardGrid from './BoardGrids';
import PawnPromoteChoiceModal from './PawnPromoteChoiceModal';
import Header from './Header';
import SettingsModal from './SettingsModal';

const Board = () => {
    const [boardArray, setBoardArray] = useState([
        [25, 24, 23, 22, 21, 23, 24, 25],
        [26, 26, 26, 26, 26, 26, 26, 26],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [16, 16, 16, 16, 16, 16, 16, 16],
        [15, 14, 13, 12, 11, 13, 14, 15],
    ]);

    const [showPath, setShowPath] = useState(false);
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
    const [activePlayer, setActivePlayer] = useState(1);
    const [activePiece, setActivePiece] = useState();
    const [data, setData] = useState();
    const [showPromotePawnChoiceModal, setShowPromotePawnChoiceModal] = useState(false);
    const [whiteKingPosition, setWhiteKingPosition] = useState({
        row: 7,
        col: 4
    });
    const [blackKingPosition, setBlackKingPosition] = useState({
        row: 0,
        col: 4
    });
    const [isWhiteUnderCheck, setIsWhiteUnderCheck] = useState(false);
    const [isBlackUnderCheck, setIsBlackUnderCheck] = useState(false);
    const [isPlayerCheckmatedStatus, setIsPlayerCheckmatedStatus] = useState(0);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [isRotateOn, setIsRotateOn] = useState(true);

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

    useEffect(() => {
        checkHandler();
    }, [boardArray]);

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

    const promotePiece = (event, choice) => {
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
            <PawnPromoteChoiceModal
                show={showPromotePawnChoiceModal}
                onSubmit={promotePiece}
            />
            <SettingsModal
                show={showSettingsModal}
                onHide={() => setShowSettingsModal(false)}
                changeRotateStatus={(status) => setIsRotateOn(status)}
                isRotateOn={isRotateOn}
            />
            <Header
                showSettingsModal={() => setShowSettingsModal(true)} />
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
                className="my-3 mx-auto"
            >
                <Card.Body>
                    <Card.Title>
                        {activePlayer === 1 && "White's turn"}
                        {activePlayer === 2 && "Black's turn"}
                    </Card.Title>
                    <Card.Text>
                        {(isWhiteUnderCheck || isBlackUnderCheck) && isPlayerCheckmatedStatus === 0 && "Check"}
                        {isPlayerCheckmatedStatus === 1 && "CHECKMATE- Black wins"}
                        {isPlayerCheckmatedStatus === 2 && "CHECKMATE- White wins"}
                    </Card.Text>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default Board;