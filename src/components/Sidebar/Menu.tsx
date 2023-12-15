'use client';

import React from 'react';

import JsesTooltip from '@jses/components/@mui/material/Tooltip';
import AwesomeIcon from '@jses/components/AwesomeIcon';
import JsesLink from '@jses/components/JsesLink';
import useLocale from '@jses/hooks/useLocale';
import { useJsesDispatch } from '@jses/store';
import { setMobileSidebarOpen } from '@jses/store/dom/actions';
import { IMenu } from '@jses/types/common';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface Props {
  menu: IMenu;
  showMini: boolean;
}

export default function Menu({ menu, showMini }: Props) {
  const dispatch = useJsesDispatch();
  const { pathName } = useLocale();
  const selected = menu.href === '/' ? pathName === '/' : pathName.startsWith(menu.href);
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
    <ListItem key={menu.title} disablePadding classes={{ root: 'block my-2' }}>
      <ListItemButton
        color='secondary'
        selected={selected}
        onClick={handleClick}
        classes={{ root: 'flex justify-between' }}
      >
        <JsesLink
          href={hasSubMenus ? '/' : menu.href}
          className='hover:no-underline'
          disabled={hasSubMenus}
        >
          <JsesTooltip title={showMini ? menu.title : ''} placement='right'>
            <ListItemIcon>
              <AwesomeIcon icon={menu.icon} size='lg' contrast={selected} />
            </ListItemIcon>
          </JsesTooltip>
          <ListItemText
            primary={showMini ? '' : menu.title}
            classes={{ root: 'text-text-primary dark:text-text-primary-1' }}
          />
        </JsesLink>
        {hasSubMenus && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {hasSubMenus && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='ul' classes={{ root: 'py-0' }}>
            {(menu.subMenus || []).map((subMenu) => {
              const exactSelect = `${menu.href}${subMenu.href}` === pathName;
              return (
                <ListItem key={subMenu.title} classes={{ root: 'block p-0' }}>
                  <ListItemButton
                    selected={exactSelect}
                    classes={{ root: 'py-1 my-1' }}
                    onClick={hideMobileSidebar}
                  >
                    <JsesLink href={`${menu.href}${subMenu.href}`} className='hover:no-underline'>
                      <JsesTooltip title={showMini ? subMenu.title : ''} placement='right'>
                        <ListItemIcon>
                          <AwesomeIcon icon={subMenu.icon} size='lg' contrast={exactSelect} />
                        </ListItemIcon>
                      </JsesTooltip>
                      <ListItemText
                        primary={showMini ? '' : subMenu.title}
                        classes={{ root: 'text-text-primary dark:text-text-primary-1' }}
                      />
                    </JsesLink>
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
