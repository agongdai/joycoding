import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from './mui/Card';

export default {
  title: 'Pano/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  label: 'label',
  value: 'value',
  open: true,
};
