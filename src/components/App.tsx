import { Fragment, memo, useState } from 'react';
import { AlgoNavbar } from './AlgoNavbar';
import { AlgoPage } from './AlgoPage';
import { Algo, SortAlgo, Speed } from '../utils/types';

export const App = memo(function AppInternal() {
    const [algo, setAlgo] = useState<Algo>(SortAlgo.BUBBLE_SORT);
    const [speed, setSpeed] = useState<Speed>(Speed.MEDIUM);

    return (
        <Fragment>
            <AlgoNavbar activeAlgo={algo} setAlgo={setAlgo} activeSpeed={speed} setSpeed={setSpeed} />
            <AlgoPage algo={algo} speed={speed} />
        </Fragment>
    );
});
