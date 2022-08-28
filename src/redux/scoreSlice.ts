import { createSlice } from "@reduxjs/toolkit";

interface ScoreState {
    currentScore: number;
    bestScore: number;
}

const initialState: ScoreState = {
    currentScore: 0,
    bestScore: 0
};

export const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {
        setCurrentScore: (state, action) => {
            state.currentScore = action.payload;
        },
        setBestScore: (state, action) => {
            state.bestScore = action.payload;
        }
    }
});

export const { setCurrentScore, setBestScore } = scoreSlice.actions;

export const scoreReducer = scoreSlice.reducer;