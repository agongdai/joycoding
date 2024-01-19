import {
  faChartMixedUpCircleDollar,
  faCoins,
  faDisplayChartUpCircleDollar,
  faGauge,
  faPalette,
  faScrewdriverWrench,
  faSliders,
  faUserRobotXmarks,
  faUsersGear,
} from '@fortawesome/pro-duotone-svg-icons';
import { IMenu } from '@myex/types/common';

const menus: IMenu[] = [
  {
    title: 'Dashboard',
    icon: faGauge,
    href: '/',
  },
  {
    title: 'Markets',
    icon: faChartMixedUpCircleDollar,
    href: '/markets',
  },
  {
    title: 'Assets',
    icon: faCoins,
    href: '/assets',
    protected: true,
  },
  {
    title: 'Analysis',
    icon: faDisplayChartUpCircleDollar,
    href: '/analysis',
    protected: true,
  },
  {
    title: 'Robot',
    icon: faUserRobotXmarks,
    href: '/robot',
    protected: true,
  },
  {
    title: 'Settings',
    icon: faScrewdriverWrench,
    href: '/settings',
    protected: true,
    subMenus: [
      { title: 'Accounts', icon: faUsersGear, href: '/accounts' },
      { title: 'Parameters', icon: faSliders, href: '/parameters' },
      { title: 'Theme', icon: faPalette, href: '/theme' },
    ],
  },
];

export default menus;
