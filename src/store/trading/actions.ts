import { tradingSlice } from './slice';

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  toggleShowFavorites,
  toggleWsLive,
  toggleShowTradingView,
  setCurrentCurrency,
} = tradingSlice.actions;
