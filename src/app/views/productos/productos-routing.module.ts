import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarProductosComponent } from './administrar-productos/administrar-productos.component';

const routes: Routes = [
  {
    path: 'administrar_productos',
    component: AdministrarProductosComponent,
    data: {
      title: 'Administrar Productos',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
