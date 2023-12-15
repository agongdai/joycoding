import React from 'react';

import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
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
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
    {
      icon: <LocalFireDepartmentOutlinedIcon fontSize='medium' sx={{ mr: '1rem' }} />,
      label: 'Menu Item',
    },
  ],
};
