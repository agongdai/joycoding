// @doc https://github.com/vercel/next.js/discussions/35773#discussioncomment-2840696
import dynamic from 'next/dynamic';

const AwesomeIcon = dynamic(() => import('./AwesomeIcon'), {
  ssr: false,
});
export default AwesomeIcon;
