'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import cx from 'classnames';

import { faBars } from '@fortawesome/pro-solid-svg-icons';
import AppBar from '@mui/material/AppBar';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import LangSwitch from '@myex/components/operation/LangSwitch';
import LiveIndicator from '@myex/components/operation/LiveIndicator';
import ThemeSwitch from '@myex/components/operation/ThemeSwitch';
import TradingViewSwitch from '@myex/components/operation/TradingViewSwitch';
import UserMenu from '@myex/components/operation/UserMenu';
import MyexLink from '@myex/components/ui/MyexLink';
import useScrollDirection from '@myex/hooks/useScrollDirection';
import useSidebar from '@myex/hooks/useSidebar';
import useUnderConstruction from '@myex/hooks/useUnderConstruction';
import { useMyexSelector } from '@myex/store';
import { selectScrollTop } from '@myex/store/selectors';
import { MyexTheme } from '@myex/theme';
import { PropsWithChildren } from '@myex/types/common';
import { SystemParameter, SystemParameterSettings } from '@myex/types/system';
import { Direction } from '@myex/types/window';

function MenuItem({ children }: PropsWithChildren) {
  return <li className='ml-1 sm:ml-0'>{children}</li>;
}

export default function Header({ userParameters }: { userParameters: SystemParameterSettings }) {
  const isMobile = JSON.parse(userParameters[SystemParameter.IsMobile]);
  const scrollTop = useMyexSelector(selectScrollTop);
  const { toggleMobileSidebarOpen, xlDown } = useSidebar(userParameters);
  const scrollingDirection = useScrollDirection();
  const { theme } = useTheme();
  const { underConstruction } = useUnderConstruction();

  const scrolled = scrollTop > 0;

  return (
    <AppBar
      position='sticky'
      classes={{
        root: cx('mx-[auto] max-w-[150rem] transition-all', {
          '-translate-y-16': scrolled && scrollingDirection === Direction.Down,
        }),
      }}
    >
      <div
        className={cx('transition-all flex justify-between items-center px-4 py-2 sm:px-2', {
          'bg-bg-light-light': theme === MyexTheme.Light && scrolled,
          'bg-bg-dark-light': theme === MyexTheme.Dark && scrolled,
          'shadow-lg mx-4 sm:mx-0': scrolled,
        })}
      >
        <div className='flex items-baseline flex-1 text-lg font-bold'>
          {(isMobile || xlDown) && (
            <AwesomeIcon icon={faBars} onClick={toggleMobileSidebarOpen} size='sm' />
          )}
          <MyexLink href='/' className='!text-primary-main xl:ml-4 sm:ml-2'>
            MyEx.AI
          </MyexLink>
          <div className='ml-2 text-xs xs:hidden'>by Shaojiang</div>
        </div>
        <ul className='flex items-center'>
          {!underConstruction && (
            <>
              <MenuItem>
                <LiveIndicator />
              </MenuItem>
              <MenuItem>
                <TradingViewSwitch />
              </MenuItem>
            </>
          )}
          <MenuItem>
            <LangSwitch />
          </MenuItem>
          <MenuItem>
            <ThemeSwitch />
          </MenuItem>
          <MenuItem>
            <UserMenu />
          </MenuItem>
        </ul>
      </div>
    </AppBar>
  );
}
