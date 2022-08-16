import { memo } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

export const AlgoNavbar = memo(function AlgoNavbarInternal() {
    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='#home'>Search and Sort</Navbar.Brand>
                <Nav>
                    <NavDropdown title='Sort'>
                        <NavDropdown.Item href='#action/3.1'>Sorting Algo</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title='Search' className='ms-2'>
                        <NavDropdown.Item href='#action/3.1'>Search Algo</NavDropdown.Item>
                    </NavDropdown>
                    <Button className='ms-5'>Start</Button>
                    <Button className='ms-2'>End</Button>
                    <NavDropdown title='Speed' className='ms-2'>
                        <NavDropdown.Item href='#action/3.1'>Slow</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
});