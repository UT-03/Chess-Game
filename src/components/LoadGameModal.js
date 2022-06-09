import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SavedGamesList from './SavedGameslist';
import { getSavedGames } from '../util/util';

const LoadGameModal = props => {
    let savedGames = getSavedGames();

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Load Game
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SavedGamesList savedGames={savedGames} onLoad={props.onLoad} />
            </Modal.Body>
        </Modal>
    );
};

export default LoadGameModal;