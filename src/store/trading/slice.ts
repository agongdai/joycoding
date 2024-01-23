import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface TradingState {
  favorites: string[];
  showFavorites: boolean;
  live: boolean;
}

// Define the initial state using that type
const initialState: TradingState = {
  favorites: [],
  showFavorites: false,
  live: false,
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
  },
});

export default tradingSlice.reducer;
