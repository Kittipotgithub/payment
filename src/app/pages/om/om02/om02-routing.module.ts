import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Om02Component } from './om02.component';
import { Om021Component } from './om021/om021.component';
import { Om022Component } from './om022/om022.component';

const routes: Routes = [
  {
    path: '',
    component: Om02Component,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'om021'
      },
      {
        path: 'om021',
        component: Om021Component
      },
      {
        path: 'om022',
        component: Om022Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Om02RoutingModule {}
