import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Breadcrumbs from './mui/Breadcrumbs';

export default {
  title: 'Pano/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  crumbs: [
    {
      icon: <AccountCircleIcon color='primary' fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AccountCircleIcon color='primary' fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AccountCircleIcon color='primary' fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AccountCircleIcon color='primary' fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AccountCircleIcon color='primary' fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
  ],
};
