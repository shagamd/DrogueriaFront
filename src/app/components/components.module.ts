import { PaginationTableComponent } from './pagination-table/pagination-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from '@coreui/angular';

@NgModule({
  declarations: [PaginationTableComponent],
  exports:[PaginationTableComponent],
  imports: [
    CommonModule, PaginationModule
  ]
})
export class ComponentsModule { }
