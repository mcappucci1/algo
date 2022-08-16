import '../css/AlgoNavbar.scss';
import { memo, MouseEvent, useCallback, useMemo } from 'react';
import { pathfindingAlgos, sortAlgos, speeds } from '../utils/defaultValues';
import { NameValue } from '../utils/types';
import { NavbarDropdown } from './NavbarDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

interface Props {
    activeAlgo: NameValue;
    setAlgo: (algo: NameValue) => void;
    activeSpeed: NameValue;
    setSpeed: (speed: NameValue) => void;
}

export const AlgoNavbar = memo(function AlgoNavbarInternal({ activeAlgo, setAlgo, activeSpeed, setSpeed }: Props) {
    const handleAlgoChange = useCallback((event: MouseEvent<HTMLElement>) => {
        const name = event.currentTarget.getAttribute('id')!;
        const value = event.currentTarget.getAttribute('value')!;
        if (name === activeAlgo.name) return;
        setAlgo({ name, value });
    }, [activeAlgo]);

    const handleSpeedChange = useCallback((event: MouseEvent<HTMLElement>) => {
        const name = event.currentTarget.getAttribute('id')!;
        const value = event.currentTarget.getAttribute('value')!;
        if (name === activeSpeed.name) return;
        setSpeed({ name, value });
    }, [activeSpeed]);

    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='#home'>Search and Sort</Navbar.Brand>
                <Nav>
                    <NavbarDropdown title='Sort' objects={sortAlgos} active={activeAlgo} onClick={handleAlgoChange} />
                    <NavbarDropdown title='Pathfinding' objects={pathfindingAlgos} active={activeAlgo} onClick={handleAlgoChange} />
                    <NavbarDropdown title='Speed' objects={speeds} active={activeSpeed} onClick={handleSpeedChange} />
                    <Button className='ms-5' id='start-btn'>Start</Button>
                    <Button className='ms-2' id='end-btn'>End</Button>
                </Nav>
            </Container>
        </Navbar>
    )
});