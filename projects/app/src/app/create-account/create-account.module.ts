import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateAccountPageRoutingModule } from './create-account-routing.module';
import { CreateAccountPage } from './create-account.page';
import { ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAccountPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [CreateAccountPage]
})
export class CreateAccountPageModule {}
