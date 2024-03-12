import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';

const routes: Routes = [
  {
    path: '',
    component: MenuInicialComponent,
    data: {
      title: $localize`Dashboard`
    }
  },
  {
    path: 'dashboard_test',
    component: DashboardComponent,
    data:{
      title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
