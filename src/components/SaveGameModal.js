import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SaveGameModal = (props) => {
    const [whitePlayer, setWhitePlayer] = useState('');
    const [blackPlayer, setBlackPlayer] = useState('');
    const [slotNumber, setSlotNumber] = useState(0);

    const isValidData = whitePlayer.length !== 0 && blackPlayer.length !== 0 && (slotNumber >= 1 && slotNumber <= 4);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Save Game
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => props.onSubmit(e, whitePlayer, blackPlayer, slotNumber)}>
                    <Form.Group className="mb-3" controlId="whitePlayer">
                        <Form.Label>White Player's name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={whitePlayer}
                            onChange={(event) => setWhitePlayer(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="blackPlayer">
                        <Form.Label>Black Player's name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={blackPlayer}
                            onChange={(event) => setBlackPlayer(event.target.value)} />
                    </Form.Group>
                    <Form.Select
                        aria-label="Default select example"
                        className='mb-3'
                        value={slotNumber}
                        onChange={(event) => setSlotNumber(event.target.value)}>
                        <option value="0">Select game slot</option>
                        <option value="1">Slot 1</option>
                        <option value="2">Slot 2</option>
                        <option value="3">Slot 3</option>
                        <option value="4">Slot 4</option>
                    </Form.Select>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!isValidData}>
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SaveGameModal;