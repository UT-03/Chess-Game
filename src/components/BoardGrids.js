import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

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

const BoardGrid = (props) => {
    let boardsEls = props.boardArray.map((row, i) => {
        return (
            <Row
                className='m-auto'
                style={{
                    width: `${SIZE_OF_GRIDBOX * 8}px`
                }}
                key={i}>
                {row.map((col, j) => {
                    const isGridUnderCheck = (props.isWhiteUnderCheck && i === props.whiteKingPosition.row && j === props.whiteKingPosition.col) || (props.isBlackUnderCheck && i === props.blackKingPosition.row && j === props.blackKingPosition.col);
                    let gridBoxStyles = {};
                    if ((i + j) % 2 === 0)
                        gridBoxStyles = {
                            backgroundColor: "#eeeed2"
                        }
                    else
                        gridBoxStyles = {
                            backgroundColor: "#769656"
                        }

                    if (isGridUnderCheck)
                        gridBoxStyles = {
                            backgroundColor: "#0f5132"
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
                            onClick={() => props.onGridClick(i, j)}
                        >
                            <React.Fragment>
                                <div
                                    style={{
                                        position: "absolute",
                                        height: "100%",
                                        width: "100%",
                                        top: "0",
                                        left: "0",
                                        backgroundColor: props.showPathArray[i][j] === -1 ? "red" : (props.showPathArray[i][j] === 1 ? "#0000005e" : props.showPathArray[i][j] === 2 ? "#ab00ff5e" : "#ffffff00"),
                                        boxShadow: "inset 2px 2px 10px 2px #ffffffa3, inset -2px -2px 10px 2px #ffffffa3",
                                        display: ((props.showPath && (props.showPathArray[i][j] === 1 || props.showPathArray[i][j] === -1 || props.showPathArray[i][j] === 2)) || isGridUnderCheck) ? "block" : "none"
                                    }}
                                ></div>
                                {/* i={i},<wbr />j={j},<wbr />p={props.boardArray[i][j]} */}
                                {props.boardArray[i][j] !== 0 && (
                                    <Image src={PIECE_IMAGE[props.boardArray[i][j]]}
                                        style={{
                                            transform: `rotate(${props.activePlayer === 2 ? 180 : 0}deg)`,
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
        <div>{boardsEls}</div>
    );
};

export default BoardGrid;