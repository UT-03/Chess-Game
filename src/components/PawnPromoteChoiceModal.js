import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const PawnPromoteChoiceModal = (props) => {
    const [choice, setChoice] = useState(1);

    const changeChoice = (e) => {
        setChoice(e.target.id);
    }

    //  2-Queen 3-Bishop    4-Knight    5-Rook
    const radioArray = [
        {
            id: 2,
            label: "Queen"
        },
        {
            id: 3,
            label: "Bishop"
        },
        {
            id: 4,
            label: "Knight"
        },
        {
            id: 5,
            label: "Rook"
        }
    ]
    return (
        <Modal
            show={props.show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Promote Pawn to</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event) => props.onSubmit(event, choice)}>
                    {radioArray.map(elem => (
                        <Form.Check
                            key={elem.id}
                            type="radio"
                            id={elem.id}
                            name="choice"
                            label={elem.label}
                            onChange={(e) => changeChoice(e)}
                        />
                    ))}
                    <Button variant='primary' type='submit'>Promote</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PawnPromoteChoiceModal;