import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PasswordPageRoutingModule } from './password-routing.module';
import { PasswordPage } from './password.page';
import { ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FormGroup } from '@angular/forms'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormGroup
  ],
  declarations: [PasswordPage]
})
export class PasswordPageModule {}
