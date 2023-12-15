import React from 'react';

import JsesLink from '@jses/components/JsesLink';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';

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
          <JsesLink href='/privacy'>Privacy</JsesLink>
          <Divider
            orientation='vertical'
            classes={{ root: 'my-0 mx-3 h-3 border-primary-main dark:border-gray-lighter' }}
          />
          <JsesLink href='/terms'>Terms</JsesLink>
        </div>
      </div>
      <div className='flex items-center'>
        <JsesLink href='mailto:caishaojiang@gmail.com'>
          <EmailOutlinedIcon fontSize='small' classes={{ root: 'mr-1' }} /> caishaojiang@gmail.com
        </JsesLink>
      </div>
    </footer>
  );
}
