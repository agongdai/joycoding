import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Select } from './mui/Select';

export default {
  title: 'Pano/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  label: 'Select',
  options: [
    { label: 'Option One', value: 'one' },
    { label: 'Option Two', value: 'two' },
    { label: 'Option Three', value: 'three' },
    { label: 'Option Four', value: 'four' },
  ],
};
