import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import menuBackground from '../assets/images/menuBackground.jpg';
import LoadGameModal from '../components/LoadGameModal';

const Menu = props => {
    const [showSaveGameModal, setShowSaveGameModal] = useState(false);

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <LoadGameModal
                show={showSaveGameModal}
                onHide={() => setShowSaveGameModal(false)}
                onLoad={(gameData) => {
                    props.setLoadedGameData(gameData);
                    props.setIsLoadedGame(true);
                    navigate('/game');
                }} />
            <Container
                fluid
                className="pb-5 vh-100 d-flex flex-column align-items-center justify-content-end"
                style={{
                    background: `url(${menuBackground})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <Row className='w-lg-75 mb-5'>
                    <Col className="rounded mx-5 my-3 text-center fs-5">
                        <Button
                            type='button'
                            className="my-1 mx-2 btn-lg"
                            variant='primary'
                            onClick={() => {
                                props.setIsLoadedGame(false);
                                navigate('/game');
                            }}>New game</Button>
                        <Button
                            type='button'
                            className='my-1 mx-2 btn-lg'
                            variant='secondary'
                            onClick={() => setShowSaveGameModal(true)}>Load game</Button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Menu;