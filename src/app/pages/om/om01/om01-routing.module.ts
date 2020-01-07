import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Om01Component } from './om01.component';
import { Om011Component } from './om011/om011.component';
import { Om012Component } from './om012/om012.component';

const routes: Routes = [
  {
    path: '',
    component: Om01Component,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'om011'
      },
      {
        path: 'om011',
        component: Om011Component
      },
      {
        path: 'om012',
        component: Om012Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Om01RoutingModule {}
