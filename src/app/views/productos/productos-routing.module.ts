import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarProductosComponent } from './administrar-productos/administrar-productos.component';
import { AdministrarCategoriasComponent } from './administrar-categorias/administrar-categorias.component';
import { AdministrarLaboratoriosComponent } from './administrar-laboratorios/administrar-laboratorios.component';
import { AdministrarParametrosComponent } from './administrar-parametros/administrar-parametros.component';

const routes: Routes = [
  {
    path: 'administrar_categorias',
    component: AdministrarCategoriasComponent,
    data: {
      title: 'Administrar Categorias',
    },
  },
  {
    path: 'administrar_laboratorios',
    component: AdministrarLaboratoriosComponent,
    data: {
      title: 'Administrar Laboratorios',
    },
  },
  {
    path: 'administrar_productos',
    component: AdministrarProductosComponent,
    data: {
      title: 'Administrar Productos',
    },
  },
  {
    path: 'administrar_parametros',
    component: AdministrarParametrosComponent,
    data: {
      title: 'Administrar Parametros',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
