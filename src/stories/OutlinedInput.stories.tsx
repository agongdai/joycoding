import React from 'react';

import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { OutlinedInput } from './mui/OutlinedInput';

export default {
  title: 'Pano/OutlinedInput',
  component: OutlinedInput,
} as ComponentMeta<typeof OutlinedInput>;

const Template: ComponentStory<typeof OutlinedInput> = (args) => <OutlinedInput {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  label: 'Input Label',
  placeholder: 'Placeholder: please input',
};

export const Variants: ComponentStory<typeof OutlinedInput> = () => (
  <div className='grid grid-cols-1 gap-8 w-[400px]'>
    <OutlinedInput label='Outlined OutlinedInput' />
  </div>
);

export const Colors: ComponentStory<typeof OutlinedInput> = () => (
  <div className='grid grid-cols-1 gap-8 w-[400px]'>
    <OutlinedInput label='Primary' placeholder='text' />
    <OutlinedInput disabled label='Disabled' placeholder='disabled, not editable' />
    <OutlinedInput
      error
      label='Error'
      type='password'
      helperText='This is an error message'
      endAdornment={
        <InputAdornment position='end'>
          <IconButton aria-label='toggle password visibility' edge='end'>
            <Visibility />
          </IconButton>
        </InputAdornment>
      }
    />
  </div>
);
