import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrarProductosComponent } from './administrar-productos/administrar-productos.component';
import { ProductosRoutingModule } from './productos-routing.module';

import { CardModule, GridModule, TableModule, AvatarModule, ProgressModule, ButtonModule, ModalModule, FormModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { AdministrarCategoriasComponent } from './administrar-categorias/administrar-categorias.component';
import { GestionarCategoriaComponent } from './administrar-categorias/gestionar-categoria/gestionar-categoria.component';
import { FormsModule } from '@angular/forms';
import { AdministrarLaboratoriosComponent } from './administrar-laboratorios/administrar-laboratorios.component';
import { GestionarLaboratorioComponent } from './administrar-laboratorios/gestionar-laboratorio/gestionar-laboratorio.component';
import { GestionarProductoComponent } from './administrar-productos/gestionar-producto/gestionar-producto.component';

@NgModule({
  declarations: [AdministrarProductosComponent, AdministrarCategoriasComponent, GestionarCategoriaComponent, AdministrarLaboratoriosComponent, GestionarLaboratorioComponent, GestionarProductoComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    //CoreUI
    ButtonModule,
    CardModule,
    GridModule,
    TableModule,
    AvatarModule,
    ProgressModule,
    IconModule,
    ModalModule,
    FormModule
  ],
})
export class ProductosModule {}
