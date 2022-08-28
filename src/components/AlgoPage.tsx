import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectStart, selectReset } from '../redux/controlSlice';
import { selectSpeed, selectAlgo } from '../redux/algorithmSlice';
import { Speed, SortAlgo } from '../utils/types';
import { SortBoard } from './SortBoard';
import { PathfindingBoard } from './PathfindingBoard';
import '../css/AlgoPage.css';

interface Props {
    showStartError: (show: boolean) => void;
    showTargetError: (show: boolean) => void;
}

export const AlgoPage = memo(function AlgoPageInteral({ showStartError, showTargetError }: Props) {
    const start = useSelector(selectStart);
    const reset = useSelector(selectReset);
    const algo = useSelector(selectAlgo);
    const speed = useSelector(selectSpeed);

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
                { Object.values(SortAlgo).includes(algo as SortAlgo) ? 
                    <SortBoard />
                :
                    <PathfindingBoard showStartError={showStartError} showTargetError={showTargetError} />
                }
            </div>
        </div>
    );    
});