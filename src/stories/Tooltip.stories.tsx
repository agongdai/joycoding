import React from 'react';

import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tooltip } from './mui/Tooltip';

export default {
  title: 'Pano/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  title: 'label',
};

export const Placement: ComponentStory<typeof Tooltip> = () => (
  <Stack spacing={4} maxWidth={300}>
    <Tooltip placement='top' title='label' />
    <Tooltip placement='top' title='top' arrow />
    <Tooltip placement='bottom' title='bottom' arrow />
    <Tooltip placement='left' title='left' arrow />
    <Tooltip placement='right' title='right' arrow />
  </Stack>
);
