'use client';

import { useCallback, useEffect, useState } from 'react';

import { myexUpdateUserParameter } from '@myex/app/serverActions/myexUserParameter';
import useMuiMediaQuery from '@myex/hooks/useMuiMediaQuery';
import usePrevious from '@myex/hooks/usePrevious';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setMobileSidebarOpen } from '@myex/store/dom/actions';
import { selectMobileSidebarOpen } from '@myex/store/selectors';
import {
  DefaultSystemParameterSettings,
  SystemParameter,
  SystemParameterSettings,
} from '@myex/types/system';
import { isOnServer } from '@myex/utils/window';

export default function useSidebar(
  userParameters: SystemParameterSettings = DefaultSystemParameterSettings,
) {
  const dispatch = useMyexDispatch();

  const [miniSidebarOpen, setMiniSidebarOpen] = useState<boolean>(
    JSON.parse(userParameters[SystemParameter.MiniSidebarOpen]),
  );
  const clientMobileSidebarOpen = useMyexSelector(selectMobileSidebarOpen);
  const mobileSidebarOpen = isOnServer()
    ? Boolean(JSON.parse(userParameters[SystemParameter.MobileSidebarOpen]))
    : clientMobileSidebarOpen;
  const { xlDown, mdDown } = useMuiMediaQuery();

  /**
   * Sidebar exists everywhere, we store it in useState.
   * @param value
   */
  const setMiniSidebarOpenAndSave = useCallback(
    (value: boolean) => {
      if (miniSidebarOpen === value) {
        return;
      }
      setMiniSidebarOpen(value);
      myexUpdateUserParameter(SystemParameter.MiniSidebarOpen, String(value));
    },
    [miniSidebarOpen],
  );
  const toggleMiniSidebarOpen = () => setMiniSidebarOpenAndSave(!miniSidebarOpen);

  /**
   * mobileSidebarOpen is controlled both by Sidebar and Header,
   * so we store it in the Redux store.
   */
  const setMobileSidebarOpenAndSave = useCallback(
    (value: boolean) => {
      if (mobileSidebarOpen === value) {
        return;
      }
      dispatch(setMobileSidebarOpen(value));
      myexUpdateUserParameter(SystemParameter.MobileSidebarOpen, String(value));
    },
    [dispatch, mobileSidebarOpen],
  );
  const toggleMobileSidebarOpen = () => setMobileSidebarOpenAndSave(!mobileSidebarOpen);

  const prevXlDown = usePrevious(xlDown);
  const prevMdDown = usePrevious(mdDown);
  useEffect(() => {
    if (typeof prevXlDown === 'undefined' || typeof prevMdDown === 'undefined') {
      return;
    }
    // Toggle mini sidebar open when switching from desktop to tablet
    if (prevXlDown !== xlDown || prevMdDown !== mdDown) {
      if (xlDown && !mdDown) {
        setMiniSidebarOpenAndSave(true);
      } else {
        setMiniSidebarOpenAndSave(false);
      }
    }
  }, [dispatch, mdDown, prevMdDown, prevXlDown, setMiniSidebarOpenAndSave, xlDown]);

  useEffect(() => {
    // Hide mobile sidebar if going to desktop.
    if (typeof prevMdDown !== 'undefined' && prevMdDown !== mdDown && !mdDown) {
      setMobileSidebarOpenAndSave(false);
    }
  }, [dispatch, mdDown, prevMdDown, setMobileSidebarOpenAndSave]);

  return {
    xlDown,
    mdDown,
    miniSidebarOpen,
    mobileSidebarOpen,
    toggleMiniSidebarOpen,
    toggleMobileSidebarOpen,
  };
}
