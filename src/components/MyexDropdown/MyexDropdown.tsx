'use client';
import React from 'react';

import { Menu, MenuItem } from '@mui/material';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import MyexLink from '@myex/components/MyexLink';
import { Option } from '@myex/types/common';

interface Props {
  menus: Option[];
  activeValue?: Option['value'];
  onChange?: (value: Option['value']) => void;
  children: React.ReactElement;
  tooltip?: string;
}

export default function MyexDropdown({
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
      <MyexTooltip title={tooltip} onClick={handleClick}>
        {children}
      </MyexTooltip>
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
            {menu.href ? <MyexLink href={menu.href}>{menu.label}</MyexLink> : menu.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
