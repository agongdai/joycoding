import React from 'react';

import { faUser } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
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
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'label',
      link: '/',
    },
  ],
};
