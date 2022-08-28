import { memo, useCallback, useEffect } from 'react';
import { Grid } from './Grid';
import { Speed, Algo, PathfindingAlgo } from '../utils/types';
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
    setShowSetStartToast: (show: boolean) => void;
    setShowSetTargetToast: (show: boolean) => void;
}

const PATHFINDING = new Pathfinding();

export const PathfindingBoard = memo(function PathfindingBoardInternal({
    speed,
    algo,
    start,
    setStart,
    reset,
    setReset,
    setShowSetStartToast,
    setShowSetTargetToast
}: Props) {
    useEffect(() => {
        if (algo !== PATHFINDING.algo) {
            if (PATHFINDING.running) {
                setReset(true);
            }
            PATHFINDING.setAlgo(algo);
            setStart(false);
        }
    }, [algo]);

    useEffect(() => {
        if (speed !== PATHFINDING.speed) {
            PATHFINDING.setSpeed(speed);
            setStart(false);
        }
    }, [speed]);

    useEffect(() => {
        if (start) {
            PATHFINDING.getStartandEnd();
            if (PATHFINDING.start == undefined) setShowSetStartToast(true);
            else if (PATHFINDING.end == undefined) setShowSetTargetToast(true);
            else if (!PATHFINDING.running) PATHFINDING.findPath();
            setStart(false);
        } else if (reset) {
            PATHFINDING.stopExecution();
            setReset(false);
        }
    }, [start, reset]);

    useEffect(() => {
        PATHFINDING.setAll(algo, speed);
    }, []);

    const handleAlphaChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        PATHFINDING.alpha = parseInt(event.currentTarget.value);
    }, []);

    return (
        <div className='w-100'>
            <Grid reset={reset} />
            {PATHFINDING.algo === PathfindingAlgo.A_STAR &&
            <div id='alpha-container' className='w-100 mt-3'>
                <label className='me-3'>Alpha Value</label>
                <input type='number' id='alpha' name='alpha' onChange={handleAlphaChange} />
            </div>
            }
        </div>
    );
});