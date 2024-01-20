'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import cx from 'classnames';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import LangSwitch from '@myex/components/LangSwitch';
import MyexLink from '@myex/components/MyexLink';
import ThemeSwitch from '@myex/components/ThemeSwitch';
import UserMenu from '@myex/components/UserMenu';
import { useSidebar } from '@myex/hooks';
import useScrollDirection from '@myex/hooks/useScrollDirection';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setMobileSidebarOpen } from '@myex/store/actions';
import { selectScrollTop } from '@myex/store/selectors';
import { MyexTheme } from '@myex/theme';
import { Direction } from '@myex/types/window';

export default function Header({ statusNode = null }: { statusNode?: React.ReactNode }) {
  const dispatch = useMyexDispatch();
  const { mdDown } = useSidebar();
  const scrollTop = useMyexSelector(selectScrollTop);
  const scrollingDirection = useScrollDirection();
  const { theme } = useTheme();

  const scrolled = scrollTop > 0;

  const showMobileSidebar = () => {
    dispatch(setMobileSidebarOpen(true));
  };

  return (
    <AppBar
      position='sticky'
      classes={{
        root: cx('mx-[auto] max-w-[120rem] transition-all', {
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
        <div className='flex-1 text-lg font-bold'>
          {mdDown && <MenuIcon onClick={showMobileSidebar} classes={{ root: 'cursor-pointer' }} />}
          <MyexLink href='/' className='!text-primary-main md:ml-4 sm:ml-2'>
            MyEx.ai
          </MyexLink>
          <span className='ml-2 text-xs'>by Shaojiang</span>
        </div>
        <ul className='flex items-center'>
          <li className='mr-2'>{statusNode}</li>
          <li className='ml-1'>
            <LangSwitch />
          </li>
          <li className='ml-1'>
            <ThemeSwitch />
          </li>
          <li className='ml-1'>
            <UserMenu />
          </li>
        </ul>
      </div>
    </AppBar>
  );
}
