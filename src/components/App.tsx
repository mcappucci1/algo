import { Fragment, memo, useState } from 'react';
import { AlgoNavbar } from './AlgoNavbar';
import { AlgoPage } from './AlgoPage';
import { Algo, SortAlgo, Speed } from '../utils/types';

export const App = memo(function AppInternal() {
    const [algo, setAlgo] = useState<Algo>(SortAlgo.BUBBLE_SORT);
    const [speed, setSpeed] = useState<Speed>(Speed.SLOW);
    const [start, setStart] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);

    return (
        <Fragment>
            <AlgoNavbar
                activeAlgo={algo}
                setAlgo={setAlgo}
                activeSpeed={speed}
                setSpeed={setSpeed}
                setStart={setStart}
                setReset={setReset}
            />
            <AlgoPage algo={algo} speed={speed} start={start} reset={reset} setStart={setStart} setReset={setReset} />
        </Fragment>
    );
});
