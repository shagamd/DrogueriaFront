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
    name: 'Menus',
  },
  {
    name: 'Parametros',
    url: '/productos/administrar_parametros',
    iconComponent: { name: 'cil-settings' },
  },
  {
    name: 'Productos',
    url: '/productos/administrar_productos',
    iconComponent: { name: 'cil-settings' },
  }
];
