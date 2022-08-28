import '../css/AlgoNavbar.scss';
import { memo, MouseEvent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStart, setReset, selectStart, selectReset } from '../redux/controlSlice';
import { setAlgo, setSpeed, selectSpeed, selectAlgo } from '../redux/algorithmSlice';
import { Algo, Speed, SortAlgo, PathfindingAlgo } from '../utils/types';
import { NavbarDropdown } from './NavbarDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export const AlgoNavbar = memo(function AlgoNavbarInternal() {
    const dispatch = useDispatch();
    const start = useSelector(selectStart);
    const reset = useSelector(selectReset);
    const algo = useSelector(selectAlgo);
    const speed = useSelector(selectSpeed);

    const handleAlgoChange = useCallback((event: MouseEvent<HTMLElement>) => {
        const value = event.currentTarget.getAttribute('value')!;
        if (value !== algo) dispatch(setAlgo(value as Algo));
    }, [algo, dispatch]);

    const handleSpeedChange = useCallback((event: MouseEvent<HTMLElement>) => {
        const value = event.currentTarget.getAttribute('value')!;
        if (value !== speed) dispatch(setSpeed(value as Speed));
    }, [speed, dispatch]);

    const handleStart = useCallback(() => {
        if (!start) dispatch(setStart(true));
        if (reset)  dispatch(setReset(false));
    }, [start, reset, setStart, setReset]);

    const handleReset = useCallback(() => {
        if (start)  dispatch(setStart(false));
        if (!reset) dispatch(setReset(true));
    }, [start, reset, setStart, setReset, dispatch]);

    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='#home'>Search and Sort</Navbar.Brand>
                <Nav>
                    <NavbarDropdown
                        title='Sort'
                        objects={Object.values(SortAlgo)}
                        active={algo}
                        onClick={handleAlgoChange}
                    />
                    <NavbarDropdown
                        title='Pathfinding'
                        objects={Object.values(PathfindingAlgo)}
                        active={algo}
                        onClick={handleAlgoChange}
                    />
                    <NavbarDropdown
                        title='Speed'
                        objects={Object.values(Speed)}
                        active={speed}
                        onClick={handleSpeedChange}
                    />
                    <Button className='ms-5' id='start-btn' onClick={handleStart}>Start</Button>
                    <Button className='ms-2' id='end-btn' onClick={handleReset}>Reset</Button>
                </Nav>
            </Container>
        </Navbar>
    )
});