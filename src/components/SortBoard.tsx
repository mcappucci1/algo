import { memo, useMemo } from 'react';
import '../css/SortBoard.css';

export const SortBoard = memo(function SortBoardInternal() {
    const items = useMemo(() => {
        const lst = [];
        for (let i = 0; i < 50; ++i) {
            const random = Math.random() * 100;
            lst.push(<div key={i} id={i.toString()} className='item' style={{ height: random + '%' }} />);
        }
        return lst;
    }, []);

    return (
        <div className='sort-board-container d-flex align-items-end'>
            {items}
        </div>
    );
});