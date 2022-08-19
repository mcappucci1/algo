import { memo, useCallback, useEffect, useState } from 'react';
import { Algo, Speed } from '../utils/types';
import { shuffleArray, NUM_ITEMS } from '../utils/common';
import { Sort } from '../utils/Sort';
import '../css/SortBoard.css';

interface Props {
    speed: Speed;
    algo: Algo;
    start: boolean;
    setStart: (start: boolean) => void;
    reset: boolean;
    setReset: (reset: boolean) => void;
}

const SORT = new Sort();

export const SortBoard = memo(function SortBoardInternal({ speed, algo, start, reset, setStart, setReset }: Props) {
    const createRandomItems = useCallback(() => {
        const [heights, step]: [number[], number] = [[], 100 / NUM_ITEMS];
        for (let i = 0; i < NUM_ITEMS; ++i) heights.push(step * i + step);
        shuffleArray(heights);
        return heights.map((e, i) => <div key={i} id={i.toString()} className='item' style={{height: e + '%'}} />);
    }, []);

    const [items, setItems] = useState<JSX.Element[]>(createRandomItems());

    const resetBoard = useCallback(() => {
        if (SORT.timerId != null) setItems(createRandomItems());
        setStart(false);
    }, [])

    useEffect(() => {
        if (algo !== SORT.algo) {
            SORT.setAlgo(algo);
            resetBoard();
        }
    }, [algo, resetBoard]);

    useEffect(() => {
        if (speed !== SORT.speed) {
            SORT.setSpeed(speed);
            resetBoard();
        }
    }, [speed, resetBoard]);

    useEffect(() => {
        if (start) SORT.sort();
        else if (reset) {
            SORT.clear();
            SORT.resetAppearance();
            setItems(createRandomItems());
            setReset(false);
        }
    }, [start, reset]);

    useEffect(() => {
        SORT.setAll(algo, speed, items.length);
        return SORT.clear();
    }, []);

    return (
        <div className='sort-board-container d-flex align-items-end'>
            {items}
        </div>
    );
});