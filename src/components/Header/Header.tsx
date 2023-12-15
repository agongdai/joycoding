'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import cx from 'classnames';

import JsesLink from '@jses/components/JsesLink';
import LangSwitch from '@jses/components/LangSwitch';
import ThemeSwitch from '@jses/components/ThemeSwitch';
import { useSidebar } from '@jses/hooks';
import useScrollDirection from '@jses/hooks/useScrollDirection';
import { useJsesDispatch, useJsesSelector } from '@jses/store';
import { setMobileSidebarOpen } from '@jses/store/actions';
import { selectScrollTop } from '@jses/store/selectors';
import { JsesTheme } from '@jses/theme';
import { Direction } from '@jses/types/window';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';

export default function Header() {
  const dispatch = useJsesDispatch();
  const { mdDown } = useSidebar();
  const scrollTop = useJsesSelector(selectScrollTop);
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
          'bg-bg-light-light': theme === JsesTheme.Light && scrolled,
          'bg-bg-dark-light': theme === JsesTheme.Dark && scrolled,
          'shadow-lg mx-4 sm:mx-0': scrolled,
        })}
      >
        <div className='flex-1 text-lg font-bold'>
          {mdDown && <MenuIcon onClick={showMobileSidebar} classes={{ root: 'cursor-pointer' }} />}
          <JsesLink href='/' className='!text-primary-main md:ml-4 sm:ml-2'>
            Joy Trading
          </JsesLink>
          <span className='ml-2 text-xs'>by Shaojiang</span>
        </div>
        <ul className='grid grid-cols-2 gap-1 sm:gap-0'>
          <li>
            <LangSwitch />
          </li>
          <li>
            <ThemeSwitch />
          </li>
        </ul>
      </div>
    </AppBar>
  );
}
