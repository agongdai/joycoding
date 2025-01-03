import _pick from 'lodash/pick';

import {
  BookBulkyMessagesRaw,
  BookMessageRaw,
  BookRowParsed,
  ChanMeta,
  Frequency,
  Precision,
} from '@myex/types/book';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import adaptors from './adaptors';

// Define a type for the slice state
export interface BookState extends ChanMeta {
  asks: Record<number, BookRowParsed>;
  bids: Record<number, BookRowParsed>;
  pasks: number[];
  pbids: number[];
  tasks: number[];
  tbids: number[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: BookState = {
  asks: {},
  bids: {},
  pasks: [],
  pbids: [],
  tasks: [],
  tbids: [],
  chanId: undefined,
  freq: Frequency.F0,
  len: '25',
  pair: '',
  prec: Precision.P0,
  symbol: '',
  loading: false,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    updateMessage: (state, action: PayloadAction<BookMessageRaw>) => {
      const chanId = action.payload[0];
      if (chanId !== state.chanId) {
        return state;
      }

      return {
        ...state,
        ...adaptors.update(action.payload, state),
      };
    },
    updateBulkyMessages: (state, action: PayloadAction<BookBulkyMessagesRaw>) => {
      const chanId = action.payload[0];
      if (chanId !== state.chanId) {
        return state;
      }

      return action.payload[1].reduce((acc, payload) => {
        return {
          ...acc,
          ...adaptors.update([chanId, payload], acc),
          loading: false,
        };
      }, state);
    },
    chanSubscribed: (state, action: PayloadAction<ChanMeta>) => {
      return {
        ...state,
        ...action.payload,
        ..._pick(initialState, ['asks', 'bids', 'pasks', 'pbids', 'tasks', 'tbids']),
      };
    },
    chanUnsubscribed: (state) => {
      return {
        ...state,
        chanId: undefined,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export default bookSlice.reducer;
