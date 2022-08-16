import '../css/AlgoNavbar.scss';
import { memo, MouseEvent, useCallback, useMemo } from 'react';
import { pathfindingAlgos, sortAlgos, speeds } from '../utils/defaultValues';
import { NameValue } from '../utils/types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

interface Props {
    activeAlgo: NameValue;
    setAlgo: (algo: NameValue) => void;
    activeSpeed: NameValue;
    setSpeed: (speed: NameValue) => void;
}

const createAlgoDropdowns = (objects: NameValue[], active: NameValue, onClick: (event: MouseEvent<HTMLElement>) => void) => {
    return objects.map((object) => {
        return (
            <NavDropdown.Item
                key={object.name}
                value={object.value}
                id={object.name}
                active={active.name === object.name}
                onClick={onClick}
            >
                {object.name}
            </NavDropdown.Item>
        );
    });
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

    const sortDropdowns = useMemo(() => createAlgoDropdowns(sortAlgos, activeAlgo, handleAlgoChange), [activeAlgo]);

    const pathfindingDropdowns = useMemo(() => createAlgoDropdowns(pathfindingAlgos, activeAlgo, handleAlgoChange), [activeAlgo]);

    const speedDropdowns = useMemo(() => createAlgoDropdowns(speeds, activeSpeed, handleSpeedChange), [activeSpeed]);

    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='#home'>Search and Sort</Navbar.Brand>
                <Nav>
                    <NavDropdown title='Sort'>
                        { sortDropdowns }
                    </NavDropdown>
                    <NavDropdown title='Pathfinding' className='ms-2'>
                        { pathfindingDropdowns }
                    </NavDropdown>
                    <NavDropdown title='Speed' className='ms-2'>
                        { speedDropdowns }
                    </NavDropdown>
                    <Button className='ms-5' id='start-btn'>Start</Button>
                    <Button className='ms-2' id='end-btn'>End</Button>
                </Nav>
            </Container>
        </Navbar>
    )
});