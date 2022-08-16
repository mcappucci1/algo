import { memo, useState } from 'react';
import { AlgoNavbar } from './AlgoNavbar';
import { sortAlgos, speeds } from '../utils/defaultValues';
import { NameValue } from '../utils/types';

export const App = memo(function AppInternal() {
    const [algo, setAlgo] = useState<NameValue>(sortAlgos[0]);
    const [speed, setSpeed] = useState<NameValue>(speeds[0]);

    return (
        <AlgoNavbar activeAlgo={algo} setAlgo={setAlgo} activeSpeed={speed} setSpeed={setSpeed} />
    );
});
