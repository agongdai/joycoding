import {
  faAnchor,
  faBuilding,
  faCloudRainbow,
  faMp3Player,
  faNewspaper,
  faPalette,
  faPanorama,
  faRectangleHistoryCircleUser,
  faScrewdriverWrench,
  faUserCowboy,
} from '@fortawesome/pro-light-svg-icons';
import { IMenu } from '@jses/types/common';

const menus: IMenu[] = [
  {
    title: 'Profile',
    icon: faUserCowboy,
    href: '/',
  },
  {
    title: 'Projects',
    icon: faRectangleHistoryCircleUser,
    href: '/projects',
  },
  {
    title: 'Articles',
    icon: faNewspaper,
    href: '/articles',
  },
  {
    title: 'Tool',
    icon: faScrewdriverWrench,
    href: '/tools',
    subMenus: [
      { title: 'Color Picker', icon: faPalette, href: '/color-picker' },
      { title: 'Svg2Base64', icon: faAnchor, href: '/svg2base64' },
    ],
  },
  {
    title: 'Showcases',
    icon: faCloudRainbow,
    href: '/showcases',
    subMenus: [
      { title: 'Panorama Image Viewer', icon: faPanorama, href: '/panorama' },
      { title: 'Audio Player', icon: faMp3Player, href: '/audio-player' },
      { title: 'Enterprise', icon: faBuilding, href: '/enterprise' },
    ],
  },
];

export default menus;
