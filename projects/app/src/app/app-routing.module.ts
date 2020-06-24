import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'add-payment-method',
    loadChildren: () => import('./add-payment-method/add-payment-method.module').then( m => m.AddPaymentMethodPageModule)
  },
  {
    path: 'paypal-add',
    loadChildren: () => import('./paypal-add/paypal-add.module').then( m => m.PaypalAddPageModule)
  },

  {
    path: 'mobile-money-add',
    loadChildren: () => import('./mobile-money-add/mobile-money-add.module').then( m => m.MobileMoneyAddPageModule)
  },
  {
    path: 'credit-card',
    loadChildren: () => import('./credit-card/credit-card.module').then( m => m.CreditCardPageModule)

  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
