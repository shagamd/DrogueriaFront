import { AdministrarInventarioComponent } from './administrar-inventario/administrar-inventario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'administrar_inventario',
    component: AdministrarInventarioComponent,
    data: {
      title: 'Administrar Inventario',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioRoutingModule {}
