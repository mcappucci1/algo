import { memo, useMemo } from 'react';
import { Algo, Speed, SortAlgo } from '../utils/types';
import { SortBoard } from './SortBoard';
import { PathfindingBoard } from './PathfindingBoard';
import '../css/AlgoPage.css';

interface Props {
    algo: Algo;
    speed: Speed;
    start: boolean;
    setStart: (start: boolean) => void;
    reset: boolean;
    setReset: (reset: boolean) => void;
}

export const AlgoPage = memo(function AlgoPageInteral({ algo, speed, start, reset, setStart, setReset }: Props) {
    const speedColor = useMemo(() => {
        switch(speed) {
            case Speed.SLOW: return 'text-success';
            case Speed.MEDIUM: return 'text-info';
            case Speed.FAST: return 'text-warning';
            case Speed.SUPER_FAST: return 'text-danger';
        }
    }, [speed]);

    return (
        <div className='text-center'>
            <h1 className='mt-5'>{algo}</h1>
            <h5>Speed: <span className={speedColor}>{speed}</span></h5>
            <div className='board-container mx-auto mt-4 d-flex'>
                {Object.values(SortAlgo).includes(algo as SortAlgo) ? 
                <SortBoard speed={speed} algo={algo} start={start} reset={reset} setStart={setStart} setReset={setReset} /> :
                <PathfindingBoard speed={speed} algo={algo} start={start} reset={reset} setStart={setStart} setReset={setReset} />}
            </div>
        </div>
    );    
});