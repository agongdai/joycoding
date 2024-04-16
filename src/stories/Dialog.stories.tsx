import React from 'react';

import { faPhone } from '@fortawesome/pro-solid-svg-icons';
import Stack from '@mui/material/Stack';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Dialog } from './mui/Dialog';

export default {
  title: 'Pano/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  title: 'Heading 5',
  text: 'Body 1',
  button1: 'button1',
  button2: 'button2',
};

export const Position: ComponentStory<typeof Dialog> = () => {
  return (
    <Stack spacing={4} maxWidth={300}>
      <Dialog open={true} icon={<AwesomeIcon icon={faPhone} />} />
      <Dialog open={false} position='left' icon={<AwesomeIcon icon={faPhone} />} />
    </Stack>
  );
};
