import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverListPageRoutingModule } from './driver-list-routing.module';

import { DriverListPage } from './driver-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverListPageRoutingModule
  ],
  declarations: [DriverListPage]
})
export class DriverListPageModule {}
