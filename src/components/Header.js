import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import settingsIcon from '../assets/images/settingsIcon.svg';

const Header = props => {
    return (
        <Navbar bg="light" expand="lg" className="mb-3">
            <Container>
                <Navbar.Brand>Chess</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Button variant="primary" onClick={props.showSettingsModal} className="my-2">
                            <Image src={settingsIcon} fluid style={{
                                width: "25px",
                                height: "25px",
                                filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(162deg) brightness(101%) contrast(104%)",
                                marginRight: "5px"
                            }} />
                            Settings
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;