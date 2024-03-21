import { tradingSlice } from './slice';

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  toggleShowFavorites,
  toggleLive,
  toggleShowTradingView,
  setCurrentCurrency,
} = tradingSlice.actions;
