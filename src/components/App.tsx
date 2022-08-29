import { memo, useState } from 'react';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { AlgoNavbar } from './AlgoNavbar';
import { AlgoPage } from './AlgoPage';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export const App = memo(function AppInternal() {
    const [showSetStart, setShowSetStart] = useState<boolean>(false);
    const [showSetTarget, setShowSetTarget] = useState<boolean>(false);

    return (
        <Provider store={store}>
            <AlgoNavbar />
            <ToastContainer className="p-3" position='top-center'>
                <Toast
                    show={(showSetStart || showSetTarget)}
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
                showStartError={setShowSetStart}
                showTargetError={setShowSetTarget}
            />
        </Provider>
    );
});
