import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaypalAddPage } from './paypal-add.page';

const routes: Routes = [
  {
    path: '',
    component: PaypalAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaypalAddPageRoutingModule {}
