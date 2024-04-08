'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import cx from 'classnames';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Divider, Drawer, List, Toolbar } from '@mui/material';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import MyexImage from '@myex/components/MyexImage';
import MyexLink from '@myex/components/MyexLink';
import { useSidebar } from '@myex/hooks/useSidebar';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setMobileSidebarOpen } from '@myex/store/actions';
import { selectMobileSidebarOpen } from '@myex/store/dom/selectors';

import Menu from './Menu';
import menus from './menus';

export default function Sidebar() {
  const dispatch = useMyexDispatch();
  const { data: session } = useSession();
  const authed = !!session?.user;
  const showMobileSidebar = useMyexSelector(selectMobileSidebarOpen);
  const { sidebarWidth, toggleShowMini, showMini, xlDown, mdDown } = useSidebar();
  const toggleSidebar = () => {
    dispatch(setMobileSidebarOpen(!showMobileSidebar));
  };

  const $list = (
    <aside
      style={{ width: `${sidebarWidth}rem` }}
      className='overflow-hidden transition-all bg-white dark:bg-bg-dark-light h-full shadow-2xl'
    >
      <div className='flex flex-col justify-between h-full'>
        <div>
          <Toolbar classes={{ root: cx('flex justify-between', { 'px-0': showMini }) }}>
            <MyexLink href='/'>
              <MyexImage src='/myex.png' alt='Joy Trading' width={48} height={48} />
            </MyexLink>
            {!xlDown && (
              <MyexTooltip title='Toggle Mini Sidebar' placement={showMini ? 'right' : 'bottom'}>
                <div onClick={toggleShowMini} className='cursor-pointer'>
                  {showMini ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                </div>
              </MyexTooltip>
            )}
          </Toolbar>
          <Divider classes={{ root: '!m-0' }} />
          <List>
            {menus
              .filter((m) => authed || !m.protected)
              .map((menu) => (
                <Menu menu={menu} key={menu.title} showMini={showMini} />
              ))}
          </List>
        </div>
        <div>
          <MyexImage src='/myex.png' alt='Joy Trading' width={500} height={500} />
        </div>
      </div>
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
