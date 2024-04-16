import React from 'react';

import { faUser } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Menus from './mui/Menus';

export default {
  title: 'Pano/Menus',
  component: Menus,
} as ComponentMeta<typeof Menus>;

const Template: ComponentStory<typeof Menus> = (args) => <Menus {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  menus: [
    {
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'Menu Item',
    },
    {
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'Menu Item',
    },
    {
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'Menu Item',
    },
    {
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'Menu Item',
    },
    {
      icon: <AwesomeIcon icon={faUser} className='mr-1' />,
      label: 'Menu Item',
    },
  ],
};
