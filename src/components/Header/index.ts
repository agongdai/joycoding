// @doc https://github.com/vercel/next.js/discussions/35773#discussioncomment-2840696
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'), {
  ssr: false,
});
export default Header;
