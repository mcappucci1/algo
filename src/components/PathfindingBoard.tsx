import { memo, useCallback, useEffect } from 'react';
import { Grid } from './Grid';
import { Speed, Algo } from '../utils/types';
import { Pathfinding } from '../utils/Pathfinding';
import '../css/PathfindingBoard.css';
import '../css/Grid.css';

interface Props {
    speed: Speed;
    algo: Algo;
    start: boolean;
    setStart: (start: boolean) => void;
    reset: boolean;
    setReset: (reset: boolean) => void;
}

const PATHFINDING = new Pathfinding();

export const PathfindingBoard = memo(function PathfindingBoardInternal({
    speed,
    algo,
    start,
    setStart,
    reset,
    setReset
}: Props) {

    useEffect(() => {
        if (algo !== PATHFINDING.algo) {
            PATHFINDING.setAlgo(algo);
            PATHFINDING.resetBoard();
            setStart(false);
        }
    }, [algo]);

    useEffect(() => {
        if (speed !== PATHFINDING.speed) {
            PATHFINDING.setSpeed(speed);
            PATHFINDING.resetBoard();
            setStart(false);
        }
    }, [speed]);

    useEffect(() => {
        if (start) {
            PATHFINDING.findPath();
        } else if (reset) {
            PATHFINDING.resetBoard();
            setReset(false);
        }
    }, [start, reset]);

    useEffect(() => {
        PATHFINDING.setAll(algo, speed);
    }, []);

    return (
        <div className='w-100'>
            <Grid />
        </div>
    );
});