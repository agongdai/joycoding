/**
 * In order to throw the notFound error, need a custom dummy page to do it manually.
 * @github https://github.com/vercel/next.js/discussions/50034#discussioncomment-6174116
 */

import { notFound } from 'next/navigation';

export default function NotFoundDummy() {
  notFound();
}
