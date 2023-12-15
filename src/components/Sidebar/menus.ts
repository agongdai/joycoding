import {
  faCoins,
  faDisplayChartUpCircleDollar,
  faGauge,
  faPalette,
  faScrewdriverWrench,
  faSliders,
  faUserRobotXmarks,
  faUsersGear,
} from '@fortawesome/pro-duotone-svg-icons';
import { IMenu } from '@jses/types/common';

const menus: IMenu[] = [
  {
    title: 'Dashboard',
    icon: faGauge,
    href: '/',
  },
  {
    title: 'Assets',
    icon: faCoins,
    href: '/assets',
  },
  {
    title: 'Analysis',
    icon: faDisplayChartUpCircleDollar,
    href: '/analysis',
  },
  {
    title: 'Robot',
    icon: faUserRobotXmarks,
    href: '/robot',
  },
  {
    title: 'Settings',
    icon: faScrewdriverWrench,
    href: '/settings',
    subMenus: [
      { title: 'Accounts', icon: faUsersGear, href: '/accounts' },
      { title: 'Parameters', icon: faSliders, href: '/parameters' },
      { title: 'Theme', icon: faPalette, href: '/theme' },
    ],
  },
];

export default menus;
