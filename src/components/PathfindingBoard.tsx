import { memo } from 'react';
import { Grid } from './Grid';
import '../css/PathfindingBoard.css';

export const PathfindingBoard = memo(function PathfindingBoardInternal() {
    return (
        <div className='test w-100'>
            <Grid />
        </div>
    );
});