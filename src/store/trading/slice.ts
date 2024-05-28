import { Exchange } from '@myex/types/exchange';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface TradingState {
  favorites: string[];
  showFavorites: boolean;
  wsLive: Record<Exchange, boolean>;
  showTradingView: boolean;
  currentCurrency?: string;
}

// Define the initial state using that type
const initialState: TradingState = {
  favorites: [],
  showFavorites: false,
  wsLive: {
    [Exchange.Bitfinex]: true,
    [Exchange.Binance]: false,
    [Exchange.OKX]: false,
    [Exchange.Bitget]: false,
    [Exchange.Gate]: false,
  },
  showTradingView: true,
  currentCurrency: 'BTC',
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
    toggleWsLive: (state, action: PayloadAction<Exchange>) => {
      state.wsLive[action.payload] = !state.wsLive[action.payload];
    },
    toggleShowTradingView: (state) => {
      state.showTradingView = !state.showTradingView;
    },
    setCurrentCurrency: (state, action: PayloadAction<string>) => {
      state.currentCurrency = action.payload;
    },
  },
});

export default tradingSlice.reducer;
