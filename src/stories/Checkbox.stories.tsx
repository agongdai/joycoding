import React from 'react';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Checkbox } from './mui/Checkbox';

export default {
  title: 'Pano/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  label: 'Check me!',
};

export const Variants: ComponentStory<typeof Checkbox> = () => (
  <Stack spacing={2} maxWidth={300}>
    <div>
      <Checkbox label='Label' />
    </div>
    <div>
      <Checkbox label='Disabled' />
    </div>
  </Stack>
);

export const Colors: ComponentStory<typeof Checkbox> = () => (
  <Stack spacing={2} maxWidth={300}>
    <div>
      <Checkbox label='Primary' />
    </div>
    <div>
      <Checkbox color='secondary' label='Secondary' />
    </div>
    <div>
      <Checkbox color='success' label='Success' />
    </div>
    <div>
      <Checkbox color='error' label='Error' />
    </div>
  </Stack>
);

export const Sizes: ComponentStory<typeof Checkbox> = () => (
  <Stack spacing={2} maxWidth={300}>
    <div>
      <Checkbox size='small' label='Small' />
    </div>
    <div>
      <Checkbox size='medium' label='Medium' />
    </div>
  </Stack>
);

export const Icons: ComponentStory<typeof Checkbox> = () => (
  <Stack spacing={2} maxWidth={300}>
    <div>
      <Checkbox label='Favorite' icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
    </div>
    <div>
      <Checkbox
        label='BookmarkBorder'
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
      />
    </div>
  </Stack>
);
