'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import cx from 'classnames';

import { faBars, faChevronLeft } from '@fortawesome/pro-solid-svg-icons';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexImage from '@myex/components/ui/MyexImage';
import MyexLink from '@myex/components/ui/MyexLink';
import MyexTooltip from '@myex/components/ui/MyexTooltip';
import { SIDEBAR_WIDTH_DESKTOP, SIDEBAR_WIDTH_TABLET } from '@myex/config';
import useSidebar from '@myex/hooks/useSidebar';
import { SystemParameter, SystemParameterSettings } from '@myex/types/system';

import Menu from './Menu';
import menus from './menus';

export default function Sidebar({ userParameters }: { userParameters: SystemParameterSettings }) {
  const { data: session } = useSession();
  const authed = !!session?.user;
  const isMobile = JSON.parse(userParameters[SystemParameter.IsMobile]);
  const {
    toggleMiniSidebarOpen,
    toggleMobileSidebarOpen,
    mobileSidebarOpen,
    miniSidebarOpen,
    xlDown,
  } = useSidebar(userParameters);
  const sidebarWidth = miniSidebarOpen ? SIDEBAR_WIDTH_TABLET : SIDEBAR_WIDTH_DESKTOP;

  const $list = (
    <aside
      style={{ width: `${sidebarWidth}rem` }}
      className='myex-scrollbar transition-all bg-white dark:bg-bg-dark-light h-full shadow-2xl'
    >
      <div className='flex flex-col justify-between h-full'>
        <div>
          <Toolbar
            classes={{
              root: cx('flex', {
                'justify-center': miniSidebarOpen,
                'justify-between': !miniSidebarOpen,
              }),
            }}
          >
            {miniSidebarOpen ? (
              <AwesomeIcon icon={faBars} size='lg' onClick={toggleMiniSidebarOpen} />
            ) : (
              <MyexLink href='/'>
                <MyexImage src='/myex.png' alt='MyEx.AI' width={48} height={48} />
              </MyexLink>
            )}
            {!miniSidebarOpen && (
              <MyexTooltip title='Toggle Mini Sidebar' placement={'top'}>
                <div onClick={toggleMiniSidebarOpen} className='cursor-pointer'>
                  <AwesomeIcon icon={faChevronLeft} size='sm' />
                </div>
              </MyexTooltip>
            )}
          </Toolbar>
          <Divider classes={{ root: '!m-0' }} />
          <List>
            {menus
              .filter((m) => authed || !m.protected)
              .map((menu) => (
                <Menu menu={menu} key={menu.title} showMini={miniSidebarOpen} />
              ))}
          </List>
        </div>
        <div>
          <MyexImage src='/myex.png' alt='Joy Trading' width={500} height={500} />
        </div>
      </div>
    </aside>
  );

  if (mobileSidebarOpen || isMobile || xlDown) {
    return (
      <Drawer
        anchor='left'
        open={mobileSidebarOpen}
        onClose={toggleMobileSidebarOpen}
        keepMounted
        classes={{ paper: 'dark:bg-bg-dark-light' }}
      >
        {$list}
      </Drawer>
    );
  }

  return $list;
}
