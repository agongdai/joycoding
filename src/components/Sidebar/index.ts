// @doc https://github.com/vercel/next.js/discussions/35773#discussioncomment-2840696
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), {
  ssr: false,
});
export default Sidebar;
