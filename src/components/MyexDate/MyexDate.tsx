import React from 'react';
import dayjs from 'dayjs';

interface Props {
  dateString: string | undefined;
  withDay?: boolean;
}

export default function MyexDate({ dateString, withDay }: Props) {
  if (!dateString) {
    return 'Now';
  }

  const format = `YYYY/MM${withDay ? '/DD' : ''}`;

  return <time dateTime={dateString}>{dayjs(dateString).format(format)}</time>;
}
