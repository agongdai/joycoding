import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Pagination } from './mui/Pagination';

export default {
  title: 'Pano/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Playground = Template.bind({});
Playground.args = {};

// export const Placement: ComponentStory<typeof Pagination> = () => (
//   <Stack spacing={4}>
//     <Pagination count={10} shape="rounded" />
//   </Stack>
// );
