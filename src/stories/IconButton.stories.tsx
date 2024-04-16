import React from 'react';

import { faCartShopping } from '@fortawesome/pro-duotone-svg-icons';
import Stack from '@mui/material/Stack';
import AwesomeIcon from '@myex/components/AwesomeIcon';
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
        <AwesomeIcon icon={faCartShopping} size='lg' />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' color='secondary'>
        <AwesomeIcon icon={faCartShopping} size='lg' />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' color='success'>
        <AwesomeIcon icon={faCartShopping} size='lg' />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' color='error'>
        <AwesomeIcon icon={faCartShopping} size='lg' />
      </IconButton>
    </div>
  </Stack>
);

export const Sizes: ComponentStory<typeof IconButton> = () => (
  <Stack spacing={4} maxWidth={300}>
    <div>
      <IconButton variant='contained' size='small'>
        <AwesomeIcon icon={faCartShopping} size='sm' />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' size='medium'>
        <AwesomeIcon icon={faCartShopping} size='lg' />
      </IconButton>
    </div>
    <div>
      <IconButton variant='contained' size='large'>
        <AwesomeIcon icon={faCartShopping} size='lg' />
      </IconButton>
    </div>
  </Stack>
);
