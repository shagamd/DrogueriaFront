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
    iconComponent: { name: 'cil-columns' },
  },
  {
    name: 'Productos',
    url: '/productos/administrar_productos',
    iconComponent: { name: 'cil-basket' },
  },
  {
    name: 'Inventario',
    url: '/inventario/administrar_inventario',
    iconComponent: { name: 'cil-storage' },
  },
  {
    name: 'Ventas',
    url: '/ventas',
    iconComponent: { name: 'cil-cash' },
    children: [
      {
        name: 'Registrar Venta',
        url: '/ventas/registrar_venta',
        iconComponent: { name: 'cil-cart' },
      },
      {
        name: 'Historial Ventas',
        url: '/ventas/historial_ventas',
        iconComponent: { name: 'cil-list' },
      }
    ]
  },
  {
    name: 'Clientes',
    url: '/clientes/administrar_clientes',
    iconComponent: { name: 'cil-contact' },
  },
];
