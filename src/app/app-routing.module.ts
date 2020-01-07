import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from '@pages/user-login/user-login.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },
  { path: 'spreadsheet', loadChildren: () => import('./pages/spreadsheet/spreadsheet.module').then(m => m.SpreadsheetModule) },

  

  { path: 'om01', loadChildren: () => import('./pages/om/om01/om01.module').then(m => m.Om01Module) },
  { path: 'om02', loadChildren: () => import('./pages/om/om02/om02.module').then(m => m.Om02Module) },


 

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
