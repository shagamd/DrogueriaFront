import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrarProductosComponent } from './administrar-productos/administrar-productos.component';
import { ProductosRoutingModule } from './productos-routing.module';

import { CardModule, GridModule, TableModule, AvatarModule, ProgressModule, ButtonModule, ModalModule, FormModule, TabsModule, NavModule, AccordionModule, SharedModule, TooltipModule, DropdownModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { AdministrarCategoriasComponent } from './administrar-categorias/administrar-categorias.component';
import { GestionarCategoriaComponent } from './administrar-categorias/gestionar-categoria/gestionar-categoria.component';
import { FormsModule } from '@angular/forms';
import { AdministrarLaboratoriosComponent } from './administrar-laboratorios/administrar-laboratorios.component';
import { GestionarLaboratorioComponent } from './administrar-laboratorios/gestionar-laboratorio/gestionar-laboratorio.component';
import { GestionarProductoComponent } from './administrar-productos/gestionar-producto/gestionar-producto.component';
import { AdministrarParametrosComponent } from './administrar-parametros/administrar-parametros.component';
import { AdministrarTipoObservacionComponent } from './administrar-tipo-observacion/administrar-tipo-observacion.component';
import { GestionarTipoObservacionComponent } from './administrar-tipo-observacion/gestionar-tipo-observacion/gestionar-tipo-observacion.component';
import { AdministrarObservacionesComponent } from './administrar-productos/administrar-observaciones/administrar-observaciones.component';
import { AdministrarUnidadMedidaComponent } from './administrar-unidad-medida/administrar-unidad-medida.component';
import { GestionarUnidadMedidaComponent } from './administrar-unidad-medida/gestionar-unidad-medida/gestionar-unidad-medida.component';
import { AdministrarPreciosComponent } from './administrar-productos/administrar-precios/administrar-precios.component';
import { AdministrarImpuestosComponent } from './administrar-impuestos/administrar-impuestos.component';
import { GestionarImpuestosComponent } from './administrar-impuestos/gestionar-impuestos/gestionar-impuestos.component';
import { GestionarGrupoImpuestosComponent } from './administrar-impuestos/gestionar-grupo-impuestos/gestionar-grupo-impuestos.component';
import { DetalleProductoComponent } from './administrar-productos/detalle-producto/detalle-producto.component';
import { AdministrarPuntosventaComponent } from './administrar-puntosventa/administrar-puntosventa.component';
import { GestionarPuntoventaComponent } from './administrar-puntosventa/gestionar-puntoventa/gestionar-puntoventa.component';

@NgModule({
  declarations: [
    AdministrarProductosComponent,
    AdministrarCategoriasComponent,
    GestionarCategoriaComponent,
    AdministrarLaboratoriosComponent,
    GestionarLaboratorioComponent,
    GestionarProductoComponent,
    AdministrarParametrosComponent,
    AdministrarTipoObservacionComponent,
    GestionarTipoObservacionComponent,
    AdministrarObservacionesComponent,
    AdministrarUnidadMedidaComponent,
    GestionarUnidadMedidaComponent,
    AdministrarPreciosComponent,
    AdministrarImpuestosComponent,
    GestionarImpuestosComponent,
    GestionarGrupoImpuestosComponent,
    DetalleProductoComponent,
    AdministrarPuntosventaComponent,
    GestionarPuntoventaComponent,
  ],
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
    FormModule,
    TabsModule,
    NavModule,
    AccordionModule,
    SharedModule,
    TooltipModule,
    ComponentsModule,
    DropdownModule
  ],
})
export class ProductosModule {}
