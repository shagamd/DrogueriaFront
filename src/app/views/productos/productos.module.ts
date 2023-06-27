import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrarProductosComponent } from './administrar-productos/administrar-productos.component';
import { ProductosRoutingModule } from './productos-routing.module';

import { CardModule, GridModule, TableModule, AvatarModule, ProgressModule } from '@coreui/angular';

@NgModule({
  declarations: [AdministrarProductosComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    //CoreUI
    CardModule,
    GridModule,
    TableModule,
    AvatarModule,
    ProgressModule
  ],
})
export class ProductosModule {}
