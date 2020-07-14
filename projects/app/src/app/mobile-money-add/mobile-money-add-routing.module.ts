import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileMoneyAddPage } from './mobile-money-add.page';

const routes: Routes = [
  {
    path: '',
    component: MobileMoneyAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileMoneyAddPageRoutingModule {}
