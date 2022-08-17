import '../css/AlgoNavbar.scss';
import { memo, MouseEvent, useCallback } from 'react';
import { Algo, Speed, SortAlgo, PathfindingAlgo } from '../utils/types';
import { NavbarDropdown } from './NavbarDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

interface Props {
    activeAlgo: Algo;
    setAlgo: (algo: Algo) => void;
    activeSpeed: Speed;
    setSpeed: (speed: Speed) => void;
}

export const AlgoNavbar = memo(function AlgoNavbarInternal({ activeAlgo, setAlgo, activeSpeed, setSpeed }: Props) {
    const handleAlgoChange = useCallback((event: MouseEvent<HTMLElement>) => {
        const value = event.currentTarget.getAttribute('value')!;
        if (value === activeAlgo) return;
        setAlgo(value as Algo);
    }, [activeAlgo]);

    const handleSpeedChange = useCallback((event: MouseEvent<HTMLElement>) => {
        const value = event.currentTarget.getAttribute('value')!;
        if (value === activeSpeed) return;
        setSpeed(value as Speed);
    }, [activeSpeed]);

    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='#home'>Search and Sort</Navbar.Brand>
                <Nav>
                    <NavbarDropdown title='Sort' objects={Object.values(SortAlgo)} active={activeAlgo} onClick={handleAlgoChange} />
                    <NavbarDropdown title='Pathfinding' objects={Object.values(PathfindingAlgo)} active={activeAlgo} onClick={handleAlgoChange} />
                    <NavbarDropdown title='Speed' objects={Object.values(Speed)} active={activeSpeed} onClick={handleSpeedChange} />
                    <Button className='ms-5' id='start-btn'>Start</Button>
                    <Button className='ms-2' id='end-btn'>Reset</Button>
                </Nav>
            </Container>
        </Navbar>
    )
});