import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface DomState {
  scrollTop: number;
  mobileSidebarOpen?: boolean;
}

// Define the initial state using that type
const initialState: DomState = {
  scrollTop: 0,
  mobileSidebarOpen: false,
};

export const domSlice = createSlice({
  name: 'dom',
  initialState,
  reducers: {
    setScrollTop: (state, action: PayloadAction<number>) => {
      state.scrollTop = action.payload;
    },
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileSidebarOpen = action.payload;
    },
  },
});

export default domSlice.reducer;
