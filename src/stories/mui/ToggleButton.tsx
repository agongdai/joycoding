import React from 'react';

import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';
import Button from '@mui/material/Button';

type ToggleButtonCompProps = Pick<ToggleButtonGroupProps, 'orientation' | 'color' | 'disabled'>;

export interface Button {
  label: string;
  value: string;
  href?: string;
}

export interface PanoToggleButtonCompProps extends ToggleButtonCompProps {
  options: Button[];
  orientation: 'vertical' | 'horizontal';
}

export default function ToggleButtonComp({
  options,
  orientation,
}: PanoToggleButtonCompProps): React.ReactElement {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string): void => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      orientation={orientation}
      color='primary'
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label='Platform'
    >
      {options.map((o: Button) => (
        <ToggleButton value={o.value} key={o.value}>
          {o.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

ToggleButtonComp.defaultProps = {
  options: [
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
  orientation: 'horizontal',
};
