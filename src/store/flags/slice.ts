import { Coin } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface FlagsState {
  createCoinModalOpen: boolean;
  coinBeingUpdated: Coin | null;
}

// Define the initial state using that type
const initialState: FlagsState = {
  createCoinModalOpen: false,
  coinBeingUpdated: null,
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
  },
});

export default flagsSlice.reducer;
