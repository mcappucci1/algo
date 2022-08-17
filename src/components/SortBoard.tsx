import { memo, useEffect, useMemo } from 'react';
import { Algo, Speed } from '../utils/types';
import { Sort } from '../utils/Sort';
import '../css/SortBoard.css';

interface Props {
    speed: Speed;
    algo: Algo;
}

export const SortBoard = memo(function SortBoardInternal({ speed, algo }: Props) {
    const items = useMemo(() => {
        const lst = [];
        for (let i = 0; i < 50; ++i) {
            const random = Math.random() * 100;
            lst.push(<div key={i} id={i.toString()} className='item' style={{ height: random + '%' }} />);
        }
        return lst;
    }, []);

    useEffect(() => {
        const sort = new Sort(algo, speed, items);
        sort.sort();
        return () => sort.clear();
    }, [speed, algo, items]);

    return (
        <div className='sort-board-container d-flex align-items-end'>
            {items}
        </div>
    );
});