import React from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export interface CardProps {
  label: string;
  value: string;
  open: boolean;
}

export const Card = ({ label, value, open }: CardProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          border: '1px solid #E5E5E5',
          borderRadius: '4px',
          width: '22rem',
          padding: '8px 16px',
        }}
      >
        <div>
          <p style={{ color: '#6C7384' }}>{label}</p>
          <p style={{ fontWeight: 'bold', color: '#1B2026' }}>{value}</p>
        </div>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ top: '150px', left: '28px' }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
};

Card.defaultProps = {
  label: 'Heading 5',
  value: 'center',
};
