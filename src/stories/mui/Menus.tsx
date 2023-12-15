import React from 'react';

import { defaultLocale, languages } from '@jses/i18n/config';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import { IconButton, Menu, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

interface Menus {
  label: string;
  icon?: React.ReactNode;
}

export interface MenusProps {
  menus: Menus[];
}

export default function Menus({ menus }: MenusProps): React.ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div role='presentation'>
      <Box sx={{ width: 320, maxWidth: '100%', shadow: (theme) => theme.shadows[10] }}>
        <MenuList>
          {menus.map((menu) => (
            <MenuItem key={menu.label}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText>{menu.label}</ListItemText>
              <ListItemIcon>
                <ArrowForwardIosOutlinedIcon fontSize='small' />
              </ListItemIcon>
            </MenuItem>
          ))}
        </MenuList>
        <>
          <Tooltip title='Switch Language'>
            <IconButton
              onClick={handleClick}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <TranslateIcon color='secondary' />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} selected={lang.code === defaultLocale}>
                {lang.name}
              </MenuItem>
            ))}
          </Menu>
        </>
      </Box>
    </div>
  );
}

Menus.defaultProps = {
  menus: [
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
  ],
};
