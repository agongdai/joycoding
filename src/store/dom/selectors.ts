import { RootState } from '@myex/store';

export const selectScrollTop = (state: RootState) => state.dom.scrollTop;
export const selectMobileSidebarOpen = (state: RootState) => state.dom.mobileSidebarOpen;
export const selectMiniSidebarOpen = (state: RootState) => state.dom.miniSidebarOpen;
