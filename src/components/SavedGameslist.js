import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const SavedGamesList = (props) => {
    return (
        <ListGroup>
            {props.savedGames.map((game, index) => (
                <ListGroup.Item disabled={!game.isGameSavedinThisSlot} key={index}>
                    <Row>
                        <Col>
                            {game.isGameSavedinThisSlot ?
                                <h6>{game.whitePlayerName} vs {game.blackPlayerName}</h6>
                                : 'Slot empty'
                            }</Col>
                        <Col>
                            <Button
                                className='d-block ms-auto'
                                disabled={!game.isGameSavedinThisSlot}
                                onClick={() => props.onLoad(game)}>Load</Button>
                        </Col>
                    </Row>
                </ListGroup.Item>

            ))}

        </ListGroup>
    );
};

export default SavedGamesList;