import React from 'react';

import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Typography } from './mui/Typography';

export default {
  title: 'Pano/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args}>Typography text to be displayed</Typography>
);

export const Playground = Template.bind({});
Playground.args = {};

export const Variants: ComponentStory<typeof Typography> = () => (
  <Stack spacing={4} maxWidth={800}>
    <Typography variant='h1'>{`Typography variant='h1'`}</Typography>
    <Typography variant='h2'>{`Typography variant='h2'`}</Typography>
    <Typography variant='h3'>{`Typography variant='h3'`}</Typography>
    <Typography variant='h4'>{`Typography variant='h4'`}</Typography>
    <Typography variant='h5'>{`Typography variant='h5'`}</Typography>
    <Typography variant='h6'>{`Typography variant='h6'`}</Typography>
    <Typography variant='subtitle1'>{`Typography variant='subtitle1'`}</Typography>
    <Typography variant='subtitle2'>{`Typography variant='subtitle2'`}</Typography>
    <Typography variant='body1'>{`Typography variant='body1'`}</Typography>
    <Typography variant='body2'>{`Typography variant='body2'`}</Typography>
    <Typography variant='caption'>{`Typography variant='caption'`}</Typography>
    <Typography variant='button'>{`Typography variant='button'`}</Typography>
    <Typography variant='overline'>{`Typography variant='overline'`}</Typography>
    <Typography variant='inherit'>{`Typography variant='inherit'`}</Typography>
  </Stack>
);
