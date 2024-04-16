'use client';

import React from 'react';
import cx from 'classnames';

import { faChevronDown, faChevronUp } from '@fortawesome/pro-solid-svg-icons';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexLink from '@myex/components/MyexLink';
import useLocale from '@myex/hooks/useLocale';
import { useMyexDispatch } from '@myex/store';
import { setMobileSidebarOpen } from '@myex/store/dom/actions';
import { IMenu } from '@myex/types/common';

interface Props {
  menu: IMenu;
  showMini: boolean;
}

export default function Menu({ menu, showMini }: Props) {
  const dispatch = useMyexDispatch();
  const { pathName } = useLocale();
  const selected =
    menu.href === '/'
      ? pathName === '/'
      : pathName.startsWith((menu.protected ? '/@me' : '') + menu.href);
  const [open, setOpen] = React.useState(false);
  const hasSubMenus = Number(menu.subMenus?.length) > 0;

  const hideMobileSidebar = () => {
    dispatch(setMobileSidebarOpen(false));
  };

  const handleClick = () => {
    if (hasSubMenus) {
      setOpen(!open);
    } else {
      hideMobileSidebar();
    }
  };

  return (
    <ListItem
      key={menu.title}
      disablePadding
      classes={{
        root: cx('block my-2', {
          'before:h-full before:z-10 before:block before:content-[" "] before:w-2 before:absolute before:left-0 before:top-0 before:rounded-e-[0.6rem] before:bg-primary-main':
            selected,
        }),
      }}
    >
      <ListItemButton
        color='secondary'
        selected={selected}
        onClick={handleClick}
        classes={{ root: cx('flex justify-between py-0', { 'pl-4': showMini }) }}
      >
        <MyexLink
          href={hasSubMenus ? '/' : (menu.protected ? `/@me` : '') + menu.href}
          className='hover:no-underline w-full py-2'
          disabled={hasSubMenus}
        >
          <MyexTooltip title={showMini ? menu.title : ''} placement='right'>
            <ListItemIcon>
              <AwesomeIcon icon={menu.icon} size='lg' contrast={selected} />
            </ListItemIcon>
          </MyexTooltip>
          <ListItemText
            primary={showMini ? '' : menu.title}
            classes={{ root: 'text-text-primary dark:text-text-primary-1' }}
          />
        </MyexLink>
        {hasSubMenus && <AwesomeIcon icon={open ? faChevronUp : faChevronDown} size='sm' />}
      </ListItemButton>
      {hasSubMenus && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='ul' classes={{ root: 'py-0' }}>
            {(menu.subMenus || []).map((subMenu) => {
              const subMenuHref = (menu.protected ? '/@me' : '') + menu.href + subMenu.href;
              const exactSelect = subMenuHref === pathName;
              return (
                <ListItem key={subMenu.title} classes={{ root: 'block p-0' }}>
                  <ListItemButton
                    selected={exactSelect}
                    classes={{ root: cx('py-0 my-1', { 'pl-4': showMini }) }}
                    onClick={hideMobileSidebar}
                  >
                    <MyexLink href={subMenuHref} className='py-1 hover:no-underline'>
                      <MyexTooltip title={showMini ? subMenu.title : ''} placement='right'>
                        <ListItemIcon>
                          <AwesomeIcon icon={subMenu.icon} size='lg' contrast={exactSelect} />
                        </ListItemIcon>
                      </MyexTooltip>
                      <ListItemText
                        primary={showMini ? '' : subMenu.title}
                        classes={{ root: 'text-text-primary dark:text-text-primary-1' }}
                      />
                    </MyexLink>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      )}
    </ListItem>
  );
}
