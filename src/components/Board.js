import king_white from '../assets/images/king_white.png';
import queen_white from '../assets/images/queen_white.png';
import bishop_white from '../assets/images/bishop_white.png';
import knight_white from '../assets/images/knight_white.png';
import rook_white from '../assets/images/rook_white.png';
import pawn_white from '../assets/images/pawn_white.png';

import king_black from '../assets/images/king_black.png';
import queen_black from '../assets/images/queen_black.png';
import bishop_black from '../assets/images/bishop_black.png';
import knight_black from '../assets/images/knight_black.png';
import rook_black from '../assets/images/rook_black.png';
import pawn_black from '../assets/images/pawn_black.png';

import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { showKingsPath, showQueensPath, showBishopsPath, showKnightsPath, showRooksPath, showPawnsPath } from '../util/helperFunctions';

/*
white will have 1 at first place
black will have 2 at first digit

2nd digit:
king-1
queen-2
bishop-3
knight-4
rook-5
pawn-6
*/

const PIECE_IMAGE = {
    11: king_white,
    12: queen_white,
    13: bishop_white,
    14: knight_white,
    15: rook_white,
    16: pawn_white,

    21: king_black,
    22: queen_black,
    23: bishop_black,
    24: knight_black,
    25: rook_black,
    26: pawn_black,
}

const SIZE_OF_GRIDBOX = 80;

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

    const toggleActivePlayer = () => {
        setActivePlayer(prevState => {
            if (prevState === 1)
                return 2;
            else if (prevState === 2)
                return 1;
        })
    }

    const showPathFunc = (i, j) => {
        setActivePiece({
            row: i,
            col: j
        })

        switch (boardArray[i][j] % 10) {
            case 1:
                showKingsPath(i, j, boardArray, showPathArray, setShowPathArray, setShowPath);
                break;
            case 2:
                showQueensPath(i, j, boardArray, showPathArray, setShowPathArray, setShowPath);
                break;
            case 3:
                showBishopsPath(i, j, boardArray, showPathArray, setShowPathArray, setShowPath);
                break;
            case 4:
                showKnightsPath(i, j, boardArray, showPathArray, setShowPathArray, setShowPath);
                break;
            case 5:
                showRooksPath(i, j, boardArray, showPathArray, setShowPathArray, setShowPath);
                break;
            case 6:
                showPawnsPath(i, j, boardArray, showPathArray, setShowPathArray, setShowPath);
                break;
            default:
                console.log("default");
                break;
        }
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

    const movePiece = (i, j) => {
        let boardArray$ = [...boardArray];

        boardArray$[i][j] = boardArray$[activePiece.row][activePiece.col];
        boardArray$[activePiece.row][activePiece.col] = 0;

        setBoardArray(() => boardArray$);
    }

    const removePiece = (i, j) => {
        let boardArray$ = [...boardArray];

        boardArray$[i][j] = 0;

        setBoardArray(() => boardArray$);
    }

    const gridBoxClickHandler = (i, j) => {
        if (!showPath) {
            if (boardArray[i][j] !== 0 && (Math.floor(boardArray[i][j] / 10) === activePlayer))
                showPathFunc(i, j);
        }
        else if (showPath) {
            if (showPathArray[i][j] === 1) {
                movePiece(i, j);
                toggleActivePlayer();
            }
            else if (showPathArray[i][j] === -1) {
                removePiece(i, j);
                movePiece(i, j);
                toggleActivePlayer();
            }
            hidePathFunc();
            setActivePiece(null);
        }
    }

    let boardsEls = boardArray.map((row, i) => {
        return (
            <Row
                className='m-auto'
                style={{
                    width: `${SIZE_OF_GRIDBOX * 8}px`
                }}
                key={i}>
                {row.map((col, j) => {
                    let gridBoxStyles = {};
                    if ((i + j) % 2 === 0)
                        gridBoxStyles = {
                            backgroundColor: "#eeeed2"
                        }
                    else
                        gridBoxStyles = {
                            backgroundColor: "#769656"
                        }

                    return (
                        <Col
                            className='p-0 text-center d-flex justify-content-center align-items-center position-relative'
                            style={{
                                width: `${SIZE_OF_GRIDBOX}px`,
                                height: `${SIZE_OF_GRIDBOX}px`,
                                ...gridBoxStyles
                            }}
                            key={j}
                            onClick={() => gridBoxClickHandler(i, j)}
                        >
                            <React.Fragment>
                                <div
                                    style={{
                                        position: "absolute",
                                        height: "100%",
                                        width: "100%",
                                        top: "0",
                                        left: "0",
                                        backgroundColor: showPathArray[i][j] === -1 ? "red" : (showPathArray[i][j] === 1 ? "#0000005e" : "#ab00ff5e"),
                                        boxShadow: "inset 2px 2px 10px 2px #ffffffa3, inset -2px -2px 10px 2px #ffffffa3",
                                        display: (showPath && (showPathArray[i][j] === 1 || showPathArray[i][j] === -1 || showPathArray[i][j] === 2)) ? "block" : "none"
                                    }}
                                ></div>
                                {boardArray[i][j] !== 0 && (
                                    <Image src={PIECE_IMAGE[boardArray[i][j]]}
                                        style={{
                                            transform: `rotate(${activePlayer === 2 ? 180 : 0}deg)`,
                                            transition: "all 1s"
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        </Col>
                    )
                })}
            </Row>
        )
    })

    return (
        <React.Fragment>
            <Container
                style={{
                    transform: `rotate(${activePlayer === 2 ? 180 : 0}deg)`,
                    transition: "all 1s"
                }}
            >
                <div>
                    {boardsEls}
                </div>
            </Container>
        </React.Fragment>
    )
}

export default Board;