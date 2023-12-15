import React from 'react';

import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ButtonGroup from './mui/ButtonGroup';

export default {
  title: 'Pano/ButtonGroup',
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args) => <ButtonGroup {...args} />;

const menus = [
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
  menus,
  active: '3',
  orientation: 'vertical',
};

export const orientation: ComponentStory<typeof ButtonGroup> = () => (
  <Stack spacing={4} maxWidth={300}>
    <ButtonGroup orientation='horizontal' menus={menus} active='2' />
    <ButtonGroup orientation='vertical' menus={menus} active='3' />
  </Stack>
);
