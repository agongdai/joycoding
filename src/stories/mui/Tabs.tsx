import React from 'react';

import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import Tab from '@mui/material/Tab';
import MuiTabs, { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import AwesomeIcon from '@myex/components/AwesomeIcon';

type TabsBaseProps = Pick<MuiTabsProps, 'orientation'>;

export interface TabsProps extends TabsBaseProps {
  options: { label: string; value: string }[];
}

export const Tabs = ({ options, ...rest }: TabsProps): React.ReactElement => {
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <MuiTabs id='Tabs' value={value} onChange={handleChange} {...rest}>
      {options.map((option) => (
        <Tab
          key={option.value}
          label={option.label}
          icon={<AwesomeIcon icon={faHeart} size='sm' />}
          iconPosition='start'
        />
      ))}
    </MuiTabs>
  );
};

Tabs.defaultProps = {};
