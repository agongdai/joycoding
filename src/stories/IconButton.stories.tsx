import React from 'react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton } from './mui/IconButton';

export default {
  title: 'Pano/IconButton',
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Playground = Template.bind({});
Playground.args = {};

export const Colors: ComponentStory<typeof IconButton> = () => (
  <Stack spacing={4} maxWidth={300}>
    <div>
      <IconButton variant='contained'>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' color='secondary'>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' color='success'>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' color='error'>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  </Stack>
);

export const Sizes: ComponentStory<typeof IconButton> = () => (
  <Stack spacing={4} maxWidth={300}>
    <div>
      <IconButton variant='contained' size='small'>
        <AddShoppingCartIcon fontSize='small' />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' size='medium'>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' size='large'>
        <AddShoppingCartIcon fontSize='large' />
      </IconButton>
    </div>
  </Stack>
);
