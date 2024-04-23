import { OnlyNumberDirective } from './../directives/only-number.directive';
import { PaginationTableComponent } from './pagination-table/pagination-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardComponent, CardModule, DropdownModule, FormModule, GridModule, ModalModule, PaginationModule, TableModule } from '@coreui/angular';
import { SelectProductosVentaComponent } from './select-productos-venta/select-productos-venta.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CargarClienteComponent } from './cargar-cliente/cargar-cliente.component';

@NgModule({
  declarations: [PaginationTableComponent, SelectProductosVentaComponent, OnlyNumberDirective, CargarClienteComponent],
  exports: [PaginationTableComponent, SelectProductosVentaComponent, OnlyNumberDirective, CargarClienteComponent],
  imports: [
    CommonModule, PaginationModule, DropdownModule,//NgSelect
    NgSelectModule, FormsModule, ModalModule, CardModule, GridModule,
    TableModule, ButtonModule, FormModule
  ]
})
export class ComponentsModule { }
