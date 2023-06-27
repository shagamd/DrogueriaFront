import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    title: true,
    name: 'Menus'
  },
  {
    name: 'Productos',
    url: '/productos/administrar_productos',
    iconComponent: { name: 'cil-settings' },
  }
];
