import { configureStore } from '@reduxjs/toolkit';
import { controlReducer } from './controlSlice';
import { scoreReducer } from './scoreSlice';
import { algorithmReducer } from './algorithmSlice';

export const store = configureStore({
    reducer: {
        control: controlReducer,
        count: scoreReducer,
        algorithm: algorithmReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;