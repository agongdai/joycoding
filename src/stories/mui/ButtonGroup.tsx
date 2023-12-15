import React from 'react';

import {
  ButtonGroup as MuiButtonGroup,
  ButtonGroupProps as MuiButtonGroupProps,
} from '@mui/material';
import Button from '@mui/material/Button';

type ButtonGroupProps = Pick<MuiButtonGroupProps, 'variant' | 'size' | 'color' | 'disabled'>;

export interface Menu {
  label: string;
  value: string;
}

export interface ButtonGroupCompProps extends ButtonGroupProps {
  menus: Menu[];
  active: string;
  orientation: 'vertical' | 'horizontal';
}

export default function ButtonGroupComp({
  menus,
  active,
  orientation,
}: ButtonGroupCompProps): React.ReactElement {
  return (
    <MuiButtonGroup
      variant='outlined'
      aria-label='outlined primary button group'
      orientation={orientation}
    >
      {menus.map((m: Menu) => (
        <Button key={m.value} variant={active === m.value ? 'contained' : 'outlined'}>
          {m.label}
        </Button>
      ))}
    </MuiButtonGroup>
  );
}

ButtonGroupComp.defaultProps = {
  menus: [
    {
      label: 'one',
      value: '1',
    },
    {
      label: 'two',
      value: '2',
    },
    {
      label: 'three',
      value: '3',
    },
    {
      label: 'four',
      value: '4',
    },
    {
      label: 'five',
      value: '5',
    },
    {
      label: 'six',
      value: '6',
    },
  ],
  active: '3',
  orientation: 'vertical',
};
