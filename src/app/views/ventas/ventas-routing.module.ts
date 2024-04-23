import { RegistrarVentaComponent } from './registrar-venta/registrar-venta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialVentasComponent } from './historial-ventas/historial-ventas.component';
import { CuentasCobroComponent } from './cuentas-cobro/cuentas-cobro.component';

const routes: Routes = [
  {
    path: 'registrar_venta',
    component: RegistrarVentaComponent,
    data: {
      title: 'Registrar Venta',
    },
  },
  {
    path: 'historial_ventas',
    component: HistorialVentasComponent,
    data: {
      title: 'Historial Ventas',
    },
  },
  {
    path: 'cuentas_cobro',
    component: CuentasCobroComponent,
    data: {
      title: 'Cuentas de Cobro',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
