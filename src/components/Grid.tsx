
import { Fragment, memo, MouseEvent, useCallback, useMemo } from "react";
import { getIdFromCoordinate, NUM_COLS, NUM_ROWS } from "../utils/common";
import { CellType } from '../utils/types';
import '../css/Grid.css';

export const Grid = memo(function GridInternal() {
    const handleRightClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        const cell = event.currentTarget;
        if (cell.classList.contains(CellType.BLOCKED)) cell.classList.remove(CellType.BLOCKED);
        else cell.classList.add(CellType.BLOCKED);
    }, []);

    const handleLeftClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const cell = event.currentTarget;
        console.log(cell);
        if (cell.classList.contains(CellType.START)) {
            cell.classList.remove(CellType.START);
            cell.classList.add(CellType.TARGET);
        } else if (cell.classList.contains(CellType.TARGET)) {
            cell.classList.remove(CellType.TARGET);
        } else {
            cell.classList.add(CellType.START)
        } 
    }, []);

    const board: JSX.Element[] = useMemo(() => {
        const boardCells: JSX.Element[][] = [];
        const height = 100 / NUM_ROWS + '%', width = 100 / NUM_COLS + '%';
        for (let i = 0; i < NUM_ROWS; ++i) {
            boardCells.push([]);
            for (let j = 0; j < NUM_COLS; ++j) {
                const uniqueId = getIdFromCoordinate({ x: i, y: j});
                boardCells[i].push(<div key={uniqueId} id={uniqueId} className="cell" style={{ width }} onClick={handleRightClick} onContextMenu={handleLeftClick} />);
            }
        }
        return boardCells.map((row, index) => <div key={index} className="cell-row" style={{ height }} >{row}</div>);
    }, []);

    return (
        <Fragment>
            {board}
        </Fragment>
    );
});