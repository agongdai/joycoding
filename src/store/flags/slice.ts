import { Coin, OnChainWallet, Parameter } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface FlagsState {
  createCoinModalOpen: boolean;
  createWalletModalOpen: boolean;
  createParameterModalOpen: boolean;
  coinBeingUpdated: Coin | null;
  walletBeingUpdated: OnChainWallet | null;
  parameterBeingUpdated: Parameter | null;
}

// Define the initial state using that type
const initialState: FlagsState = {
  createCoinModalOpen: false,
  createWalletModalOpen: false,
  createParameterModalOpen: false,
  coinBeingUpdated: null,
  walletBeingUpdated: null,
  parameterBeingUpdated: null,
};

export const flagsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    toggleCreateCoinModal: (state) => {
      state.createCoinModalOpen = !state.createCoinModalOpen;
    },
    toggleCreateWalletModal: (state) => {
      state.createWalletModalOpen = !state.createWalletModalOpen;
    },
    toggleCreateParameterModalOpen: (state) => {
      state.createParameterModalOpen = !state.createParameterModalOpen;
    },
    setCoinBeingUpdated: (state, action) => {
      state.coinBeingUpdated = action.payload;
    },
    setWalletBeingUpdated: (state, action) => {
      state.walletBeingUpdated = action.payload;
    },
    setParameterBeingUpdated: (state, action) => {
      state.parameterBeingUpdated = action.payload;
    },
  },
});

export default flagsSlice.reducer;
