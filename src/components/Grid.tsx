
import { Fragment, memo, MouseEvent, useCallback, useMemo, useState } from "react";
import { getIdFromCoordinate, NUM_COLS, NUM_ROWS } from "../utils/common";
import { CellType } from '../utils/types';
import '../css/Grid.css';

export const Grid = memo(function GridInternal() {
    const [start, setStart] = useState<boolean>(false);
    const [target, setTarget] = useState<boolean>(false);

    const handleRightClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        const cell = event.currentTarget.classList;
        if (cell.contains(CellType.START) || cell.contains(CellType.TARGET)) return;
        if (cell.contains(CellType.BLOCKED)) cell.remove(CellType.BLOCKED);
        else cell.add(CellType.BLOCKED);
    }, []);

    const handleLeftClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const cell = event.currentTarget.classList;
        if (cell.contains(CellType.BLOCKED)) return;
        else if (cell.contains(CellType.START)) {
            cell.remove(CellType.START);
            setStart(false);
            if (!target) {
                cell.add(CellType.TARGET);
                setTarget(true);
            }
        } else if (cell.contains(CellType.TARGET)) {
            cell.remove(CellType.TARGET);
            setTarget(false);
        } else {
            if (!start) {
                cell.add(CellType.START);
                setStart(true);
            } else if (start && !target) {
                cell.add(CellType.TARGET);
                setTarget(true);
            }
        }
    }, [start, target]);

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
    }, [start, target]);

    return (
        <Fragment>
            {board}
        </Fragment>
    );
});