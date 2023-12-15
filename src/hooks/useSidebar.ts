import { useEffect, useState } from 'react';

import { SIDEBAR_WIDTH_DESKTOP, SIDEBAR_WIDTH_TABLET } from '@jses/config';
import useMuiMediaQuery from '@jses/hooks/useMuiMediaQuery';
import { useJsesDispatch } from '@jses/store';
import { setMobileSidebarOpen } from '@jses/store/actions';

export function useSidebar() {
  const dispatch = useJsesDispatch();
  const { xlDown, mdDown } = useMuiMediaQuery();
  const [showMini, setShowMini] = useState(false);

  const toggleShowMini = () => setShowMini(!showMini);

  useEffect(() => {
    if (xlDown && !mdDown) {
      setShowMini(true);
    } else {
      setShowMini(false);
    }
  }, [mdDown, xlDown]);

  useEffect(() => {
    if (!mdDown) {
      dispatch(setMobileSidebarOpen(false));
    }
  }, [dispatch, mdDown]);

  return {
    sidebarWidth: showMini ? SIDEBAR_WIDTH_TABLET : SIDEBAR_WIDTH_DESKTOP,
    xlDown,
    mdDown,
    showMini,
    toggleShowMini,
  };
}
