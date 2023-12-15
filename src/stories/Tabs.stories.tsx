import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tabs } from './mui/Tabs';

export default {
  title: 'Pano/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  options: [
    { label: 'Option One', value: 'one' },
    { label: 'Option Two', value: 'two' },
    { label: 'Option Three', value: 'three' },
    { label: 'Option Four', value: 'four' },
  ],
};
