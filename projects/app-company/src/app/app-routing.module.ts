import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  
  
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'driver',
    loadChildren: () => import('./driver/driver.module').then( m => m.DriverPageModule)
  },
  {
    path: 'driver-list',
    loadChildren: () => import('./driver-list/driver-list.module').then( m => m.DriverListPageModule)
  },
  {
    path: 'driver-edit/:id',
    loadChildren: () => import('./driver-edit/driver-edit.module').then( m => m.DriverEditPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
