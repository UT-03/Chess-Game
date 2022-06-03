import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <Container className="vh-100 d-flex align-items-center justify-content-center">
            <Row className='w-75'>
                <Col className="rounded mx-5 my-3 text-center fs-5">
                    <Button as={Link} to={"/game-local"}>Local game</Button>
                </Col>
                <Col className="rounded mx-5 my-3 text-center fs-5">
                    <Button as={Link} to={"/game-online"}>Online game</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Menu;