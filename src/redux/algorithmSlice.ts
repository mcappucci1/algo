import { createSlice } from "@reduxjs/toolkit";
import { Algo, Speed, SortAlgo } from "../utils/types";
import { RootState } from './store';

interface AlgorithmState {
    algo: Algo;
    speed: Speed;
}

const initialState: AlgorithmState = {
    algo: SortAlgo.BUBBLE_SORT,
    speed: Speed.MEDIUM
};

export const algorithmSlice = createSlice({
    name: "algorithm",
    initialState,
    reducers: {
        setAlgo: (state, action) => {
            state.algo = action.payload;
        },
        setSpeed: (state, action) => {
            state.speed = action.payload;
        }
    }
});

export const { setAlgo, setSpeed } = algorithmSlice.actions;

export const algorithmReducer = algorithmSlice.reducer;

export const selectAlgo = (state: RootState) => state.algorithm.algo;

export const selectSpeed = (state: RootState) => state.algorithm.speed;