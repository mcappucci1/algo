import { Fragment, memo, useState } from 'react';
import { AlgoNavbar } from './AlgoNavbar';
import { AlgoPage } from './AlgoPage';
import { Algo, PathfindingAlgo, SortAlgo, Speed } from '../utils/types';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export const App = memo(function AppInternal() {
    const [algo, setAlgo] = useState<Algo>(SortAlgo.BUBBLE_SORT);
    const [speed, setSpeed] = useState<Speed>(Speed.SLOW);
    const [start, setStart] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [showSetStart, setShowSetStart] = useState<boolean>(false);
    const [showSetTarget, setShowSetTarget] = useState<boolean>(false);

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
            <ToastContainer className="p-3" position='top-center'>
                <Toast
                    show={Object.values(PathfindingAlgo).includes(algo as PathfindingAlgo) && (showSetStart || showSetTarget)}
                    delay={5000}
                    autohide
                    onClose={() => { setShowSetStart(false); setShowSetTarget(false); }}
                    bg="danger"
                >
                    <Toast.Header>
                        <strong className="me-auto text-dark">
                            {`Error: Must set ${showSetStart ? "start" : "target"} cell for search`}
                        </strong>
                    </Toast.Header>
                </Toast>
            </ToastContainer>
            <AlgoPage
                algo={algo}
                speed={speed}
                start={start}
                reset={reset}
                setStart={setStart}
                setReset={setReset}
                setShowSetStartToast={setShowSetStart}
                setShowSetTargetToast={setShowSetTarget}
            />
        </Fragment>
    );
});
