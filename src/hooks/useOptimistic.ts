/**
 * A hook that returns a value that is updated optimistically. Here does not use `reducer` callback.
 *
 * There is an official hook `useOptimistic` in React 19.
 * But even wrapped with `useTransition`, it always shows a warning:
 *  `Warning: An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition.`
 *
 * @todo recheck official `useOptimistic` in React 19 later.
 * @doc https://github.com/vercel/next.js/issues/49619#issuecomment-1707207675
 */

import { useEffect, useState } from 'react';

export default function useOptimistic<T>(passThrough: T) {
  const [value, setValue] = useState<T>(passThrough);

  useEffect(() => {
    setValue(passThrough);
  }, [passThrough]);

  return [value, setValue] as const;
}
