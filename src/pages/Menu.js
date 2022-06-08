import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import menuBackground from '../assets/images/menuBackground.jpg';

const Menu = () => {
    return (
        <Container
            fluid
            className="vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: `url(${menuBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Row className='w-75'>
                <Col className="rounded mx-5 my-3 text-center fs-5">
                    <Button as={Link} to={"/game"} className="me-2" style={{ backgroundColor: '#769656' }}>Start new game</Button>
                    <Button as={Link} to={"/game"} style={{ backgroundColor: '#eeeed2' }}>Load game</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Menu;