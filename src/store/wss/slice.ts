import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface WssState {
  live: boolean;
}

// Define the initial state using that type
const initialState: WssState = {
  live: false,
};

export const wssSlice = createSlice({
  name: 'wss',
  initialState,
  reducers: {
    setLive: (state, action: PayloadAction<boolean>) => {
      state.live = action.payload;
    },
  },
});

export default wssSlice.reducer;
