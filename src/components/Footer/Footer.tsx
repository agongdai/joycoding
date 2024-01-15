import React from 'react';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import MyexLink from '@myex/components/MyexLink';

export default function Footer() {
  return (
    <footer className='flex justify-between items-center my-4 p-4 bg-bg-primary-5 md:block mx-[auto] xl:mx-4 max-w-[116rem]'>
      <div className='flex items-center sm:block'>
        <div>
          &copy; {new Date().getFullYear()} Made with
          <FavoriteIcon fontSize='small' color='highlight' className='mx-2' /> by Shaojiang
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
          <EmailOutlinedIcon fontSize='small' classes={{ root: 'mr-1' }} /> caishaojiang@gmail.com
        </MyexLink>
      </div>
    </footer>
  );
}
