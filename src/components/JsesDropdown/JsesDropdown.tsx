'use client';
import React from 'react';

import JsesTooltip from '@jses/components/@mui/material/Tooltip';
import JsesLink from '@jses/components/JsesLink';
import { Option } from '@jses/types/common';
import { Menu, MenuItem } from '@mui/material';

interface Props {
  menus: Option[];
  activeValue?: Option['value'];
  onChange?: (value: Option['value']) => void;
  children: React.ReactElement;
  tooltip?: string;
}

export default function JsesDropdown({
  tooltip = 'Click to show the menus',
  menus,
  activeValue = '',
  onChange,
  children,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <JsesTooltip title={tooltip} onClick={handleClick}>
        {children}
      </JsesTooltip>
      <Menu
        anchorEl={anchorEl}
        id='menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menus.map((menu) => (
          <MenuItem
            key={menu.value}
            selected={activeValue === menu.value}
            onClick={() => onChange && onChange(menu.value)}
          >
            {menu.href ? <JsesLink href={menu.href}>{menu.label}</JsesLink> : menu.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
