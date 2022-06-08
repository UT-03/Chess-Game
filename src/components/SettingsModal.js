import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const SettingsModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Rotate board?"
                        checked={props.isRotateOn}
                        onChange={(event) => props.changeRotateStatus(event.target.checked)}
                    />
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SettingsModal;