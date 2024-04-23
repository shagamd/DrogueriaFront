import { ComponentsModule } from './../../components/components.module';
import { IconModule } from '@coreui/icons-angular';
import { AccordionModule, AvatarModule, BadgeModule, ButtonModule, CardModule, CollapseModule, DropdownModule, FormModule, GridModule, ModalModule, NavModule, ProgressModule, SharedModule, TableModule, TabsModule, TooltipModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarVentaComponent } from './registrar-venta/registrar-venta.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { HistorialVentasComponent } from './historial-ventas/historial-ventas.component';
import { CuentasCobroComponent } from './cuentas-cobro/cuentas-cobro.component';
import { AbonosCuentaCobroComponent } from './cuentas-cobro/abonos-cuenta-cobro/abonos-cuenta-cobro.component';



@NgModule({
  declarations: [
    RegistrarVentaComponent,
    HistorialVentasComponent,
    CuentasCobroComponent,
    AbonosCuentaCobroComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
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
    CollapseModule,
    BadgeModule,
    //NgSelect
    NgSelectModule,
    ComponentsModule, 
  ]
})
export class VentasModule { }
