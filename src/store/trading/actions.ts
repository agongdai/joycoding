import { tradingSlice } from './slice';

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  toggleShowFavorites,
  toggleLive,
  toggleShowTradingView,
  setCurrentPair,
} = tradingSlice.actions;
