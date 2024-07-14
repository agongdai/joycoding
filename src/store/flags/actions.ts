import { flagsSlice } from './slice';

export const {
  toggleCreateCoinModal,
  toggleCreateWalletModal,
  toggleCreateParameterModalOpen,
  setCoinBeingUpdated,
  setWalletBeingUpdated,
  setParameterBeingUpdated,
} = flagsSlice.actions;
