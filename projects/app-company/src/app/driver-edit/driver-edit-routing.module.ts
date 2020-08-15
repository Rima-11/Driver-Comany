import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverEditPage } from './driver-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DriverEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverEditPageRoutingModule {}
