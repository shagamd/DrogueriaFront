import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioRoutingModule } from './inventario-routing.module';

import { CardModule, GridModule, TableModule, AvatarModule, ProgressModule, ButtonModule, ModalModule, FormModule, TabsModule, NavModule, AccordionModule, SharedModule, TooltipModule, DropdownModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { AdministrarInventarioComponent } from './administrar-inventario/administrar-inventario.component';
import { GestionarInventarioComponent } from './administrar-inventario/gestionar-inventario/gestionar-inventario.component';
import { ModificarInventarioComponent } from './administrar-inventario/modificar-inventario/modificar-inventario.component';

@NgModule({
  declarations: [
    AdministrarInventarioComponent,
    GestionarInventarioComponent,
    ModificarInventarioComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
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
    DropdownModule,
  ]
})
export class InventarioModule { }
