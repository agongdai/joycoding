import { symbolToPair } from '@myex/utils/trading';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface TradingState {
  favorites: string[];
  showFavorites: boolean;
  live: boolean;
  showTradingView: boolean;
  currentPair?: string;
}

// Define the initial state using that type
const initialState: TradingState = {
  favorites: [],
  showFavorites: false,
  live: true,
  showTradingView: true,
  currentPair: 'BTCUSD',
};

export const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((f) => f !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter((f) => f !== action.payload);
      } else {
        state.favorites = [...state.favorites, action.payload];
      }
    },
    toggleShowFavorites: (state) => {
      state.showFavorites = !state.showFavorites;
    },
    toggleLive: (state) => {
      state.live = !state.live;
    },
    toggleShowTradingView: (state) => {
      state.showTradingView = !state.showTradingView;
    },
    setCurrentPair: (state, action: PayloadAction<string>) => {
      state.currentPair = action.payload.startsWith('t')
        ? symbolToPair(action.payload)
        : action.payload;
    },
  },
});

export default tradingSlice.reducer;
