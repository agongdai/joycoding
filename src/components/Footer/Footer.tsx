import React from 'react';

import { faEnvelope, faHeart } from '@fortawesome/pro-duotone-svg-icons';
import Divider from '@mui/material/Divider';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexLink from '@myex/components/MyexLink';
import { StyleVariant } from '@myex/types/common';

export default function Footer() {
  return (
    <footer className='w-full mx-[auto] my-4 xl:mt-2 xl:mb-0 xl:px-4 xs:px-2 max-w-[148rem]'>
      <div className='flex justify-between items-center p-4 bg-bg-primary-5 md:block'>
        <div className='flex items-center sm:block'>
          <div>
            &copy; {new Date().getFullYear()} Made with
            <AwesomeIcon
              icon={faHeart}
              variant={StyleVariant.Highlight}
              size='sm'
              className='mx-2'
            />{' '}
            by Shaojiang
          </div>
          <div className='flex items-center sm:my-1'>
            <Divider
              orientation='vertical'
              classes={{
                root: 'my-0 mx-3 h-3 border-primary-main dark:border-gray-lighter sm:hidden',
              }}
            />
            <MyexLink href='/privacy'>Privacy</MyexLink>
            <Divider
              orientation='vertical'
              classes={{ root: 'my-0 mx-3 h-3 border-primary-main dark:border-gray-lighter' }}
            />
            <MyexLink href='/terms'>Terms</MyexLink>
          </div>
        </div>
        <div className='flex items-center'>
          <MyexLink href='mailto:caishaojiang@gmail.com'>
            <AwesomeIcon icon={faEnvelope} className='mr-1' size='sm' /> caishaojiang@gmail.com
          </MyexLink>
        </div>
      </div>
    </footer>
  );
}
