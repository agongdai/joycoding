import { Coin, OnChainWallet } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface FlagsState {
  createCoinModalOpen: boolean;
  upsertWalletModalOpen: boolean;
  coinBeingUpdated: Coin | null;
  walletBeingUpdated: OnChainWallet | null;
}

// Define the initial state using that type
const initialState: FlagsState = {
  createCoinModalOpen: false,
  coinBeingUpdated: null,
  walletBeingUpdated: null,
  upsertWalletModalOpen: false,
};

export const flagsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    toggleCreateCoinModal: (state) => {
      state.createCoinModalOpen = !state.createCoinModalOpen;
    },
    setCoinBeingUpdated: (state, action) => {
      state.coinBeingUpdated = action.payload;
    },
    toggleUpsertWalletModal: (state) => {
      state.upsertWalletModalOpen = !state.upsertWalletModalOpen;
    },
    setWalletBeingUpdated: (state, action) => {
      state.walletBeingUpdated = action.payload;
    },
  },
});

export default flagsSlice.reducer;
