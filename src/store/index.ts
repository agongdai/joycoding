import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import bookReducer from './book/slice';
import domReducer from './dom/slice';
import flagsReducer from './flags/slice';
import { socketMiddleware } from './middleware/socket.middleware';
import tradingReducer from './trading/slice';
import wssReducer from './wss/slice';
import { loadState } from './localStorage';
import { Socket } from './Socket';

const store = configureStore({
  reducer: {
    dom: domReducer,
    trading: tradingReducer,
    flags: flagsReducer,
    wss: wssReducer,
    book: bookReducer,
  },
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(new Socket())),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useMyexDispatch: () => AppDispatch = useDispatch;
export const useMyexSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
