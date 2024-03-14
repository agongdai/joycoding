import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import domReducer from './dom/slice';
import flagsReducer from './flags/slice';
import tradingReducer from './trading/slice';
import { loadState } from './localStorage';

const store = configureStore({
  reducer: {
    dom: domReducer,
    trading: tradingReducer,
    flags: flagsReducer,
  },
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useMyexDispatch: () => AppDispatch = useDispatch;
export const useMyexSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
