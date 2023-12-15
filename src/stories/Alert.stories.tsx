import React from 'react';

import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Alert } from './mui/Alert';

export default {
  title: 'Pano/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  info: 'This is an alert',
};

export const Severity: ComponentStory<typeof Alert> = () => (
  <Stack spacing={4} maxWidth={300}>
    <Alert severity='error' info='This is an error message' />
    <Alert severity='warning' info='This is a warning message' />
    <Alert severity='info' info='This is an info message' />
    <Alert severity='success' info='This is a success message' />
  </Stack>
);
