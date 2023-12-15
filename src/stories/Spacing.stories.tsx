import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';

interface SpacingStoriesProps {
  size: number;
}

const SpacingSquare = ({ size }: SpacingStoriesProps): React.ReactElement => (
  <div>
    <Grid container spacing={8} justifyContent='space-between' alignItems='center'>
      <Grid item justifyContent='center' alignItems='center'>
        <Box
          sx={{
            width: (theme) => theme.spacing(size),
            height: (theme) => theme.spacing(size),
            backgroundColor: 'primary.main',
          }}
        />
      </Grid>
      <Grid item>
        {size * 4}px (`spacing {size}`)
      </Grid>
    </Grid>
  </div>
);

export const Variants: ComponentStory<typeof Stack> = () => (
  <Stack spacing={4} maxWidth={600}>
    <SpacingSquare size={1} />
    <SpacingSquare size={2} />
    <SpacingSquare size={3} />
    <SpacingSquare size={4} />
    <SpacingSquare size={5} />
    <SpacingSquare size={6} />
    <SpacingSquare size={7} />
    <SpacingSquare size={8} />
    <SpacingSquare size={9} />
    <SpacingSquare size={10} />
  </Stack>
);

export default {
  title: 'Pano/Spacing',
  component: Variants,
} as ComponentMeta<typeof Variants>;
