import { OnlyNumberDirective } from './../directives/only-number.directive';
import { PaginationTableComponent } from './pagination-table/pagination-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule, PaginationModule } from '@coreui/angular';
import { SelectProductosVentaComponent } from './select-productos-venta/select-productos-venta.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaginationTableComponent, SelectProductosVentaComponent, OnlyNumberDirective],
  exports: [PaginationTableComponent, SelectProductosVentaComponent, OnlyNumberDirective],
  imports: [
    CommonModule, PaginationModule, DropdownModule,//NgSelect
    NgSelectModule, FormsModule
  ]
})
export class ComponentsModule { }
