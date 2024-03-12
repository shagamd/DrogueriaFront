import { AdministrarClientesComponent } from './administrar-clientes/administrar-clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'administrar_clientes',
    component: AdministrarClientesComponent,
    data: {
      title: 'Administrar Clientes',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
