'use client';

import { useEffect } from 'react';

import { SIDEBAR_WIDTH_DESKTOP, SIDEBAR_WIDTH_TABLET } from '@myex/config';
import useMuiMediaQuery from '@myex/hooks/useMuiMediaQuery';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setMiniSidebarOpen, setMobileSidebarOpen } from '@myex/store/actions';
import { selectMiniSidebarOpen } from '@myex/store/dom/selectors';
import { usePrevious } from '@radix-ui/react-use-previous';

export function useSidebar() {
  const dispatch = useMyexDispatch();
  const miniSidebarOpen = useMyexSelector(selectMiniSidebarOpen);
  const { xlDown, mdDown } = useMuiMediaQuery();

  const toggleMiniSidebarOpen = () => dispatch(setMiniSidebarOpen(!miniSidebarOpen));

  const prevXlDown = usePrevious(xlDown);
  const prevMdDown = usePrevious(mdDown);
  useEffect(() => {
    // Toggle mini sidebar open when switching from desktop to tablet
    if (prevXlDown !== xlDown || prevMdDown !== mdDown) {
      if (xlDown && !mdDown) {
        dispatch(setMiniSidebarOpen(true));
      } else {
        dispatch(setMiniSidebarOpen(false));
      }
    }
  }, [dispatch, mdDown, prevMdDown, prevXlDown, xlDown]);

  useEffect(() => {
    // Toggle mini sidebar open when switching from desktop to tablet
    if (prevMdDown !== mdDown && !mdDown) {
      dispatch(setMobileSidebarOpen(false));
    }
  }, [dispatch, mdDown, prevMdDown]);

  return {
    sidebarWidth: miniSidebarOpen ? SIDEBAR_WIDTH_TABLET : SIDEBAR_WIDTH_DESKTOP,
    xlDown,
    mdDown,
    miniSidebarOpen,
    toggleMiniSidebarOpen,
  };
}
