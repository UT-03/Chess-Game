import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import saveIcon from '../assets/images/saveIcon.svg';
import settingsIcon from '../assets/images/settingsIcon.svg';

const Header = props => {
    return (
        <Navbar bg="light" expand="lg" className="mb-3">
            <Container>
                <Navbar.Brand>Chess</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Button variant="primary" onClick={props.showSaveGameModal} className="my-2 mx-2">
                            <Image src={saveIcon} fluid style={{
                                width: "25px",
                                height: "25px"
                            }}
                                className='me-1' />
                            Save
                        </Button>
                        <Button variant="primary" onClick={props.showSettingsModal} className="my-2">
                            <Image src={settingsIcon} fluid style={{
                                width: "25px",
                                height: "25px"
                            }}
                                className='me-1' />
                            Settings
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;