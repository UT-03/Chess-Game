import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <Container>
            <Row>
                <Col className="rounded mx-5 my-3 text-center fs-5">
                    <Nav.Link as={Link} to={"/game-local"}>Local game</Nav.Link>
                </Col>
                <Col className="rounded mx-5 my-3 text-center fs-5">
                    <Nav.Link as={Link} to={"/game-online"}>Online game</Nav.Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Menu;