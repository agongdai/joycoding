import React from 'react';

import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ToggleButtonComp from './mui/ToggleButton';

export default {
  title: 'Pano/ToggleButtonComp',
  component: ToggleButtonComp,
} as ComponentMeta<typeof ToggleButtonComp>;

const Template: ComponentStory<typeof ToggleButtonComp> = (args) => <ToggleButtonComp {...args} />;

const options = [
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
];

export const Playground = Template.bind({});
Playground.args = {
  options,
  orientation: 'horizontal',
};

export const orientation: ComponentStory<typeof ToggleButtonComp> = () => (
  <Stack spacing={4} maxWidth={300}>
    <ToggleButtonComp orientation='horizontal' options={options} />
    <ToggleButtonComp orientation='vertical' options={options} />
  </Stack>
);
