'use client';
import React from 'react';

import { JsesPaper, JsesStyledPageWrapper } from '@jses/components/JsesStyled';

import PrivacyMd from './privacy.mdx';

export default function PrivacyPage() {
  return (
    <JsesStyledPageWrapper>
      <JsesPaper className='prose dark:prose-invert'>
        <PrivacyMd />
      </JsesPaper>
    </JsesStyledPageWrapper>
  );
}
