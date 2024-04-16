import React from 'react';

import { faUser } from '@fortawesome/pro-solid-svg-icons';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AwesomeIcon from '@myex/components/AwesomeIcon';

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
