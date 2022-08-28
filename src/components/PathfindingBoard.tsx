import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStart, setReset, selectStart, selectReset } from '../redux/controlSlice';
import { selectSpeed, selectAlgo } from '../redux/algorithmSlice';
import { Grid } from './Grid';
import { PathfindingAlgo } from '../utils/types';
import { Pathfinding } from '../utils/Pathfinding';
import '../css/PathfindingBoard.css';
import '../css/Grid.css';

interface Props {
    showStartError: (show: boolean) => void;
    showTargetError: (show: boolean) => void;
}

const PATHFINDING = new Pathfinding();

export const PathfindingBoard = memo(function PathfindingBoardInternal({ showStartError, showTargetError}: Props) {
    const dispatch = useDispatch();
    const start = useSelector(selectStart);
    const reset = useSelector(selectReset);
    const algo = useSelector(selectAlgo);
    const speed = useSelector(selectSpeed);

    const [alpha, setAlpha] = useState<number>(0.5);

    useEffect(() => {
        if (algo !== PATHFINDING.algo) {
            if (PATHFINDING.running) dispatch(setReset(true));
            PATHFINDING.setAlgo(algo);
            dispatch(setStart(false));
        }
    }, [algo, dispatch]);

    useEffect(() => {
        if (speed !== PATHFINDING.speed) {
            PATHFINDING.setSpeed(speed);
            dispatch(setStart(false));
        }
    }, [speed, dispatch]);

    useEffect(() => {
        if (start) {
            PATHFINDING.getStartandEnd();
            if (PATHFINDING.start == undefined) showStartError(true);
            else if (PATHFINDING.end == undefined) showTargetError(true);
            else if (!PATHFINDING.running) {
                PATHFINDING.alpha = alpha;
                PATHFINDING.findPath();
            }
            dispatch(setStart(false));
        } else if (reset) {
            PATHFINDING.stopExecution();
            dispatch(setReset(false));
        }
    }, [start, reset, dispatch]);

    useEffect(() => {
        PATHFINDING.setAll(algo, speed);
    }, []);

    const handleAlphaChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAlpha(parseFloat(event.currentTarget.value));
    }, [setAlpha]);

    return (
        <div className='w-100'>
            <Grid reset={reset} />
            {algo === PathfindingAlgo.A_STAR &&
            <div id='alpha-container' className='w-100 mt-3'>
                <label className='me-3'>Alpha Value</label>
                <input type='number' id='alpha' name='alpha' onChange={handleAlphaChange} value={alpha} />
            </div>
            }
        </div>
    );
});