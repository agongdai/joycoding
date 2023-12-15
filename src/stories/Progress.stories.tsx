import React from 'react';

import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Progress from './mui/Progress';

export default {
  title: 'Pano/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  label: '50%',
};

export const Variants: ComponentStory<typeof Progress> = () => (
  <Stack spacing={4} maxWidth={300}>
    <Progress value={40} size={32} />
  </Stack>
);

export const Colors: ComponentStory<typeof Progress> = () => (
  <Stack spacing={4} maxWidth={300}>
    <Progress value={40} color='success' />
    <Progress color='secondary' value={40} />
  </Stack>
);

export const Sizes: ComponentStory<typeof Progress> = () => (
  <Stack spacing={4} maxWidth={300}>
    <Progress size='32px' value={40} />
  </Stack>
);
