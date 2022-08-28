import { createSlice } from "@reduxjs/toolkit";
import { RootState } from './store';

interface ControlState {
    start: boolean;
    reset: boolean;
}

const initialState: ControlState = {
    start: false,
    reset: false
};

export const controlSlice = createSlice({
    name: "control",
    initialState,
    reducers: {
        setStart: (state, action) => {
            state.start = action.payload;
        },
        setReset: (state, action) => {
            state.reset = action.payload;
        }
    }
});

export const { setStart, setReset } = controlSlice.actions;

export const controlReducer = controlSlice.reducer;

export const selectStart = (state: RootState) => state.control.start;

export const selectReset = (state: RootState) => state.control.reset;