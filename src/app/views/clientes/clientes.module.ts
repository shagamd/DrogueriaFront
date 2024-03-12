import { ComponentsModule } from './../../components/components.module';
import { IconModule } from '@coreui/icons-angular';
import { AccordionModule, AvatarModule, ButtonModule, CardModule, DropdownModule, FormModule, GridModule, ModalModule, NavModule, ProgressModule, SharedModule, TableModule, TabsModule, TooltipModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { ClientesRoutingModule } from './clientes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrarClientesComponent } from './administrar-clientes/administrar-clientes.component';
import { GestionarClienteComponent } from './administrar-clientes/gestionar-cliente/gestionar-cliente.component';



@NgModule({
  declarations: [
    AdministrarClientesComponent,
    GestionarClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
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
export class ClientesModule { }
