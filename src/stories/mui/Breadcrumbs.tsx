import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

interface Crumb {
  label: string;
  icon?: React.ReactNode;
  link?: string;
}

export interface BreadcrumbsProps {
  crumbs: Crumb[];
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BreadcrumbsComp({ crumbs }: BreadcrumbsProps): React.ReactElement {
  return (
    <div role='presentation' onClick={handleClick}>
      <Breadcrumbs aria-label='breadcrumb'>
        {crumbs.map((crumb) => (
          <Link
            underline='hover'
            sx={{ display: 'flex', alignItems: 'center' }}
            color='inherit'
            href={crumb.link}
            key={crumb.link}
          >
            {crumb.icon && <div>{crumb.icon}</div>}
            <Typography color='primary' className='font-bold underline'>
              {crumb.label}
            </Typography>
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}

BreadcrumbsComp.defaultProps = {
  crumbs: [
    {
      icon: <AccountCircleIcon color='primary' fontSize='small' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AccountCircleIcon color='primary' fontSize='small' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AccountCircleIcon color='primary' fontSize='small' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AccountCircleIcon color='primary' fontSize='small' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
    {
      icon: <AccountCircleIcon color='primary' fontSize='small' sx={{ mr: '1rem' }} />,
      label: 'label',
      link: '/',
    },
  ],
};
