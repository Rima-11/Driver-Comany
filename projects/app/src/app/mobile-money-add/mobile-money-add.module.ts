import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileMoneyAddPageRoutingModule } from './mobile-money-add-routing.module';

import { MobileMoneyAddPage } from './mobile-money-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileMoneyAddPageRoutingModule
  ],
  declarations: [MobileMoneyAddPage]
})
export class MobileMoneyAddPageModule {}
