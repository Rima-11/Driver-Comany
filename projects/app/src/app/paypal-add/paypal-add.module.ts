import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaypalAddPageRoutingModule } from './paypal-add-routing.module';

import { PaypalAddPage } from './paypal-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaypalAddPageRoutingModule
  ],
  declarations: [PaypalAddPage]
})
export class PaypalAddPageModule {}
