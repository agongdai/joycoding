'use client';
import React from 'react';
import Image from 'next/image';
import cx from 'classnames';

import JsesTooltip from '@jses/components/@mui/material/Tooltip';
import JsesLink from '@jses/components/JsesLink';
import { useSidebar } from '@jses/hooks/useSidebar';
import { useJsesDispatch, useJsesSelector } from '@jses/store';
import { setMobileSidebarOpen } from '@jses/store/actions';
import { selectMobileSidebarOpen } from '@jses/store/dom/selectors';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Divider, Drawer, List, Toolbar } from '@mui/material';

import Menu from './Menu';
import menus from './menus';

export default function Sidebar() {
  const dispatch = useJsesDispatch();
  const showMobileSidebar = useJsesSelector(selectMobileSidebarOpen);
  const { sidebarWidth, toggleShowMini, showMini, xlDown, mdDown } = useSidebar();
  const toggleSidebar = () => {
    dispatch(setMobileSidebarOpen(!showMobileSidebar));
  };

  const $list = (
    <aside
      style={{ width: `${sidebarWidth}rem` }}
      className='overflow-hidden transition-all pr-2 bg-white dark:bg-bg-dark-light'
    >
      <Toolbar classes={{ root: cx('flex justify-between', { 'px-0': showMini }) }}>
        <JsesLink href='/'>
          <Image src='/jses.svg' alt='Jses' width={48} height={48} />
        </JsesLink>
        {!xlDown && (
          <JsesTooltip title='Toggle Mini Sidebar' placement={showMini ? 'right' : 'bottom'}>
            <div onClick={toggleShowMini} className='cursor-pointer'>
              {showMini ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
            </div>
          </JsesTooltip>
        )}
      </Toolbar>
      <Divider classes={{ root: '!m-0' }} />
      <List>
        {menus.map((menu) => (
          <Menu menu={menu} key={menu.title} showMini={showMini} />
        ))}
      </List>
    </aside>
  );

  if (showMobileSidebar || mdDown) {
    return (
      <Drawer
        anchor='left'
        open={showMobileSidebar}
        onClose={toggleSidebar}
        keepMounted
        classes={{ paper: 'dark:bg-bg-dark-light' }}
      >
        {$list}
      </Drawer>
    );
  }

  return $list;
}
