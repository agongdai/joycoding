import React from 'react';

import { faGlobePointer } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexLink from '@myex/components/MyexLink';

export default function Link({ href }: { href: string }) {
  return (
    <MyexLink href={href}>
      <AwesomeIcon icon={faGlobePointer} size='lg' tooltip={href} />
    </MyexLink>
  );
}
